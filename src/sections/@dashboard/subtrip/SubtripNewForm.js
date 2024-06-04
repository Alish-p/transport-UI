import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { Card, Box, Typography, Grid } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { RHFSelect, RHFTextField, RHFDatePicker } from '../../../components/hook-form';
import { useSelector } from '../../../redux/store';
import { subtripStatus, tripStatus } from './TripTableConfig';

SubtripForm.propTypes = {
  currentTrip: PropTypes.object,
};

export default function SubtripForm({ currentTrip }) {
  const { routes } = useSelector((state) => state.route);

  const defaultValues = useMemo(
    () => ({
      routeCd: currentTrip?.routeCd || '',
      customerId: currentTrip?.customerId || '',
      loadingPoint: currentTrip?.loadingPoint || '',
      unloadingPoint: currentTrip?.unloadingPoint || '',
      loadingWeight: currentTrip?.loadingWeight || 0,
      unloadingWeight: currentTrip?.unloadingWeight || 0,
      startKm: currentTrip?.startKm || 0,
      endKm: currentTrip?.endKm || 0,
      rate: currentTrip?.rate || 0,
      subtripStartDate: currentTrip?.subtripStartDate
        ? new Date(currentTrip?.subtripStartDate)
        : new Date(),
      subtripEndDate: currentTrip?.subtripEndDate
        ? new Date(currentTrip?.subtripEndDate)
        : new Date(),
      subtripStatus: currentTrip?.subtripStatus || '',
      invoiceNo: currentTrip?.invoiceNo || '',
      shipmentNo: currentTrip?.shipmentNo || '',
      orderNo: currentTrip?.orderNo || '',
      ewayBill: currentTrip?.ewayBill || '',
      ewayExpiryDate: currentTrip?.ewayExpiryDate
        ? new Date(currentTrip?.ewayExpiryDate)
        : new Date(),
      materialType: currentTrip?.materialType || '',
      quantity: currentTrip?.quantity || 0,
      grade: currentTrip?.grade || '',
      dieselLtr: currentTrip?.dieselLtr || 0,
      detentionTime: currentTrip?.detentionTime || 0,
      tds: currentTrip?.tds || 0,
      deductedWeight: currentTrip?.deductedWeight || 0,
    }),
    [currentTrip]
  );

  return (
    <Grid container spacing={3} sx={{ pt: 10 }}>
      <Grid item xs={12} md={3}>
        <Box sx={{ pt: 2, pb: 5, px: 3 }}>
          <Typography variant="h6" sx={{ color: 'text.primary' }}>
            Subtrip Info
          </Typography>
          <Typography variant="subtitle1" sx={{ color: 'text.secondary', mt: 1 }}>
            Please provide the details of the subtrip.
          </Typography>
        </Box>
      </Grid>

      <Grid item xs={12} md={8}>
        <Card sx={{ p: 3 }}>
          <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={2}>
            <RHFSelect native name="routeCd" label="Route">
              <option value="" />
              {routes.map((route) => (
                <option key={route._id} value={route._id}>
                  {route.routeName}
                </option>
              ))}
            </RHFSelect>

            <RHFTextField name="customerId" label="Customer ID" />
            <RHFTextField name="loadingPoint" label="Loading Point" />
            <RHFTextField name="unloadingPoint" label="Unloading Point" />
            <RHFTextField name="loadingWeight" label="Loading Weight" />
            <RHFTextField name="unloadingWeight" label="Unloading Weight" />
            <RHFTextField name="startKm" label="Start Km" />
            <RHFTextField name="endKm" label="End Km" />
            <RHFTextField name="rate" label="Rate" />
            <RHFDatePicker name="subtripStartDate" label="Start Date" />
            <RHFDatePicker name="subtripEndDate" label="End Date" />
            <RHFSelect native name="subtripStatus" label="Subtrip Status">
              <option value="" />
              {tripStatus.map((item) => (
                <option key={item.key} value={item.key}>
                  {item.value}
                </option>
              ))}
            </RHFSelect>
            <RHFTextField name="subtripStatus" label="Subtrip Status" />
            <RHFTextField name="invoiceNo" label="Invoice No" />
            <RHFTextField name="shipmentNo" label="Shipment No" />
            <RHFTextField name="orderNo" label="Order No" />
            <RHFTextField name="ewayBill" label="E-way Bill" />
            <RHFDatePicker name="ewayExpiryDate" label="E-way Expiry Date" />
            <RHFTextField name="materialType" label="Material Type" />
            <RHFTextField name="quantity" label="Quantity" />
            <RHFTextField name="grade" label="Grade" />
            <RHFTextField name="dieselLtr" label="Diesel Ltr" />
            <RHFTextField name="detentionTime" label="Detention Time" />
            <RHFTextField name="tds" label="TDS" />
            <RHFTextField name="deductedWeight" label="Deducted Weight" />
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
}
