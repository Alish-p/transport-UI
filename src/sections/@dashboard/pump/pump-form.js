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
import { Form, Field } from '../../../components/hook-form';
// redux
import { dispatch } from '../../../redux/store';
import { addPump, updatePump } from '../../../redux/slices/pump';

// ----------------------------------------------------------------------

PumpForm.propTypes = {
  isEdit: PropTypes.bool,
  currentPump: PropTypes.object,
};

export default function PumpForm({ isEdit = false, currentPump }) {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const NewPumpSchema = Yup.object().shape({
    pumpName: Yup.string().required('Pump Name is required'),
    placeName: Yup.string().required('Place Name is required'),
    ownerName: Yup.string().required('Owner Name is required'),
    ownerCellNo: Yup.string().required('Owner Cell No is required'),
    pumpPhoneNo: Yup.string().required('Pump Phone No is required'),
    taluk: Yup.string().required('Taluk is required'),
    district: Yup.string().required('District is required'),
    contactPerson: Yup.string().required('Contact Person is required'),
    address: Yup.string().required('Address is required'),
  });

  const defaultValues = useMemo(
    () => ({
      pumpName: currentPump?.pumpName || '',
      placeName: currentPump?.placeName || '',
      ownerName: currentPump?.ownerName || '',
      ownerCellNo: currentPump?.ownerCellNo || '',
      pumpPhoneNo: currentPump?.pumpPhoneNo || '',
      taluk: currentPump?.taluk || '',
      district: currentPump?.district || '',
      contactPerson: currentPump?.contactPerson || '',
      address: currentPump?.address || '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentPump]
  );

  const methods = useForm({
    resolver: yupResolver(NewPumpSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (isEdit && currentPump) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentPump]);

  const onSubmit = async (data) => {
    try {
      if (!isEdit) {
        await dispatch(addPump(data));
      } else {
        await dispatch(updatePump(currentPump._id, data));
      }
      reset();
      enqueueSnackbar(!isEdit ? 'Pump added successfully!' : 'Pump edited successfully!');
      navigate(PATH_DASHBOARD.pump.list);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form methods={methods} onSubmit={handleSubmit(onSubmit)}>
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
              <Field.Text name="pumpName" label="Pump Name" />
              <Field.Text name="placeName" label="Place Name" />
              <Field.Text name="ownerName" label="Owner Name" />
              <Field.Text name="ownerCellNo" label="Owner Cell No" />
              <Field.Text name="pumpPhoneNo" label="Pump Phone No" />
              <Field.Text name="taluk" label="Taluk" />
              <Field.Text name="district" label="District" />
              <Field.Text name="contactPerson" label="Contact Person" />
              <Field.Text name="address" label="Address" />
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!isEdit ? 'Create Pump' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Form>
  );
}
