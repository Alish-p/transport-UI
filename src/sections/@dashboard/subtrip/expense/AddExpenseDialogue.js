import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { Box, Stack, Button, MenuItem } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// form components
import FormProvider, {
  RHFTextField,
  RHFDatePicker,
  RHFSelect,
} from '../../../../components/hook-form';
import ConfirmDialog from '../../../../components/confirm-dialog';
import { useSnackbar } from '../../../../components/snackbar';
import { addExpense } from '../../../../redux/slices/subtrip';
import { fetchPumps } from '../../../../redux/slices/pump';

const validationSchema = Yup.object().shape({
  date: Yup.date().required('Date is required'),
  expenseType: Yup.string().required('Expense Type is required'),
  installment: Yup.number().required('Installment is required').positive().integer(),
  amount: Yup.number().required('Amount is required').positive().integer(),
  slipNo: Yup.string(),
  pumpCd: Yup.string().when('expenseType', {
    is: 'fuel',
    then: Yup.string().required('Pump Code is required for fuel expenses'),
  }),
  dieselLtr: Yup.number().when('expenseType', {
    is: 'fuel',
    then: Yup.number()
      .required('Diesel Liters are required for fuel expenses')
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
  installment: 0,
  amount: 0,
  slipNo: '',
  pumpCd: '',
  dieselLtr: 0,
  remarks: '',
  paidThrough: '',
  authorisedBy: '',
};

export function AddExpenseDialog({ showDialog, setShowDialog, subtripId }) {
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
    dispatch(fetchPumps());
  }, [dispatch]);

  const { pumps } = useSelector((state) => state.pump);

  const onSubmit = async (data) => {
    try {
      await dispatch(addExpense(subtripId, data));
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
          <FormProvider methods={methods} onSubmit={onSubmit}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
            >
              <RHFDatePicker name="date" label="Date" />
              <RHFSelect name="expenseType" label="Expense Type">
                <MenuItem value="fuel">Fuel</MenuItem>
                <MenuItem value="repair">Repair</MenuItem>
                <MenuItem value="toll">Toll</MenuItem>
                <MenuItem value="puncher">Puncher</MenuItem>
                <MenuItem value="police">Police</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </RHFSelect>
              <RHFTextField name="installment" label="Installment" type="number" />
              <RHFTextField name="amount" label="Amount" type="number" />
              <RHFTextField name="slipNo" label="Slip No" />
              {expenseType === 'fuel' && (
                <>
                  <RHFSelect native name="pumpCd" label="Pump">
                    <option value="" />
                    {pumps.map((pump) => (
                      <option key={pump._id} value={pump._id}>
                        {pump.pumpName}
                      </option>
                    ))}
                  </RHFSelect>

                  <RHFTextField name="dieselLtr" label="Diesel Liters" type="number" />
                </>
              )}
              <RHFTextField name="remarks" label="Remarks" />
              <RHFTextField name="paidThrough" label="Paid Through" />
              <RHFTextField name="authorisedBy" label="Authorised By" />
            </Box>
          </FormProvider>
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
};
