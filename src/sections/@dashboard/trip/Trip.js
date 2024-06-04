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

// sections
import {
  AnalyticsWidgetSummary,
  AnalyticsCurrentVisits,
  AnalyticsWebsiteVisits,
} from '../general/analytics';
import { fetchTrip } from '../../../redux/slices/trip';
import DriverCard from '../driver/DriverCard';
import SimpleSubtripList from './subtrip/SubtripTable';
import VehicleCard from '../vehicle/VehicleCard';

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
  const totalExpenses = tripData?.subtrips?.reduce((sum, trip) => sum + trip.totalExpenses, 0);
  const totalIncome = tripData?.subtrips?.reduce((sum, trip) => sum + trip.totalIncome, 0);
  const totalKm = tripData?.subtrips?.reduce((sum, trip) => sum + trip.totalKm, 0);
  const totalDieselAmt = tripData?.subtrips?.reduce(
    (sum, trip) => sum + (trip.totalDieselAmt || 0),
    0
  );
  const totalAdblueAmt = tripData?.subtrips?.reduce(
    (sum, trip) => sum + (trip.totalAdblueAmt || 0),
    0
  );

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
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back Elis
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={2}>
            <AnalyticsWidgetSummary
              title="Total Trips"
              total={totalTrips}
              icon="ant-design:car-filled"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <AnalyticsWidgetSummary
              title="Total Expenses"
              total={1000}
              color="error"
              icon="ant-design:dollar-circle-filled"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <AnalyticsWidgetSummary
              title="Total Income"
              total={totalIncome}
              color="success"
              icon="ant-design:euro-circle-filled"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <AnalyticsWidgetSummary
              title="Total Kilometers"
              total={totalKm}
              color="info"
              icon="ant-design:environment-filled"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <AnalyticsWidgetSummary
              title="Total Diesel Amount"
              total={totalDieselAmt}
              color="warning"
              icon="ant-design:fire-filled"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <AnalyticsWidgetSummary
              title="Total AdBlue Amount"
              total={totalAdblueAmt}
              color="primary"
              icon="ant-design:medicine-box-filled"
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <DriverCard driver={tripData.driverId} />
          </Grid>
          <Grid item xs={12} md={4}>
            <VehicleCard vehicle={tripData.vehicleId} />
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
                <CardHeader title="Subtrip List" subheader="Detail of Subtrip" />
                <Button variant="contained" onClick={() => navigate(`/subtrip/new/${id}`)}>
                  New Subtrip
                </Button>
              </Box>
              <SimpleSubtripList subtrips={tripData.subtrips} />
            </Card>
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
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
        </Grid>
      </Container>
    </>
  );
}
