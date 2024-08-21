import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { Box, Stack, Button, Divider, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// form components
import FormProvider, {
  RHFTextField,
  RHFDatePicker,
  RHFSelect,
  RHFAutocomplete,
} from '../../../components/hook-form';
import ConfirmDialog from '../../../components/confirm-dialog';
import { useSnackbar } from '../../../components/snackbar';
import { addMaterialInfo } from '../../../redux/slices/subtrip';
import { fetchPumps } from '../../../redux/slices/pump';
import { fetchCustomer } from '../../../redux/slices/customer';

// Define the validation schema using Yup
const validationSchema = Yup.object().shape({
  consignee: Yup.mixed().required('Consignee is required').nullable(true),
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
  tds: Yup.number().integer(),
  driverAdvance: Yup.number().integer(),
  dieselLtr: Yup.number().integer(),
  pumpCd: Yup.string(),
});

const defaultValues = {
  consignee: null,
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
  driverAdvance: 0,
  dieselLtr: 0,
  pumpCd: '',
};

export function SubtripMaterialInfoDialog({
  showDialog,
  setShowDialog,
  subtripId,
  vehicleId,
  consignees = [],
}) {
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
      // Dispatch action to update subtrip with material details\
      await dispatch(
        addMaterialInfo(subtripId, { ...data, vehicleId, consignee: data?.consignee?.value })
      );

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

  useEffect(() => {
    if (showDialog) {
      dispatch(fetchPumps());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showDialog]);

  const { pumps } = useSelector((state) => state.pump);

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
              <RHFAutocomplete
                freeSolo
                name="consignee"
                label="consignee"
                options={consignees.map((c) => ({ label: c.name, value: c.name }))}
                getOptionLabel={(option) => option.label}
                isOptionEqualToValue={(option, value) => option.value === value.value}
              />

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
              <RHFTextField name="tds" label="TDS" type="number" required />
            </Box>
            <Divider sx={{ marginBlock: '20px' }} />

            <Typography variant="h5" mb="20px">
              {' '}
              Advance Details{' '}
            </Typography>

            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
            >
              <RHFTextField name="driverAdvance" label="Driver Advance" type="number" />
              <RHFTextField name="dieselLtr" label="Diesel (Ltr)" />
              <>
                <RHFSelect native name="pumpCd" label="Pump">
                  <option value="" />
                  {pumps.map((pump) => (
                    <option key={pump._id} value={pump._id}>
                      {pump.pumpName}
                    </option>
                  ))}
                </RHFSelect>
              </>
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
  vehicleId: PropTypes.string.isRequired,
  consignees: PropTypes.array,
};
