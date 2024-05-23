import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useCallback, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, InputAdornment, Stack, Typography } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import { useSnackbar } from '../../../components/snackbar';
import FormProvider, { RHFTextField, RHFSelect } from '../../../components/hook-form';
// redux
import { dispatch } from '../../../redux/store';
import { addTransporter, updateTransporter } from '../../../redux/slices/transporter';
import { transportType } from './TransporterTableConfig';

// ----------------------------------------------------------------------

TransporterForm.propTypes = {
  isEdit: PropTypes.bool,
  currentTransporter: PropTypes.object,
};

export default function TransporterForm({ isEdit = false, currentTransporter }) {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const NewTransporterSchema = Yup.object().shape({
    transportName: Yup.string().required('Transport Name is required'),
    address: Yup.string().required('Address is required'),
    place: Yup.string().required('Place is required'),
    pinNo: Yup.string().required('Pin No is required'),
    cellNo: Yup.string().required('Cell No is required'),
    bankCd: Yup.string().required('Bank Code is required'),
    ifscCode: Yup.string().required('IFSC Code is required'),
    accNo: Yup.string().required('Account No is required'),
    paymentMode: Yup.string().required('Payment Mode is required'),
    panNo: Yup.string().required('PAN No is required'),
    ownerName: Yup.string().required('Owner Name is required'),
    gstNo: Yup.string().required('GST No is required'),
    bankBranch: Yup.string().required('Bank Branch is required'),
    emailId: Yup.string().required('Email ID is required'),
    phoneNo: Yup.string().required('Phone No is required'),
    transportType: Yup.string().required('Transport Type is required'),
    agreementNo: Yup.string().required('Agreement No is required'),
    tdsPercentage: Yup.number().required('TDS Percentage is required').min(0),
  });

  const defaultValues = useMemo(
    () => ({
      transportName: currentTransporter?.transportName || '',
      address: currentTransporter?.address || '',
      place: currentTransporter?.place || '',
      pinNo: currentTransporter?.pinNo || '',
      cellNo: currentTransporter?.cellNo || '',
      bankCd: currentTransporter?.bankCd || '',
      ifscCode: currentTransporter?.ifscCode || '',
      accNo: currentTransporter?.accNo || '',
      paymentMode: currentTransporter?.paymentMode || '',
      panNo: currentTransporter?.panNo || '',
      ownerName: currentTransporter?.ownerName || '',
      gstNo: currentTransporter?.gstNo || '',
      bankBranch: currentTransporter?.bankBranch || '',
      emailId: currentTransporter?.emailId || '',
      phoneNo: currentTransporter?.phoneNo || '',
      transportType: currentTransporter?.transportType || '',
      agreementNo: currentTransporter?.agreementNo || '',
      tdsPercentage: currentTransporter?.tdsPercentage || 0,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentTransporter]
  );

  const methods = useForm({
    resolver: yupResolver(NewTransporterSchema),
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
    if (isEdit && currentTransporter) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentTransporter]);

  const onSubmit = async (data) => {
    try {
      if (!isEdit) {
        await dispatch(addTransporter(data));
      } else {
        await dispatch(updateTransporter(currentTransporter._id, data));
      }
      reset();
      enqueueSnackbar(
        !isEdit ? 'Transporter added successfully!' : 'Transporter edited successfully!'
      );
      navigate(PATH_DASHBOARD.transporter.list);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
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
              <RHFTextField name="transportName" label="Transport Name" />
              <RHFTextField name="address" label="Address" />
              <RHFTextField name="place" label="Place" />
              <RHFTextField name="pinNo" label="Pin No" />
              <RHFTextField name="cellNo" label="Cell No" />
              <RHFTextField name="bankCd" label="Bank Code" />
              <RHFTextField name="ifscCode" label="IFSC Code" />
              <RHFTextField name="accNo" label="Account No" />
              <RHFTextField name="paymentMode" label="Payment Mode" />
              <RHFTextField name="panNo" label="PAN No" />
              <RHFTextField name="ownerName" label="Owner Name" />
              <RHFTextField name="gstNo" label="GST No" />
              <RHFTextField name="bankBranch" label="Bank Branch" />
              <RHFTextField name="emailId" label="Email ID" />
              <RHFTextField
                name="phoneNo"
                label="Phone No"
                InputProps={{
                  startAdornment: <InputAdornment position="start">+91 - </InputAdornment>,
                }}
              />
              <RHFSelect native name="transportType" label="Transport Type">
                <option value="" />
                {transportType.map(({ key, value }) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </RHFSelect>
              <RHFTextField name="agreementNo" label="Agreement No" />
              <RHFTextField
                name="tdsPercentage"
                label="TDS Percentage"
                type="number"
                InputProps={{
                  endAdornment: <InputAdornment position="end">%</InputAdornment>,
                }}
              />
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!isEdit ? 'Create Transporter' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
