import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Card,
  Grid,
  InputAdornment,
  Stack,
  Typography,
  MenuItem,
  Tabs,
  Tab,
} from '@mui/material';
import { PATH_DASHBOARD } from '../../../routes/paths';
import { useSnackbar } from '../../../components/snackbar';
import FormProvider, {
  RHFTextField,
  RHFSelect,
  RHFDatePicker,
  RHFAutocomplete,
} from '../../../components/hook-form';
import { dispatch } from '../../../redux/store';

import { addExpense, updateExpense } from '../../../redux/slices/expense';
import SvgColor from '../../../components/svg-color';

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

  const [expenseType, setExpenseType] = useState('subtrip');

  const ExpenseSchema = Yup.object().shape({
    tripId: Yup.string().required('Trip ID is required'),
    subtripId: Yup.mixed().required('Subtrip is required').nullable(true),
    vehicleId: Yup.string().required('Vehicle ID is required'),
    date: Yup.date().required('Date is required'),
    expenseType: Yup.string().required('Expense Type is required'),
    installment: Yup.number().required('Installment is required').min(0),
    amount: Yup.number().required('Amount is required').min(0),
    slipNo: Yup.string().required('Slip No is required'),
    pumpCd: Yup.string(),
    remarks: Yup.string(),
    dieselLtr: Yup.number().min(0),
    paidThrough: Yup.string().required('Paid Through is required'),
    authorisedBy: Yup.string().required('Authorised By is required'),
  });

  const defaultValues = useMemo(
    () => ({
      tripId: currentExpense?.tripId || '',
      subtripId: currentExpense?.subtripId || null,
      vehicleId: currentExpense?.vehicleId || '',
      date: currentExpense?.date ? new Date(currentExpense?.date) : new Date(),
      expenseType: currentExpense?.expenseType || '',
      installment: currentExpense?.installment || 0,
      amount: currentExpense?.amount || 0,
      slipNo: currentExpense?.slipNo || '',
      pumpCd: currentExpense?.pumpCd || '',
      remarks: currentExpense?.remarks || '',
      dieselLtr: currentExpense?.dieselLtr || 0,
      paidThrough: currentExpense?.paidThrough || '',
      authorisedBy: currentExpense?.authorisedBy || '',
    }),
    [currentExpense]
  );

  const methods = useForm({
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

  const onSubmit = async (data) => {
    try {
      if (!isEdit) {
        await dispatch(addExpense(data));
      } else {
        await dispatch(updateExpense(currentExpense._id, data));
      }
      reset();
      enqueueSnackbar(!isEdit ? 'Expense added successfully!' : 'Expense edited successfully!');
      navigate(PATH_DASHBOARD.expense.list);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        spacing={3}
        sx={{ paddingLeft: 15 }}
      >
        <Tabs value={expenseType} onChange={(event, newValue) => setExpenseType(newValue)}>
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
              <RHFAutocomplete
                freeSolo
                name="subtripId"
                label="Subtrip"
                options={subtrips.map((c) => ({ label: c._id, value: c._id }))}
                getOptionLabel={(option) => option.label}
                isOptionEqualToValue={(option, value) => option.value === value.value}
              />
              <RHFSelect name="vehicleId" label="Vehicle ID">
                {vehicles.map((vehicle) => (
                  <MenuItem key={vehicle._id} value={vehicle._id}>
                    {vehicle.name}
                  </MenuItem>
                ))}
              </RHFSelect>
              <RHFDatePicker name="date" label="Date" />
              <RHFSelect name="expenseType" label="Expense Type">
                <MenuItem value="diesel">Diesel</MenuItem>
                <MenuItem value="adblue">Adblue</MenuItem>
                <MenuItem value="driver-salary">Driver Salary</MenuItem>
                <MenuItem value="trip-advance">Driver Advance</MenuItem>
                <MenuItem value="trip-extra-advance">Extra Advance</MenuItem>
                <MenuItem value="puncher">Tyre puncher</MenuItem>
                <MenuItem value="tyre-expense">Tyre Expense</MenuItem>
                <MenuItem value="police">Police</MenuItem>
                <MenuItem value="rto">Rto</MenuItem>
                <MenuItem value="toll">Toll</MenuItem>
                <MenuItem value="vehicle-repair">Vehicle Repair</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </RHFSelect>
              <RHFTextField name="installment" label="Installment" type="number" />
              <RHFTextField name="amount" label="Amount" type="number" />
              <RHFTextField name="slipNo" label="Slip No" />
              {values.expenseType === 'fuel' && (
                <>
                  <RHFTextField name="pumpCd" label="Pump Code" />
                  <RHFTextField name="dieselLtr" label="Diesel Liters" type="number" />
                </>
              )}
              <RHFTextField name="remarks" label="Remarks" />
              <RHFTextField name="paidThrough" label="Paid Through" />
              <RHFTextField name="authorisedBy" label="Authorised By" />
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!isEdit ? 'Create Expense' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
