import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useCallback, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
import { fetchDrivers } from '../../../redux/slices/driver';
import { fetchVehicles } from '../../../redux/slices/vehicle';
import { fetchRoutes } from '../../../redux/slices/route';
import { useSelector } from '../../../redux/store';
import { PATH_DASHBOARD } from '../../../routes/paths';
import { subtripStatus, tripStatus } from './SubtripTableConfig';
import { addSubtrip } from '../../../redux/slices/subtrip';

SubtripCreateForm.propTypes = {
  isEdit: PropTypes.bool,
  currentTrip: PropTypes.object,
};

export default function SubtripCreateForm({ isEdit = false, currentTrip }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const NewTripSchema = Yup.object().shape({
    // Subtrip
    routeCd: Yup.string().required('Route Code is required'),
    customerId: Yup.string().required('Customer ID is required'),
    loadingPoint: Yup.string().required('Loading Point is required'),
    unloadingPoint: Yup.string().required('Unloading Point is required'),
  });

  const defaultValues = useMemo(
    () => ({
      // Subtrip
      routeCd: currentTrip?.routeCd || '',
      customerId: currentTrip?.customerId || '',
      loadingPoint: currentTrip?.loadingPoint || '',
      unloadingPoint: currentTrip?.unloadingPoint || '',
    }),
    [currentTrip]
  );

  useEffect(() => {
    dispatch(fetchDrivers());
    dispatch(fetchVehicles());
    dispatch(fetchRoutes());
  }, [dispatch]);

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
      const createdTrip = await dispatch(addSubtrip(currentTrip, data));
      console.log({ createdTrip });
      reset();
      enqueueSnackbar(!isEdit ? 'Trip created successfully!' : 'Trip edited successfully!');
      navigate(PATH_DASHBOARD.subtrip.detail(paramCase(createdTrip._id)));
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

              <RHFTextField name="customerId" label="Customer ID" />
              <RHFTextField name="loadingPoint" label="Loading Point" />
              <RHFTextField name="unloadingPoint" label="Unloading Point" />
              <RHFDatePicker name="startDate" label="Subtrip Start Date" />
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
