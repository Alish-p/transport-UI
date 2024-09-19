import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { Box, Stack, Button, MenuItem } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// form components
import { Form, Field } from '../../../components/hook-form';
import ConfirmDialog from '../../../components/confirm-dialog';
import { useSnackbar } from '../../../components/snackbar';
import { addExpense } from '../../../redux/slices/subtrip';
import { fetchPumps } from '../../../redux/slices/pump';

const validationSchema = Yup.object().shape({
  date: Yup.date().required('Date is required'),
  expenseType: Yup.string().required('Expense Type is required'),
  amount: Yup.number().required('Amount is required').integer(),
  slipNo: Yup.string(),
  pumpCd: Yup.string().when('expenseType', {
    is: 'diesel',
    then: Yup.string().required('Pump Code is required for Diesel expenses'),
  }),
  dieselLtr: Yup.number().when('expenseType', {
    is: 'diesel',
    then: Yup.number()
      .required('Diesel Liters are required for Diesel expenses')
      .positive()
      .integer(),
  }),
  remarks: Yup.string(),
  paidThrough: Yup.string(),
  authorisedBy: Yup.string(),
});

const defaultValues = {
  date: new Date(),
  expenseType: '',
  amount: 0,
  slipNo: '',
  pumpCd: '',
  dieselLtr: 0,
  remarks: '',
  paidThrough: '',
  authorisedBy: '',
};

export function AddExpenseDialog({ showDialog, setShowDialog, subtripId, vehicleId }) {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const methods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    watch,
    formState: { isSubmitting },
  } = methods;

  const expenseType = watch('expenseType');

  const handleReset = () => {
    reset(defaultValues);
  };

  useEffect(() => {
    if (showDialog) {
      dispatch(fetchPumps());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showDialog]);

  const { pumps } = useSelector((state) => state.pump);

  const onSubmit = async (data) => {
    try {
      if (data.expenseType !== 'diesel') {
        data.pumpCd = null;
      }
      await dispatch(addExpense(subtripId, { ...data, vehicleId }));
      enqueueSnackbar('Expense added successfully!');
      handleReset();
      setShowDialog(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!showDialog) {
      handleReset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showDialog]);

  return (
    <ConfirmDialog
      open={showDialog}
      onClose={() => setShowDialog(false)}
      title="Add Expense"
      content={
        <Box sx={{ marginTop: '6px' }}>
          <Form methods={methods} onSubmit={onSubmit}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
            >
              <Field.DatePicker name="date" label="Date" />
              <Field.Select name="expenseType" label="Expense Type">
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
              </Field.Select>
              <Field.Text name="amount" label="Amount" type="number" />
              <Field.Text name="slipNo" label="Slip No" />
              {expenseType === 'diesel' && (
                <>
                  <Field.Select native name="pumpCd" label="Pump">
                    <option value="" />
                    {pumps.map((pump) => (
                      <option key={pump._id} value={pump._id}>
                        {pump.pumpName}
                      </option>
                    ))}
                  </Field.Select>

                  <Field.Text name="dieselLtr" label="Diesel Liters" type="number" />
                </>
              )}
              <Field.Text name="remarks" label="Remarks" />
              <Field.Text name="paidThrough" label="Paid Through" />
              <Field.Text name="authorisedBy" label="Authorised By" />
            </Box>
          </Form>
        </Box>
      }
      action={
        <Stack direction="row" spacing={1}>
          <Button type="reset" onClick={handleReset} variant="outlined" loading={isSubmitting}>
            Reset
          </Button>
          <Button
            type="submit"
            variant="contained"
            loading={isSubmitting}
            onClick={handleSubmit(onSubmit)}
          >
            Save Changes
          </Button>
        </Stack>
      }
    />
  );
}

AddExpenseDialog.propTypes = {
  showDialog: PropTypes.bool.isRequired,
  setShowDialog: PropTypes.func.isRequired,
  subtripId: PropTypes.string.isRequired,
  vehicleId: PropTypes.string.isRequired,
};
