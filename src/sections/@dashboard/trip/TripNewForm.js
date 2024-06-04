import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useCallback, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { paramCase } from 'change-case';
import { options } from 'numeral';
import { useSnackbar } from '../../../components/snackbar';
import FormProvider, {
  RHFSelect,
  RHFTextField,
  RHFDatePicker,
  RHFAutocomplete,
} from '../../../components/hook-form';
import { addTrip } from '../../../redux/slices/trip';
import { fetchDrivers } from '../../../redux/slices/driver';
import { fetchVehicles } from '../../../redux/slices/vehicle';
import { fetchRoutes } from '../../../redux/slices/route';
import { useSelector } from '../../../redux/store';
import { PATH_DASHBOARD } from '../../../routes/paths';
import { subtripStatus, tripStatus } from './TripTableConfig';

TripForm.propTypes = {
  isEdit: PropTypes.bool,
  currentTrip: PropTypes.object,
};

export default function TripForm({ isEdit = false, currentTrip }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const NewTripSchema = Yup.object().shape({
    // Trip Related fields
    driverId: Yup.string().required('Driver is required'),
    vehicleId: Yup.string().required('Vehicle is required'),
    fromDate: Yup.date().required('From Date is required'),
    toDate: Yup.date().required('To Date is required'),
    tripStatus: Yup.string().required('Trip Status is required'),
    totalDetTime: Yup.number().required('Total Detention Time is required'),
    remarks: Yup.string(),
    // Subtrip
    routeCd: Yup.string().required('Route Code is required'),
    customerId: Yup.string().required('Customer ID is required'),
    loadingPoint: Yup.string().required('Loading Point is required'),
    unloadingPoint: Yup.string().required('Unloading Point is required'),
    loadingWeight: Yup.number().required('Loading Weight is required'),
    unloadingWeight: Yup.number().required('Unloading Weight is required'),
    startKm: Yup.number().required('Start Km is required'),
    endKm: Yup.number().required('End Km is required'),
    rate: Yup.number().required('Rate is required'),
    subtripStartDate: Yup.date().required('Start Date is required'),
    subtripEndDate: Yup.date().required('End Date is required'),
    subtripStatus: Yup.string().required('Subtrip Status is required'),
    invoiceNo: Yup.string().required('Invoice No is required'),
    shipmentNo: Yup.string().required('Shipment No is required'),
    orderNo: Yup.string().required('Order No is required'),
    ewayBill: Yup.string().required('E-way Bill is required'),
    ewayExpiryDate: Yup.date().required('E-way Expiry Date is required'),
    materialType: Yup.string().required('Material Type is required'),
    quantity: Yup.number().required('Quantity is required'),
    grade: Yup.string().required('Grade is required'),
    dieselLtr: Yup.number().required('Diesel Ltr is required'),
    detentionTime: Yup.number().required('Detention Time is required'),
    tds: Yup.number().required('TDS is required'),
    deductedWeight: Yup.number().required('Deducted Weight is required'),
    // Expense
    expenseType: Yup.string().required('Expense Type is required'),
    installment: Yup.number().required('Installment is required'),
    amount: Yup.number().required('Amount is required'),
    slipNo: Yup.string().required('Slip No is required'),
    pumpCd: Yup.string(),
    paidThrough: Yup.string().required('Paid Through is required'),
    authorisedBy: Yup.string().required('Authorised By is required'),
  });

  const defaultValues = useMemo(
    () => ({
      driverId: currentTrip?.driverId?.driverName || null,
      vehicleId: currentTrip?.vehicleId?.vehicleNo || null,
      fromDate: currentTrip?.fromDate ? new Date(currentTrip?.fromDate) : new Date(),
      toDate: currentTrip?.toDate ? new Date(currentTrip?.toDate) : new Date(),
      tripStatus: currentTrip?.tripStatus || 'Pending',
      totalDetTime: currentTrip?.totalDetTime || 3,
      remarks: currentTrip?.remarks || 'Remarks',
      // Subtrip
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
      // Expense
      expenseType: currentTrip?.expenseType || '',
      installment: currentTrip?.installment || 0,
      amount: currentTrip?.amount || 0,
      slipNo: currentTrip?.slipNo || '',
      pumpCd: currentTrip?.pumpCd || '',
      paidThrough: currentTrip?.paidThrough || '',
      authorisedBy: currentTrip?.authorisedBy || '',
    }),
    [currentTrip]
  );

  useEffect(() => {
    dispatch(fetchDrivers());
    dispatch(fetchVehicles());
    dispatch(fetchRoutes());
  }, [dispatch]);

  const { drivers } = useSelector((state) => state.driver);
  const { vehicles } = useSelector((state) => state.vehicle);
  const { routes } = useSelector((state) => state.route);

  const methods = useForm({
    resolver: yupResolver(NewTripSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (isEdit && currentTrip) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
  }, [isEdit, currentTrip, reset, defaultValues]);

  const onSubmit = async (data) => {
    try {
      console.log(data);
      const createdTrip = await dispatch(addTrip(data));
      console.log({ createdTrip });
      reset();
      enqueueSnackbar(!isEdit ? 'Trip created successfully!' : 'Trip edited successfully!');
      navigate(PATH_DASHBOARD.trip.detail(paramCase(createdTrip._id)));
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      {/* Vehicle & Driver Details */}
      <Grid container spacing={3} sx={{ pt: 10 }}>
        <Grid item xs={12} md={3}>
          <Box sx={{ pt: 2, pb: 5, px: 3 }}>
            <Typography variant="h6" sx={{ color: 'text.primary' }}>
              Vehicle & Driver
            </Typography>
            <Typography variant="subtitle1" sx={{ color: 'text.secondary', mt: 1 }}>
              Please Select the Vehicle and the Driver for the trip.
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={2}>
              <RHFSelect native name="driverId" label="Driver">
                <option value="" />
                {drivers.map((driver) => (
                  <option key={driver._id} value={driver._id}>
                    {driver.driverName}
                  </option>
                ))}
              </RHFSelect>

              <RHFSelect native name="vehicleId" label="Vehicle">
                <option value="" />
                {vehicles.map((vehicle) => (
                  <option key={vehicle._id} value={vehicle._id}>
                    {vehicle.vehicleNo}
                  </option>
                ))}
              </RHFSelect>
            </Box>
          </Card>
        </Grid>
      </Grid>

      {/* Trip Info */}
      <Grid container spacing={3} sx={{ pt: 10 }}>
        <Grid item xs={12} md={3}>
          <Box sx={{ pt: 2, pb: 5, px: 3 }}>
            <Typography variant="h6" sx={{ color: 'text.primary' }}>
              Trip Info
            </Typography>
            <Typography variant="subtitle1" sx={{ color: 'text.secondary', mt: 1 }}>
              Please provide the details of the trip.
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={2}>
              <RHFDatePicker name="fromDate" label="From Date" />
              <RHFDatePicker name="toDate" label="To Date" />
              <RHFSelect native name="tripStatus" label="Trip Status">
                <option value="" />
                {subtripStatus.map((item) => (
                  <option key={item.key} value={item.key}>
                    {item.value}
                  </option>
                ))}
              </RHFSelect>
              <RHFTextField name="totalDetTime" label="Total Detention Time" />
              <RHFTextField name="remarks" label="Remarks" />
            </Box>
          </Card>
        </Grid>
      </Grid>

      {/* Subtrip Info */}
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

      {/* Expense Info */}
      <Grid container spacing={3} sx={{ pt: 10 }}>
        <Grid item xs={12} md={3}>
          <Box sx={{ pt: 2, pb: 5, px: 3 }}>
            <Typography variant="h6" sx={{ color: 'text.primary' }}>
              Expense Info
            </Typography>
            <Typography variant="subtitle1" sx={{ color: 'text.secondary', mt: 1 }}>
              Please provide the details of the expenses.
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={2}>
              <RHFTextField name="expenseType" label="Expense Type" />
              <RHFTextField name="installment" label="Installment" />
              <RHFTextField name="amount" label="Amount" />
              <RHFTextField name="slipNo" label="Slip No" />
              <RHFTextField name="pumpCd" label="Pump Code" />
              <RHFTextField name="paidThrough" label="Paid Through" />
              <RHFTextField name="authorisedBy" label="Authorised By" />
            </Box>
          </Card>
        </Grid>
      </Grid>

      <Stack alignItems="flex-end" sx={{ mt: 3, mb: 5 }}>
        <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
          {!isEdit ? 'Create Trip' : 'Save Changes'}
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
