import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { paramCase } from 'change-case';
import { useSnackbar } from '../../../components/snackbar';
import { Form, Field } from '../../../components/hook-form';
import { addTrip, updateTrip } from '../../../redux/slices/trip';
import { fetchDrivers } from '../../../redux/slices/driver';
import { fetchVehicles } from '../../../redux/slices/vehicle';
import { useSelector } from '../../../redux/store';
import { PATH_DASHBOARD } from '../../../routes/paths';

TripForm.propTypes = {
  isEdit: PropTypes.bool,
  currentTrip: PropTypes.object,
};

export default function TripForm({ isEdit = false, currentTrip }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const NewTripSchema = Yup.object().shape({
    driverId: Yup.mixed().required('Driver is required').nullable(true),
    vehicleId: Yup.mixed().required('Vehicle is required').nullable(true),
    fromDate: Yup.date().required('From Date is required'),
    remarks: Yup.string(),
  });

  const defaultValues = useMemo(
    () => ({
      driverId: currentTrip?.driverId
        ? { label: currentTrip?.driverId?.driverName, value: currentTrip?.driverId?._id }
        : null,
      vehicleId: currentTrip?.vehicleId
        ? { label: currentTrip?.vehicleId?.vehicleNo, value: currentTrip?.vehicleId?._id }
        : null,
      fromDate: currentTrip?.fromDate ? new Date(currentTrip?.fromDate) : new Date(),
      remarks: currentTrip?.remarks || 'Remarks',
    }),
    [currentTrip]
  );

  useEffect(() => {
    dispatch(fetchDrivers());
    dispatch(fetchVehicles());
  }, [dispatch]);

  const { drivers } = useSelector((state) => state.driver);
  const { vehicles } = useSelector((state) => state.vehicle);

  const methods = useForm({
    resolver: yupResolver(NewTripSchema),
    defaultValues,
  });

  const {
    reset,
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
      if (isEdit) {
        // Update Trip
        await dispatch(
          updateTrip(currentTrip._id, {
            ...data,
            driverId: data?.driverId?.value,
            vehicleId: data?.vehicleId?.value,
          })
        );
        enqueueSnackbar('Trip updated successfully!');
        navigate(PATH_DASHBOARD.trip.detail(paramCase(currentTrip._id)));
      } else {
        // Add New Trip
        const createdTrip = await dispatch(
          addTrip({ ...data, driverId: data?.driverId?.value, vehicleId: data?.vehicleId?.value })
        );
        enqueueSnackbar('Trip created successfully!');
        navigate(PATH_DASHBOARD.trip.detail(paramCase(createdTrip._id)));
      }
      reset();
    } catch (error) {
      console.error(error);
      enqueueSnackbar('An error occurred. Please try again.', { variant: 'error' });
    }
  };
  return (
    <Form methods={methods} onSubmit={handleSubmit(onSubmit)}>
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
              <Field.Autocomplete
                name="vehicleId"
                label="Vehicle"
                options={vehicles.map((c) => ({ label: c.vehicleNo, value: c._id }))}
                getOptionLabel={(option) => option.label}
                isOptionEqualToValue={(option, value) => option.value === value.value}
              />
              <Field.Autocomplete
                freeSolo
                name="driverId"
                label="Driver"
                options={drivers.map((c) => ({ label: c.driverName, value: c._id }))}
                getOptionLabel={(option) => option.label}
                isOptionEqualToValue={(option, value) => option.value === value.value}
              />

              <Field.DatePicker name="fromDate" label="From Date" />
              <Field.Text name="remarks" label="Remarks" />
            </Box>
          </Card>
        </Grid>
      </Grid>

      <Stack alignItems="flex-end" sx={{ mt: 3, mb: 5 }}>
        <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
          {!isEdit ? 'Create Trip' : 'Save Changes'}
        </LoadingButton>
      </Stack>
    </Form>
  );
}
