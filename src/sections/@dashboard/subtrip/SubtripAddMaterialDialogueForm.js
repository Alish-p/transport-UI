// SubtripMaterialInfoDialog.js
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { Box, Stack, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

// form components
import FormProvider, { RHFTextField, RHFDatePicker } from '../../../components/hook-form';
import ConfirmDialog from '../../../components/confirm-dialog';
import { useSnackbar } from '../../../components/snackbar';
import { addMaterialInfo } from '../../../redux/slices/subtrip';

// Define the validation schema using Yup
const validationSchema = Yup.object().shape({
  loadingWeight: Yup.number().required('Loading Weight is required').positive().integer(),
  startKm: Yup.number().positive().integer(),
  rate: Yup.number().positive().integer(),
  invoiceNo: Yup.string(),
  shipmentNo: Yup.string(),
  orderNo: Yup.string(),
  ewayBill: Yup.string(),
  ewayExpiryDate: Yup.date(),
  materialType: Yup.string(),
  quantity: Yup.number().positive().integer(),
  grade: Yup.string(),
  tds: Yup.number().positive().integer(),
});

const defaultValues = {
  loadingWeight: 0,
  startKm: 0,
  rate: 0,
  invoiceNo: '',
  shipmentNo: '',
  orderNo: '',
  ewayBill: '',
  ewayExpiryDate: null,
  materialType: '',
  quantity: 0,
  grade: '',
  tds: 0,
};

export function SubtripMaterialInfoDialog({ showDialog, setShowDialog, subtripId }) {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const methods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  const handleReset = () => {
    reset(defaultValues);
  };

  const onSubmit = async (data) => {
    try {
      // Dispatch action to update subtrip with material details
      await dispatch(addMaterialInfo(subtripId, data));
      enqueueSnackbar('Material details added successfully!');
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
      title="Add Material Details"
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
              <RHFTextField name="loadingWeight" label="Loading Weight" type="number" />
              <RHFTextField name="startKm" label="Start Km" type="number" />
              <RHFTextField name="rate" label="Rate" type="number" />
              <RHFTextField name="invoiceNo" label="Invoice No" />
              <RHFTextField name="shipmentNo" label="Shipment No" />
              <RHFTextField name="orderNo" label="Order No" />
              <RHFTextField name="ewayBill" label="Eway Bill" />
              <RHFDatePicker name="ewayExpiryDate" label="Eway Expiry Date" />
              <RHFTextField name="materialType" label="Material Type" />
              <RHFTextField name="quantity" label="Quantity" type="number" />
              <RHFTextField name="grade" label="Grade" />
              <RHFTextField name="tds" label="TDS" type="number" />
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

SubtripMaterialInfoDialog.propTypes = {
  showDialog: PropTypes.bool.isRequired,
  setShowDialog: PropTypes.func.isRequired,
  subtripId: PropTypes.string.isRequired,
};
