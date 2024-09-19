import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Card, Divider, Grid, Stack, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { paramCase } from 'change-case';
import { useSnackbar } from '../../../components/snackbar';
import { Form, Field } from '../../../components/hook-form';
import { fetchRoutes } from '../../../redux/slices/route';
import { useSelector } from '../../../redux/store';
import { PATH_DASHBOARD } from '../../../routes/paths';
import { addSubtrip } from '../../../redux/slices/subtrip';
import { fetchCustomers } from '../../../redux/slices/customer';
import { fetchTrips } from '../../../redux/slices/trip';

SubtripCreateForm.propTypes = {
  isEdit: PropTypes.bool,
  currentTrip: PropTypes.string,
};

export default function SubtripCreateForm({ isEdit = false, currentTrip }) {
  console.log({ currentTrip });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const NewTripSchema = Yup.object().shape({
    // Subtrip
    tripId: Yup.mixed().required('Driver is required').nullable(true),
    routeCd: Yup.string().required('Route Code is required'),
    customerId: Yup.string().required('Customer ID is required'),
    loadingPoint: Yup.string().required('Loading Point is required'),
    unloadingPoint: Yup.string().required('Unloading Point is required'),
  });

  const defaultValues = useMemo(
    () => ({
      // Subtrip
      tripId: currentTrip ? { label: currentTrip, value: currentTrip } : null,
      routeCd: '',
      customerId: '',
      loadingPoint: '',
      unloadingPoint: '',
    }),
    [currentTrip]
  );

  useEffect(() => {
    dispatch(fetchCustomers());
    dispatch(fetchTrips());
    dispatch(fetchRoutes());
  }, [dispatch]);

  const { routes } = useSelector((state) => state.route);
  const { customers } = useSelector((state) => state.customer);
  const { trips } = useSelector((state) => state.trip);

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
      const createdSubtrip = await dispatch(addSubtrip(data.tripId.value, data));

      reset();
      enqueueSnackbar(!isEdit ? 'Subtrip created successfully!' : 'Subtrip edited successfully!');
      navigate(PATH_DASHBOARD.subtrip.detail(paramCase(createdSubtrip._id)));
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Form methods={methods} onSubmit={handleSubmit(onSubmit)}>
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
            <Field.Autocomplete
              sx={{ mb: 2 }}
              name="tripId"
              label="Trip"
              options={trips.map((c) => ({ label: c._id, value: c._id }))}
              getOptionLabel={(option) => option.label}
              isOptionEqualToValue={(option, value) => option.value === value.value}
              disabled={currentTrip}
            />

            <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={2}>
              <Field.Select native name="routeCd" label="Route">
                <option value="" />
                {routes.map((route) => (
                  <option key={route._id} value={route._id}>
                    {route.routeName}
                  </option>
                ))}
              </Field.Select>

              <Field.Select native name="customerId" label="Customer">
                <option value="">None</option>
                <Divider sx={{ borderStyle: 'dashed' }} />
                {customers.map((customer) => (
                  <option key={customer._id} value={customer._id}>
                    {customer.customerName}
                  </option>
                ))}
              </Field.Select>

              <Field.Text name="loadingPoint" label="Loading Point" />
              <Field.Text name="unloadingPoint" label="Unloading Point" />
              <Field.DatePicker name="startDate" label="Subtrip Start Date" />
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
