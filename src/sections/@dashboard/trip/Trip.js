import { Helmet } from 'react-helmet-async';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, Card, CardHeader, Box, Button } from '@mui/material';
// mock data
import { useState, useEffect } from 'react';
// components

import { useNavigate, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Stack } from '@mui/system';
import { useSettingsContext } from '../../../components/settings';

// sections
import {
  AnalyticsWidgetSummary,
  AnalyticsCurrentVisits,
  AnalyticsWebsiteVisits,
} from '../general/analytics';
import { fetchTrip } from '../../../redux/slices/trip';
import DriverCard from './widgets/DriverWidgets';
import SimpleSubtripList from './subtrip/SubtripTable';
import VehicleCard from './widgets/VehicleWidgets';
import { PATH_DASHBOARD } from '../../../routes/paths';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs/CustomBreadcrumbs';
import Iconify from '../../../components/iconify';
import TripToolbar from './widgets/TripToolbar';

// ----------------------------------------------------------------------

export default function TripDashBoardPage() {
  const theme = useTheme();
  const { themeStretch } = useSettingsContext();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  // const [tripData, setTripData] = useState(null);

  useEffect(() => {
    dispatch(fetchTrip(id));
  }, [dispatch, id]);

  const { trip: tripData, isLoading } = useSelector((state) => state.trip);

  if (!tripData) return <div>Loading...</div>;

  const totalTrips = tripData?.subtrips?.length;
  const totalAdblueAmt = tripData?.subtrips?.reduce(
    (sum, trip) => sum + (trip.totalAdblueAmt || 0),
    0
  );
  const totalExpenses = tripData.subtrips.reduce((sum, subtrip) => {
    const subtripExpenses = subtrip.expenses.reduce(
      (subSum, expense) => subSum + expense.amount,
      0
    );
    return sum + subtripExpenses;
  }, 0);

  const totalIncome = tripData.subtrips.reduce((sum, subtrip) => sum + subtrip.rate, 0);

  const totalDieselAmt = tripData.subtrips.reduce((sum, subtrip) => {
    const dieselExpenses = subtrip.expenses
      .filter((expense) => expense.expenseType === 'fuel')
      .reduce((subSum, expense) => subSum + expense.amount, 0);
    return sum + dieselExpenses;
  }, 0);

  const totalKm = tripData.subtrips.reduce((sum, subtrip) => {
    const kmCovered = subtrip.endKm - subtrip.startKm;
    return sum + kmCovered;
  }, 0);

  // subtrips table
  // total expense
  // total income
  // total km

  // driver details
  // vehicle details

  return (
    <>
      <Helmet>
        <title> Trips Analytics | Minimal UI</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <CustomBreadcrumbs
          heading="Trips Dashboard"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Trips List', href: PATH_DASHBOARD.trip.list },
            { name: 'Trip Dashboard' },
          ]}
        />

        <TripToolbar
          backLink={PATH_DASHBOARD.trip.list}
          tripId={tripData._id}
          status={tripData.tripStatus}
          tripData={tripData}
          onTripClose={() => true}
          onEdit={() => {
            navigate(PATH_DASHBOARD.trip.new);
          }}
          onSubtripClose={() => {}}
        />
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Stack spacing={3} direction={{ xs: 'column', md: 'column' }}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
                <AnalyticsWidgetSummary
                  title="Total Trips"
                  total={totalTrips}
                  icon="ant-design:car-filled"
                  sx={{ flexGrow: { xs: 0, sm: 1 }, flexBasis: { xs: 'auto', sm: 0 } }}
                />
                <AnalyticsWidgetSummary
                  title="Total Expenses"
                  total={totalExpenses}
                  color="error"
                  icon="ant-design:dollar-circle-filled"
                  sx={{ flexGrow: { xs: 0, sm: 1 }, flexBasis: { xs: 'auto', sm: 0 } }}
                />
                <AnalyticsWidgetSummary
                  title="Total Income"
                  total={totalIncome}
                  color="success"
                  icon="ant-design:euro-circle-filled"
                  sx={{ flexGrow: { xs: 0, sm: 1 }, flexBasis: { xs: 'auto', sm: 0 } }}
                />
              </Stack>

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
                <AnalyticsWidgetSummary
                  title="Total Kilometers"
                  total={totalKm}
                  color="info"
                  icon="ant-design:environment-filled"
                  sx={{ flexGrow: { xs: 0, sm: 1 }, flexBasis: { xs: 'auto', sm: 0 } }}
                />
                <AnalyticsWidgetSummary
                  title="Total Diesel Amount"
                  total={totalDieselAmt}
                  color="warning"
                  icon="ant-design:fire-filled"
                  sx={{ flexGrow: { xs: 0, sm: 1 }, flexBasis: { xs: 'auto', sm: 0 } }}
                />
                <AnalyticsWidgetSummary
                  title="Total AdBlue Amount"
                  total={totalAdblueAmt}
                  color="primary"
                  icon="ant-design:medicine-box-filled"
                  sx={{ flexGrow: { xs: 0, sm: 1 }, flexBasis: { xs: 'auto', sm: 0 } }}
                />
              </Stack>
              <Grid item xs={12} md={12}>
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
                    <CardHeader title="Subtrip List" subheader="Detail of Subtrip" />
                    <Button
                      variant="contained"
                      onClick={() => navigate(PATH_DASHBOARD.subtrip.new(tripData._id))}
                    >
                      New Subtrip
                    </Button>
                  </Box>
                  <SimpleSubtripList subtrips={tripData.subtrips} />
                </Card>
              </Grid>
              <Grid item xs={12} md={12}>
                <AnalyticsCurrentVisits
                  title="SubTrip Status"
                  chart={{
                    series: [
                      {
                        label: 'Completed',
                        value: tripData?.subtrips?.filter((trip) => trip.tripStatus === '1').length,
                      },
                      {
                        label: 'In Progress',
                        value: tripData?.subtrips?.filter((trip) => trip.tripStatus !== '1').length,
                      },
                    ],
                    colors: [theme.palette.primary.main, theme.palette.info.main],
                  }}
                />
              </Grid>
            </Stack>
          </Grid>

          <Grid item xs={12} md={4}>
            <Stack spacing={3} direction={{ xs: 'column', md: 'column' }}>
              <DriverCard driver={tripData.driverId} />
              <VehicleCard vehicle={tripData.vehicleId} />
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
