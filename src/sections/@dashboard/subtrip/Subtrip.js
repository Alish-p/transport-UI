import { Helmet } from 'react-helmet-async';
// @mui
import { useTheme } from '@mui/material/styles';
import {
  Grid,
  Container,
  Typography,
  Card,
  CardHeader,
  Box,
  Button,
  Tooltip,
  IconButton,
  CircularProgress,
} from '@mui/material';
// mock data
import { useState, useEffect } from 'react';
// components
import { useNavigate, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { Stack } from '@mui/system';
import { useSettingsContext } from '../../../components/settings';
import { fetchSubtrip } from '../../../redux/slices/subtrip';
import AnalyticsWidgetSummary from '../general/analytics/AnalyticsWidgetSummary';
import SimpleExpenseList from './expense/ExpenseTable';
import { SubtripMaterialInfoDialog } from './SubtripAddMaterialDialogueForm';
import { AppWelcome } from '../general/app';
import { MotivationIllustration } from '../../../assets/illustrations';
import Label from '../../../components/label';
import { RecieveSubtripDialog } from './RecievedSubTripForm';
import { AddExpenseDialog } from './expense/AddExpenseDialogue';
import { AnalyticsCurrentVisits } from '../general/analytics';
import { mapExpensesToChartData } from './utils';
import Iconify from '../../../components/iconify';

import LRPDF from './lr/LRPdf';
import { BankingWidgetSummary } from '../general/banking';
import IncomeWidgetSummary from './widgets/IncomeWidgets';
import LRInfo from './widgets/LRInfoCard';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs/CustomBreadcrumbs';
import { PATH_DASHBOARD } from '../../../routes/paths';

// ----------------------------------------------------------------------

export default function SubtripDashBoardPage() {
  const theme = useTheme();
  const { themeStretch } = useSettingsContext();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  // State for dialog visibility
  const [showMaterialDialog, setShowMaterialDialog] = useState(false);
  const [showRecieveDialog, setShowRecieveDialog] = useState(false);
  const [showExpenseDialog, setShowExpenseDialog] = useState(false);

  useEffect(() => {
    dispatch(fetchSubtrip(id));
  }, [dispatch, id]);

  const { subtrip: subtripData, isLoading } = useSelector((state) => state.subtrip);

  if (!subtripData) return <div>Loading...</div>;

  const totalExpenses = subtripData.expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const totalDieselLtr = subtripData.expenses.reduce(
    (sum, expense) => sum + (expense.dieselLtr || 0),
    0
  );
  const expenseChartData = mapExpensesToChartData(subtripData.expenses);

  const totalDetentionTime = subtripData.detentionTime;

  return (
    <>
      <Helmet>
        <title> Subtrip Analytics </title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <CustomBreadcrumbs
          heading="Subtrip Dashboard"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Trip Dashboard', href: PATH_DASHBOARD.trip.detail(subtripData.tripId) },
            { name: 'SubTrip Dashboard' },
          ]}
          action={
            <Button
              to={PATH_DASHBOARD.driver.new}
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              New Driver
            </Button>
          }
        />

        <Stack
          flexShrink={0}
          direction="row"
          alignItems="space-between"
          justifyContent="space-between"
          sx={{
            // width: 'fit-content',
            height: 'inherit',
          }}
        >
          <>
            <Typography variant="h4" sx={{ mb: 5 }}>
              Hi, Welcome back
              <Typography variant="span" sx={{ color: 'text.primary' }}>
                Elis
              </Typography>
            </Typography>
            <Stack direction="row" spacing={1}>
              <Button size="small" variant="contained" onClick={() => setShowMaterialDialog(true)}>
                Add Material Details
              </Button>
              <Button size="small" variant="contained" onClick={() => setShowRecieveDialog(true)}>
                Recieve Trip
              </Button>
              <PDFDownloadLink
                document={<LRPDF subtrip={subtripData} />}
                fileName={subtripData._id}
                style={{ textDecoration: 'none' }}
              >
                {({ loading }) => (
                  <Tooltip title="Download">
                    <IconButton>
                      {loading ? (
                        <CircularProgress size={24} color="inherit" />
                      ) : (
                        <Iconify icon="eva:download-fill" />
                      )}
                    </IconButton>
                  </Tooltip>
                )}
              </PDFDownloadLink>
            </Stack>
          </>
        </Stack>

        <Grid container spacing={3}>
          <Grid item xs={12} md={7}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
              <IncomeWidgetSummary
                title="Income"
                type="income"
                color="primary"
                icon="eva:diagonal-arrow-right-up-fill"
                total={subtripData.rate * subtripData.loadingWeight}
                chart={{
                  series: [7, 208, 76, 48, 74, 54, 157, 84],
                }}
              />
              <IncomeWidgetSummary
                title="Expenses"
                type="expense"
                color="warning"
                icon="eva:diagonal-arrow-right-up-fill"
                total={-totalExpenses}
                chart={{
                  series: [7, 208, 76, 48, 74, 54, 157, 84],
                }}
              />
            </Stack>
          </Grid>

          <Grid item xs={12} md={5}>
            <AppWelcome
              title="LR-123"
              description={
                <>
                  Current Status
                  {/* <Label color="" variant="outlined">
                    Pending
                  </Label> */}
                </>
              }
              img={
                <MotivationIllustration
                  sx={{
                    p: 3,
                    width: 360,
                    margin: { xs: 'auto', md: 'inherit' },
                  }}
                />
              }
              action={
                <Grid container spacing={4}>
                  <Grid item>
                    <Button variant="contained" onClick={() => setShowMaterialDialog(true)}>
                      Add Material Details
                    </Button>
                  </Grid>

                  <Grid item>
                    <Button variant="contained" onClick={() => setShowRecieveDialog(true)}>
                      Recieve
                    </Button>
                  </Grid>
                </Grid>
              }
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AnalyticsWidgetSummary
              title="Total Diesel Liters"
              total={totalDieselLtr}
              color="warning"
              icon="ant-design:fire-filled"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AnalyticsWidgetSummary
              title="Total Detention Time"
              total={totalDetentionTime}
              color="info"
              icon="ant-design:clock-circle-filled"
            />
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <AnalyticsWidgetSummary
              title="Subtrip Status"
              total={subtripData.subtripStatus}
              color={subtripData.subtripStatus === 'completed' ? 'success' : 'warning'}
              icon="ant-design:check-circle-filled"
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <LRInfo />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AnalyticsCurrentVisits
              title="Expense Details"
              chart={{
                series: expenseChartData,
                colors: [
                  theme.palette.primary.main,
                  theme.palette.info.main,
                  theme.palette.error.main,
                  theme.palette.warning.main,
                  theme.palette.success.main,
                  theme.palette.secondary.main,
                  theme.palette.info.dark,
                  theme.palette.error.light,
                ],
              }}
            />
          </Grid>

          <Grid item xs={12} md={8}>
            <Card sx={{ minHeight: 400 }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 3,
                  px: 3,
                }}
              >
                <CardHeader title="Expense List" subheader="Detail of Expenses" />
                <Button variant="contained" onClick={() => setShowExpenseDialog(true)}>
                  New Expense
                </Button>
              </Box>
              <SimpleExpenseList expenses={subtripData.expenses} />
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Add Material Dialogue Form */}
      <SubtripMaterialInfoDialog
        showDialog={showMaterialDialog}
        setShowDialog={setShowMaterialDialog}
        subtripId={id}
      />

      {/* Render the RecieveSubtripDialog */}
      <RecieveSubtripDialog
        showDialog={showRecieveDialog}
        setShowDialog={setShowRecieveDialog}
        subtripId={id}
      />

      {/* Add Expense Dialog */}
      <AddExpenseDialog
        showDialog={showExpenseDialog}
        setShowDialog={setShowExpenseDialog}
        subtripId={id}
      />
    </>
  );
}
