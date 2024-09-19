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
import { Form, Field } from '../../../components/hook-form';
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
    pinNo: Yup.number()
      .required('Pin No is required')
      .typeError('Pin No must be a number')
      .test('len', 'Pin No must be exactly 6 digits', (val) => val && val.toString().length === 6),
    cellNo: Yup.number()
      .required('Cell No is required')
      .typeError('Cell No must be a number')
      .test(
        'len',
        'Cell No must be exactly 10 digits',
        (val) => val && val.toString().length === 10
      ),
    bankCd: Yup.string().required('Bank Code is required'),
    ifscCode: Yup.string().required('IFSC Code is required'),
    accNo: Yup.string().required('Account No is required'),
    paymentMode: Yup.string().required('Payment Mode is required'),
    panNo: Yup.string()
      .required('PAN No is required')
      .matches(
        /[A-Z]{5}[0-9]{4}[A-Z]{1}/,
        'PAN No must be in the format: five letters followed by four digits and one letter'
      ),
    ownerName: Yup.string().required('Owner Name is required'),
    gstNo: Yup.string().required('GST No is required'),
    bankBranch: Yup.string().required('Bank Branch is required'),
    emailId: Yup.string().required('Email ID is required').email('Email ID must be a valid email'),
    phoneNo: Yup.number()
      .required('Phone No is required')
      .typeError('Phone No must be a number')
      .test(
        'len',
        'Phone No must be exactly 10 digits',
        (val) => val && val.toString().length === 10
      ),
    transportType: Yup.string().required('Transport Type is required'),
    agreementNo: Yup.string().required('Agreement No is required'),
    tdsPercentage: Yup.number()
      .required('TDS Percentage is required')
      .min(0, 'TDS Percentage must be at least 0')
      .max(100, 'TDS Percentage must be at most 100'),
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
    <Form methods={methods} onSubmit={handleSubmit(onSubmit)}>
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
              <Field.Text name="transportName" label="Transport Name" />
              <Field.Text name="address" label="Address" />
              <Field.Text name="place" label="Place" />
              <Field.Text name="pinNo" label="Pin No" />
              <Field.Text name="cellNo" label="Cell No" />
              <Field.Text name="bankCd" label="Bank Code" />
              <Field.Text name="ifscCode" label="IFSC Code" />
              <Field.Text name="accNo" label="Account No" />
              <Field.Text name="paymentMode" label="Payment Mode" />
              <Field.Text name="panNo" label="PAN No" />
              <Field.Text name="ownerName" label="Owner Name" />
              <Field.Text name="gstNo" label="GST No" />
              <Field.Text name="bankBranch" label="Bank Branch" />
              <Field.Text name="emailId" label="Email ID" />
              <Field.Text
                name="phoneNo"
                label="Phone No"
                InputProps={{
                  startAdornment: <InputAdornment position="start">+91 - </InputAdornment>,
                }}
              />
              <Field.Select native name="transportType" label="Transport Type">
                <option value="" />
                {transportType.map(({ key, value }) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </Field.Select>
              <Field.Text name="agreementNo" label="Agreement No" />
              <Field.Text
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
    </Form>
  );
}
