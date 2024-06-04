import { Helmet } from 'react-helmet-async';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
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
import SubtripDetails from '../subtrip/SubtripListPage';
import DriverCard from '../driver/DriverCard';

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

          <Grid item xs={12} md={6} lg={8}>
            <AnalyticsWebsiteVisits
              title="Trip Details"
              subheader="Detailed information about each trip"
              chart={{
                labels: tripData?.subtrips?.map((trip) => trip.dateOfCreation),
                series: [
                  {
                    name: 'Expenses',
                    type: 'column',
                    fill: 'solid',
                    data: tripData?.subtrips?.map((trip) => trip.totalExpenses),
                  },
                  {
                    name: 'Income',
                    type: 'area',
                    fill: 'gradient',
                    data: tripData?.subtrips?.map((trip) => trip.totalIncome),
                  },
                ],
              }}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <AnalyticsCurrentVisits
              title="Trip Status"
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
          <Grid item xs={12}>
            {/* <SubtripDetails
              title="Subtrip Details"
              // tableData={subtrips}
              // tableLabels={tableLabels}
            /> */}
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
