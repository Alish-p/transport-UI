import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useCallback, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { useFieldArray, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack, Typography, Button, MenuItem } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import { useSnackbar } from '../../../components/snackbar';
import { Form, Field } from '../../../components/hook-form';
// redux
import { dispatch } from '../../../redux/store';
import { addRoute, updateRoute } from '../../../redux/slices/route';
import { tripType } from './RouteTableConfig';
import Iconify from '../../../components/iconify/Iconify';
import { vehicleTypes } from '../vehicle/vehicle-config';
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
    fromPlace: Yup.string().required('From Place is required'),
    toPlace: Yup.string().required('To Place is required'),
    noOfDays: Yup.number().required('Number of Days is required'),
    tripType: Yup.string().required('Trip Type is required'),
    ratePerTon: Yup.number().required('Rate per Ton is required'),
    distance: Yup.number().required('Distance is required'),
    validFromDate: Yup.date().required('Valid From Date is required'),
    transportType: Yup.string().required('Transport Type is required'),
    validTillDate: Yup.date().required('Valid Till Date is required'),
    salary: Yup.array().of(
      Yup.object().shape({
        vehicleType: Yup.string().required('Vehicle Type is required'),
        fixedSalary: Yup.string().required('Fixed Salary is required'),
        percentageSalary: Yup.string().required('Percentage Salary is required'),
        fixMilage: Yup.number().required('Fixed Milage is required'),
        performanceMilage: Yup.number().required('Performance Milage is required'),
        advanceAmt: Yup.number().required('Advance Amount is required'),
        diesel: Yup.number().required('Diesel is required'),
        adBlue: Yup.number().required('Ad Blue is required'),
      })
    ),
  });

  const defaultValues = useMemo(
    () => ({
      routeName: currentRoute?.routeName || '',
      tollAmt: currentRoute?.tollAmt || 0,
      fromPlace: currentRoute?.fromPlace || '',
      toPlace: currentRoute?.toPlace || '',
      noOfDays: currentRoute?.noOfDays || 0,
      tripType: currentRoute?.tripType || '',
      ratePerTon: currentRoute?.ratePerTon || 0,
      distance: currentRoute?.distance || 0,
      validFromDate: currentRoute?.validFromDate
        ? new Date(currentRoute?.validFromDate)
        : new Date(),
      transportType: currentRoute?.transportType || '',
      validTillDate: new Date(
        currentRoute?.validTillDate || new Date().setFullYear(new Date().getFullYear() + 1)
      ), // Default to 1 year in the future

      salary: currentRoute?.salary || [
        {
          vehicleType: '',
          fixedSalary: 0,
          percentageSalary: 0,
          fixMilage: 0,
          performanceMilage: 0,
          advanceAmt: 0,
          diesel: 0,
          adBlue: 0,
        },
      ],
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
    control,
    formState: { isSubmitting },
  } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'salary',
  });

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

  const handleAddSalary = () => {
    append({
      vehicleType: '',
      fixedSalary: 0,
      percentageSalary: 0,
      fixMilage: 0,
      performanceMilage: 0,
      advanceAmt: 0,
      diesel: 0,
      adBlue: 0,
    });
  };

  const handleRemoveSalary = (index) => {
    remove(index);
  };

  return (
    <Form methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        {/* <Grid item xs={5}>
        </Grid> */}
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
              <Field.Text name="routeName" label="Route Name" />
              <Field.Text name="tollAmt" label="Toll Amount" type="number" />

              <Field.Text name="fromPlace" label="From Place" />
              <Field.Text name="toPlace" label="To Place" />
              <Field.Text name="noOfDays" label="Number of Days" type="number" />

              <Field.Select native name="tripType" label="Trip Type">
                <option value="" />
                {tripType.map(({ key, value }) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </Field.Select>

              <Field.Text name="distance" label="Distance" type="number" />
              <Field.DatePicker name="validFromDate" label="Valid From Date" />
              <Field.Text name="transportType" label="Transport Type" />
              <Field.DatePicker name="validTillDate" label="Valid Till Date" />
            </Box>

            <Typography variant="h6" sx={{ color: 'text.disabled', mt: 3 }}>
              Salaries:
            </Typography>

            {fields.map((field, index) => (
              <Stack key={field.id} spacing={2} sx={{ mt: 2 }}>
                <Box
                  rowGap={3}
                  columnGap={2}
                  display="grid"
                  gridTemplateColumns={{
                    xs: 'repeat(2, 1fr)',
                    sm: 'repeat(12, 1fr)',
                  }}
                  sx={{ p: 2, border: '1px dashed grey', borderRadius: '15px', m: 5 }}
                >
                  <Box gridColumn="span 3">
                    <Field.Select name={`salary[${index}].vehicleType`} label="Vehicle Type">
                      {vehicleTypes.map(({ value, key }) => (
                        <MenuItem key={key} value={value}>
                          {value}
                        </MenuItem>
                      ))}
                    </Field.Select>
                  </Box>

                  <Box gridColumn="span 3">
                    <Field.Text name={`salary[${index}].fixedSalary`} label="Fixed Salary" />
                  </Box>
                  <Box gridColumn="span 3">
                    <Field.Text
                      name={`salary[${index}].percentageSalary`}
                      label="Percentage Salary"
                    />
                  </Box>

                  <Box gridColumn="span 2">
                    <Field.Text name={`salary[${index}].fixMilage`} label="Fix Milage" />
                  </Box>
                  <Box gridColumn="span 3">
                    <Field.Text
                      name={`salary[${index}].performanceMilage`}
                      label="Performance Milage"
                    />
                  </Box>
                  <Box gridColumn="span 3">
                    <Field.Text name={`salary[${index}].advanceAmt`} label="Advance Amtount" />
                  </Box>
                  <Box gridColumn="span 3">
                    <Field.Text name={`salary[${index}].diesel`} label="diesel" />
                  </Box>
                  <Box gridColumn="span 2">
                    <Field.Text name={`salary[${index}].adBlue`} label="Adblue" />
                  </Box>

                  <Box
                    gridColumn="span 1"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Button
                      size="small"
                      color="error"
                      startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
                      onClick={() => handleRemoveSalary(index)}
                    >
                      Remove
                    </Button>
                  </Box>
                </Box>
              </Stack>
            ))}
            <Button
              size="small"
              color="primary"
              startIcon={<Iconify icon="mingcute:add-line" />}
              onClick={handleAddSalary}
              sx={{ mt: 3 }}
            >
              Add Consignee
            </Button>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!isEdit ? 'Create Route' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Form>
  );
}
