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
import RHFSwitch from '../../../components/hook-form/RHFSwitch';

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
      const createdTrip = await dispatch(addTrip(data));
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
              <RHFTextField name="remarks" label="Remarks" />
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
