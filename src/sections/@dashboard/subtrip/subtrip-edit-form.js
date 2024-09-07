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
import { fetchCustomers } from '../../../redux/slices/customer';

TripForm.propTypes = {
  isEdit: PropTypes.bool,
  currentTrip: PropTypes.object,
};

export default function TripForm({ isEdit = false, currentTrip }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const NewTripSchema = Yup.object().shape({
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
  });

  const defaultValues = useMemo(
    () => ({
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

  useEffect(() => {
    dispatch(fetchCustomers());
    dispatch(fetchRoutes());
  }, [dispatch]);

  const { routes } = useSelector((state) => state.route);
  const { customers } = useSelector((state) => state.customer);

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

              <RHFSelect native name="customerId" label="Customer">
                <option value="" />
                {customers.map((customer) => (
                  <option key={customer._id} value={customer._id}>
                    {customer.customerName}
                  </option>
                ))}
              </RHFSelect>

              <RHFTextField name="loadingPoint" label="Loading Point" />
              <RHFTextField name="unloadingPoint" label="Unloading Point" />
              <RHFTextField name="startKm" label="Start Km" />
              <RHFTextField name="rate" label="Rate" />
              <RHFDatePicker name="subtripStartDate" label="Start Date" />

              <RHFTextField name="tds" label="TDS" />
            </Box>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ pt: 10 }}>
        <Grid item xs={12} md={3}>
          <Box sx={{ pt: 2, pb: 5, px: 3 }}>
            <Typography variant="h6" sx={{ color: 'text.primary' }}>
              Shipment Info
            </Typography>
            <Typography variant="subtitle1" sx={{ color: 'text.secondary', mt: 1 }}>
              Please provide the details of the subtrip.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={2}>
              <RHFTextField name="invoiceNo" label="Invoice No" />
              <RHFTextField name="shipmentNo" label="Shipment No" />
              <RHFTextField name="orderNo" label="Order No" />
              <RHFTextField name="ewayBill" label="E-way Bill" />
              <RHFDatePicker name="ewayExpiryDate" label="E-way Expiry Date" />
              <RHFTextField name="materialType" label="Material Type" />
              <RHFTextField name="quantity" label="Quantity" />
              <RHFTextField name="grade" label="Grade" />
              <RHFTextField name="loadingWeight" label="Loading Weight" />
            </Box>
          </Card>
        </Grid>
      </Grid>
      <Grid container spacing={3} sx={{ pt: 10 }}>
        <Grid item xs={12} md={3}>
          <Box sx={{ pt: 2, pb: 5, px: 3 }}>
            <Typography variant="h6" sx={{ color: 'text.primary' }}>
              Closing Subtrip Info
            </Typography>
            <Typography variant="subtitle1" sx={{ color: 'text.secondary', mt: 1 }}>
              Please provide the details of the closing info.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={2}>
              <RHFDatePicker name="subtripEndDate" label="End Date" />
              <RHFTextField name="endKm" label="End Km" />
              <RHFTextField name="detentionTime" label="Detention Time" />
              <RHFTextField name="unloadingWeight" label="Unloading Weight" />
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
