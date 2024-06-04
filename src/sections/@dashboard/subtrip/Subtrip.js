import { Helmet } from 'react-helmet-async';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, Card, CardHeader, Box, Button } from '@mui/material';
// mock data
import { useState, useEffect } from 'react';
// components
import { useNavigate, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useSettingsContext } from '../../../components/settings';
import { fetchSubtrip } from '../../../redux/slices/subtrip';
import AnalyticsWidgetSummary from '../general/analytics/AnalyticsWidgetSummary';
import SimpleExpenseList from './expense/ExpenseTable';

// ----------------------------------------------------------------------

export default function SubtripDashBoardPage() {
  const theme = useTheme();
  const { themeStretch } = useSettingsContext();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

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
  const totalDetentionTime = subtripData.detentionTime;

  return (
    <>
      <Helmet>
        <title> Subtrip Analytics | Minimal UI</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back Elis
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AnalyticsWidgetSummary
              title="Total Expenses"
              total={totalExpenses}
              color="error"
              icon="ant-design:dollar-circle-filled"
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

          <Grid item xs={12} md={6} lg={8}>
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
                <Button variant="contained" onClick={() => navigate(`/expense/new/${id}`)}>
                  New Expense
                </Button>
              </Box>
              <SimpleExpenseList expenses={subtripData.expenses} />
            </Card>
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AnalyticsWidgetSummary
              title="Subtrip Status"
              total={subtripData.subtripStatus}
              color={subtripData.subtripStatus === 'completed' ? 'success' : 'warning'}
              icon="ant-design:check-circle-filled"
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
