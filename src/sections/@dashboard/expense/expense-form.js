import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack, Typography, MenuItem, Tabs, Tab } from '@mui/material';
import { PATH_DASHBOARD } from '../../../routes/paths';
import { useSnackbar } from '../../../components/snackbar';
import { Form, Field } from '../../../components/hook-form';
import { dispatch } from '../../../redux/store';

import { addExpense, updateExpense } from '../../../redux/slices/expense';
import SvgColor from '../../../components/svg-color';
import { expenseTypes } from './expense-config';
import vehicle from '../../../redux/slices/vehicle';

ExpenseForm.propTypes = {
  isEdit: PropTypes.bool,
  currentExpense: PropTypes.object,
  subtrips: PropTypes.array.isRequired,
  vehicles: PropTypes.array.isRequired,
};

export default function ExpenseForm({
  isEdit = false,
  currentExpense,
  subtrips = [],
  vehicles = [],
}) {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [expenseCategory, setExpenseCategory] = useState('subtrip');

  const ExpenseSchema = Yup.object().shape({
    subtripId: Yup.mixed().required('Subtrip is required').nullable(true),
    vehicleId: Yup.mixed().required('Vehicle ID is required').nullable(true),
    date: Yup.date().required('Date is required'),
    expenseType: Yup.string().required('Expense Type is required'),
    installment: Yup.number().min(0),
    amount: Yup.number().required('Amount is required').min(0),
    slipNo: Yup.string().required('Slip No is required'),
    pumpCd: Yup.string().nullable(true),
    remarks: Yup.string(),
    dieselLtr: Yup.number().min(0),
    paidThrough: Yup.string().required('Paid Through is required'),
    authorisedBy: Yup.string().required('Authorised By is required'),
  });

  const defaultValues = useMemo(
    () => ({
      subtripId: currentExpense?.subtripId || null,
      vehicleId: currentExpense?.vehicleId || '',
      date: currentExpense?.date ? new Date(currentExpense?.date) : new Date(),
      expenseType: currentExpense?.expenseType || '',
      installment: currentExpense?.installment || 0,
      amount: currentExpense?.amount || 0,
      slipNo: currentExpense?.slipNo || '',
      pumpCd: currentExpense?.pumpCd || null,
      remarks: currentExpense?.remarks || '',
      dieselLtr: currentExpense?.dieselLtr || 0,
      paidThrough: currentExpense?.paidThrough || '',
      authorisedBy: currentExpense?.authorisedBy || '',
    }),
    [currentExpense]
  );

  const methods = useForm({
    mode: 'all',
    resolver: yupResolver(ExpenseSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  useEffect(() => {
    if (isEdit && currentExpense) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
  }, [isEdit, currentExpense, reset, defaultValues]);

  // Selecting associated vehicle to subtrip

  const onSubmit = async (data) => {
    try {
      const formData = {
        ...data,
        expenseCategory,
        subtripId: data?.subtripId?.value,
        vehicleId: data.vehicleId?._id,
      };
      if (!isEdit) {
        await dispatch(addExpense(formData));
      } else {
        await dispatch(updateExpense(currentExpense._id, formData));
      }
      reset();
      enqueueSnackbar(!isEdit ? 'Expense added successfully!' : 'Expense edited successfully!');
      navigate(PATH_DASHBOARD.expense.list);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Form methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        spacing={3}
        sx={{ paddingLeft: 15 }}
      >
        <Tabs value={expenseCategory} onChange={(event, newValue) => setExpenseCategory(newValue)}>
          <Tab
            iconPosition="top"
            key="subtrip"
            icon={
              <SvgColor src="/assets/icons/navbar/ic_trip.svg" sx={{ width: 0.5, height: 0.5 }} />
            }
            label="Subtrip Expense"
            value="subtrip"
          />
          <Tab
            iconPosition="top"
            key="vehicle"
            icon={
              <SvgColor src="/assets/icons/navbar/ic_vehicle.svg" sx={{ width: 1, height: 1 }} />
            }
            label="Vehicle Expense"
            value="vehicle"
          />
        </Tabs>
      </Grid>

      <Grid container spacing={3} sx={{ pt: 5 }}>
        <Grid item xs={12} md={3}>
          <Box sx={{ pt: 2, pb: 5, px: 3 }}>
            <Typography variant="h6" sx={{ color: 'text.primary' }}>
              Expense Details
            </Typography>
            <Typography variant="subtitle1" sx={{ color: 'text.secondary', mt: 1 }}>
              Please provide the details of the Expense.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Box rowGap={3} columnGap={2} display="grid" gridTemplateColumns="repeat(2, 1fr)">
              {expenseCategory === 'subtrip' ? (
                <Field.Autocomplete
                  freeSolo
                  name="subtripId"
                  label="Subtrip"
                  options={subtrips.map((c) => ({
                    label: `${c._id} - ${c.routeCd.routeName} (${c.loadingPoint} to ${c.unloadingPoint})`,
                    value: c._id,
                  }))}
                  getOptionLabel={(option) => option.label}
                  isOptionEqualToValue={(option, value) => option.value === value.value}
                  helperText="Vehicle MH08AB1233 is associated with this Subtrip"
                />
              ) : (
                <Field.Autocomplete
                  freeSolo
                  name="vehicleId"
                  label="Vehicle ID"
                  options={vehicles.map((v) => ({ label: v.vehicleNo, value: v._id }))}
                  getOptionLabel={(option) => option.label}
                  isOptionEqualToValue={(option, value) => option.value === value.value}
                />
              )}

              <Field.DatePicker name="date" label="Date" />
              <Field.Select name="expenseType" label="Expense Type">
                {expenseTypes.map(({ value, label }) => (
                  <MenuItem key={value} value={value}>
                    {label}
                  </MenuItem>
                ))}
              </Field.Select>
              <Field.Text name="installment" label="Installment" type="number" />
              <Field.Text name="amount" label="Amount" type="number" />
              <Field.Text name="slipNo" label="Slip No" />
              {values.expenseType === 'diesel' && (
                <>
                  <Field.Text name="pumpCd" label="Pump Code" />
                  <Field.Text name="dieselLtr" label="Diesel Liters" type="number" />
                </>
              )}
              <Field.Text name="remarks" label="Remarks" />
              <Field.Text name="paidThrough" label="Paid Through" />
              <Field.Text name="authorisedBy" label="Authorised By" />
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!isEdit ? 'Create Expense' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Form>
  );
}
