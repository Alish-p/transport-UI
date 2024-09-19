import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { Box, Stack, Button, Typography } from '@mui/material';
import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

// form components
import { Form, Field } from '../../../components/hook-form';
import ConfirmDialog from '../../../components/confirm-dialog';
import { useSnackbar } from '../../../components/snackbar';
import { receiveLR } from '../../../redux/slices/subtrip';

// Define the validation schema using Yup
const validationSchema = Yup.object().shape({
  remarks: Yup.string(),
  unloadingWeight: Yup.number()
    .max(Yup.ref('loadingWeight'), 'Unloading weight must be less than or equal to loading weight')
    .required('Unloading weight is required'),
  endKm: Yup.number()
    .min(Yup.ref('startKm'), 'End Km must be greater than Start Km')
    .required('End Km is required'),
});

export function RecieveSubtripDialog({ showDialog, setShowDialog, subtrip }) {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const { _id, loadingWeight, startKm } = subtrip;

  const defaultValues = {
    remarks: '',
    loadingWeight,
    unloadingWeight: 0,
    deductedWeight: 0,
    startKm,
    endKm: 0,
    totalKm: 0,
    endDate: null,
    detentionTime: 0,
    hasError: false,
  };

  const methods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    setValue,
    formState: { isSubmitting },
    control,
  } = methods;

  const unloadingWeight = useWatch({ control, name: 'unloadingWeight' });
  const endKm = useWatch({ control, name: 'endKm' });

  useEffect(() => {
    const deductedWeight = loadingWeight - unloadingWeight;
    setValue('deductedWeight', deductedWeight);
    setValue('hasError', deductedWeight !== 0);

    const totalKm = endKm - startKm;
    setValue('totalKm', totalKm);
  }, [unloadingWeight, loadingWeight, setValue, endKm, startKm]);

  const handleReset = () => {
    reset(defaultValues);
  };

  const onSubmit = async (data) => {
    try {
      await dispatch(receiveLR(_id, data));
      enqueueSnackbar('Subtrip received successfully!');
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
      title="Receive Subtrip"
      content={
        <Box sx={{ marginTop: '6px' }}>
          <Form methods={methods} onSubmit={onSubmit}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(3, 1fr)',
              }}
            >
              <Field.Text name="loadingWeight" label="Loading Wt." type="number" disabled />
              <Field.Text name="unloadingWeight" label="Unloading Wt." type="number" autoFocus />
              <Field.Text
                name="deductedWeight"
                label="Deducted Weight"
                type="number"
                disabled
                showZero
              />

              <Field.Text name="startKm" label="Start Km" type="number" disabled />
              <Field.Text name="endKm" label="End Km" type="number" />
              <Field.Text name="totalKm" label="Total Trip Km" type="number" disabled />

              <Field.DatePicker name="endDate" label="End Date" />

              <Field.Text name="detentionTime" label="Detention Time" type="number" />
              <Field.Text name="remarks" label="Remarks" type="text" />
            </Box>

            <Box sx={{ marginTop: '20px' }}>
              <Field.Switch
                name="hasError"
                label={<Typography variant="subtitle2">Recievied With Error ?</Typography>}
              />
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

RecieveSubtripDialog.propTypes = {
  showDialog: PropTypes.bool.isRequired,
  setShowDialog: PropTypes.func.isRequired,
  subtrip: PropTypes.object.isRequired,
};
