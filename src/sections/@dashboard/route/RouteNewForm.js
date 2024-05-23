import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useCallback, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack, Typography } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import { useSnackbar } from '../../../components/snackbar';
import FormProvider, {
  RHFTextField,
  RHFDatePicker,
  RHFSelect,
} from '../../../components/hook-form';
// redux
import { dispatch } from '../../../redux/store';
import { addRoute, updateRoute } from '../../../redux/slices/route';
import { tripType } from './RouteTableConfig';
// ----------------------------------------------------------------------

RouteForm.propTypes = {
  isEdit: PropTypes.bool,
  currentRoute: PropTypes.object,
};

export default function RouteForm({ isEdit = false, currentRoute }) {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const NewRouteSchema = Yup.object().shape({
    routeName: Yup.string().required('Route Name is required'),
    tollAmt: Yup.number().required('Toll Amount is required'),
    advanceAmt: Yup.number().required('Advance Amount is required'),
    diesel: Yup.number().required('Diesel is required'),
    adBlue: Yup.number().required('Ad Blue is required'),
    fromPlace: Yup.string().required('From Place is required'),
    toPlace: Yup.string().required('To Place is required'),
    noOfDays: Yup.number().required('Number of Days is required'),
    driverSalary: Yup.number().required('Driver Salary is required'),
    tripType: Yup.string().required('Trip Type is required'),
    fixMilage: Yup.number().required('Fixed Milage is required'),
    performanceMilage: Yup.number().required('Performance Milage is required'),
    ratePerTon: Yup.number().required('Rate per Ton is required'),
    salary: Yup.number().required('Salary is required'),
    salaryPercentage: Yup.number().required('Salary Percentage is required'),
    distance: Yup.number().required('Distance is required'),
    validFromDate: Yup.date().required('Valid From Date is required'),
    transportType: Yup.string().required('Transport Type is required'),
    validTillDate: Yup.date().required('Valid Till Date is required'),
  });

  const defaultValues = useMemo(
    () => ({
      routeName: currentRoute?.routeName || '',
      tollAmt: currentRoute?.tollAmt || 0,
      advanceAmt: currentRoute?.advanceAmt || 0,
      diesel: currentRoute?.diesel || 0,
      adBlue: currentRoute?.adBlue || 0,
      fromPlace: currentRoute?.fromPlace || '',
      toPlace: currentRoute?.toPlace || '',
      noOfDays: currentRoute?.noOfDays || 0,
      driverSalary: currentRoute?.driverSalary || 0,
      tripType: currentRoute?.tripType || '',
      fixMilage: currentRoute?.fixMilage || 0,
      performanceMilage: currentRoute?.performanceMilage || 0,
      ratePerTon: currentRoute?.ratePerTon || 0,
      salary: currentRoute?.salary || 0,
      salaryPercentage: currentRoute?.salaryPercentage || 0,
      distance: currentRoute?.distance || 0,
      validFromDate: currentRoute?.validFromDate || '',
      transportType: currentRoute?.transportType || '',
      validTillDate: currentRoute?.validTillDate || '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentRoute]
  );

  const methods = useForm({
    resolver: yupResolver(NewRouteSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (isEdit && currentRoute) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentRoute]);

  const onSubmit = async (data) => {
    try {
      if (!isEdit) {
        await dispatch(addRoute(data));
      } else {
        await dispatch(updateRoute(currentRoute._id, data));
      }
      reset();
      enqueueSnackbar(!isEdit ? 'Route added successfully!' : 'Route edited successfully!');
      navigate(PATH_DASHBOARD.route.list);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card sx={{ p: 3 }}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
            >
              <RHFTextField name="routeName" label="Route Name" />
              <RHFTextField name="tollAmt" label="Toll Amount" type="number" />
              <RHFTextField name="advanceAmt" label="Advance Amount" type="number" />
              <RHFTextField name="diesel" label="Diesel" type="number" />
              <RHFTextField name="adBlue" label="Ad Blue" type="number" />
              <RHFTextField name="fromPlace" label="From Place" />
              <RHFTextField name="toPlace" label="To Place" />
              <RHFTextField name="noOfDays" label="Number of Days" type="number" />
              <RHFTextField name="driverSalary" label="Driver Salary" type="number" />
              <RHFSelect native name="tripType" label="Trip Type">
                <option value="" />
                {tripType.map(({ key, value }) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </RHFSelect>
              <RHFTextField name="fixMilage" label="Fixed Milage" type="number" />
              <RHFTextField name="performanceMilage" label="Performance Milage" type="number" />
              <RHFTextField name="ratePerTon" label="Rate per Ton" type="number" />
              <RHFTextField name="salary" label="Salary" type="number" />
              <RHFTextField name="salaryPercentage" label="Salary Percentage" type="number" />
              <RHFTextField name="distance" label="Distance" type="number" />
              <RHFDatePicker name="validFromDate" label="Valid From Date" />
              <RHFTextField name="transportType" label="Transport Type" />
              <RHFDatePicker name="validTillDate" label="Valid Till Date" />
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!isEdit ? 'Create Route' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
