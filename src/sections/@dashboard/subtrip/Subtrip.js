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
import { Stack, width } from '@mui/system';
import { useSettingsContext } from '../../../components/settings';
import { closeTrip, fetchSubtrip } from '../../../redux/slices/subtrip';
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
import LRInfo from './widgets/LRInfoCard2';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs/CustomBreadcrumbs';
import { PATH_DASHBOARD } from '../../../routes/paths';
import SubtripToolbar from './widgets/SubtripToolbar';
import { ResolveSubtripDialog } from './ResolveSubTripDialogueForm';
import { SubtripCloseDialog } from './SubtripCloseDialogue';
import ConfirmDialog from '../../../components/confirm-dialog/ConfirmDialog';

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
  const [showResolveDialog, setShowResolveDialog] = useState(false);
  const [showCloseDialog, setShowCloseDialog] = useState(false);
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
            { name: 'Trip Dashboard', href: PATH_DASHBOARD.trip.detail(subtripData.tripId._id) },
            { name: 'SubTrip Dashboard' },
          ]}
        />

        <SubtripToolbar
          backLink={PATH_DASHBOARD.trip.detail(subtripData.tripId._id)}
          tripId={subtripData.tripId._id}
          status={subtripData.subtripStatus}
          subtripData={subtripData}
          onAddMaterialInfo={() => setShowMaterialDialog(true)}
          onRecieve={() => setShowRecieveDialog(true)}
          onEdit={() => {
            navigate(PATH_DASHBOARD.subtrip.edit(id));
          }}
          onResolve={() => setShowResolveDialog(true)}
          onSubtripClose={() => setShowCloseDialog(true)}
        />

        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Stack spacing={3} direction={{ xs: 'column', md: 'column' }}>
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
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
                <AnalyticsWidgetSummary
                  title="Total Diesel Liters"
                  total={totalDieselLtr || 0}
                  color="warning"
                  icon="ant-design:fire-filled"
                  sx={{ flexGrow: { xs: 0, sm: 1 }, flexBasis: { xs: 'auto', sm: 0 } }}
                />
                <AnalyticsWidgetSummary
                  title="Total Detention Time"
                  total={totalDetentionTime}
                  color="info"
                  icon="ant-design:clock-circle-filled"
                  sx={{ flexGrow: { xs: 0, sm: 1 }, flexBasis: { xs: 'auto', sm: 0 } }}
                />
                <AnalyticsWidgetSummary
                  title={`${subtripData.subtripStatus.toUpperCase()}`}
                  total={subtripData.subtripStatus}
                  color={subtripData.subtripStatus === 'completed' ? 'error' : 'error'}
                  icon="ant-design:check-circle-filled"
                  sx={{ flexGrow: { xs: 0, sm: 1 }, flexBasis: { xs: 'auto', sm: 0 } }}
                />
              </Stack>
              <Grid item>
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
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
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
                  sx={{ flexGrow: { xs: 0, sm: 1 }, flexBasis: { xs: 'auto', sm: 0 } }}
                />
              </Stack>
            </Stack>
          </Grid>

          <Grid item xs={12} md={4}>
            <LRInfo subtrip={subtripData} />
          </Grid>

          <Grid item xs={12} md={6} lg={4} />
        </Grid>
      </Container>

      {/* Add Material Dialogue Form */}
      <SubtripMaterialInfoDialog
        showDialog={showMaterialDialog}
        setShowDialog={setShowMaterialDialog}
        subtripId={id}
        vehicleId={subtripData?.tripId?.vehicleId?._id}
      />

      {/* Render the RecieveSubtripDialog */}
      <RecieveSubtripDialog
        showDialog={showRecieveDialog}
        setShowDialog={setShowRecieveDialog}
        subtripId={id}
      />

      {/* Resolve Subtrip Dialogue */}
      <ResolveSubtripDialog
        showDialog={showResolveDialog}
        setShowDialog={setShowResolveDialog}
        subtripId={id}
      />

      {/* Resolve Subtrip Dialogue */}
      <SubtripCloseDialog
        showDialog={showCloseDialog}
        setShowDialog={setShowCloseDialog}
        subtripId={id}
      />

      {/* Add Expense Dialog */}
      <AddExpenseDialog
        showDialog={showExpenseDialog}
        setShowDialog={setShowExpenseDialog}
        subtripId={id}
        vehicleId={subtripData?.tripId?.vehicleId?._id}
      />
    </>
  );
}
