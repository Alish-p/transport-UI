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
import FormProvider, {
  RHFTextField,
  RHFSelect,
  RHFDatePicker,
  RHFUpload,
} from '../../../components/hook-form';
// redux
import { dispatch } from '../../../redux/store';
import { addDriver, updateDriver } from '../../../redux/slices/driver';

// ----------------------------------------------------------------------

DriverForm.propTypes = {
  isEdit: PropTypes.bool,
  currentDriver: PropTypes.object,
};

export default function DriverForm({ isEdit = false, currentDriver }) {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const NewDriverSchema = Yup.object().shape({
    driverName: Yup.string().required('Driver Name is required'),
    images: Yup.mixed().nullable(true),
    driverLicenceNo: Yup.string().required('Driver Licence No is required'),
    driverPresentAddress: Yup.string().required('Driver Present Address is required'),
    driverCellNo: Yup.string().required('Driver Cell No is required'),
    licenseFrom: Yup.date().required('License From date is required'),
    licenseTo: Yup.date().required('License To date is required'),
    aadharNo: Yup.string().required('Aadhar No is required'),
    guarantorName: Yup.string().required('Guarantor Name is required'),
    guarantorCellNo: Yup.string().required('Guarantor Cell No is required'),
    experience: Yup.number().required('Experience is required').min(0),
    dob: Yup.date().required('Date of Birth is required'),
    permanentAddress: Yup.string().required('Permanent Address is required'),
    bankCd: Yup.string().required('Bank Code is required'),
    accNo: Yup.string().required('Account No is required'),
  });

  const defaultValues = useMemo(
    () => ({
      driverName: currentDriver?.driverName || '',
      images: currentDriver?.images || null,
      driverLicenceNo: currentDriver?.driverLicenceNo || '',
      driverPresentAddress: currentDriver?.driverPresentAddress || '',
      driverCellNo: currentDriver?.driverCellNo || '',
      licenseFrom: currentDriver?.licenseFrom || '',
      licenseTo: currentDriver?.licenseTo || '',
      aadharNo: currentDriver?.aadharNo || '',
      guarantorName: currentDriver?.guarantorName || '',
      guarantorCellNo: currentDriver?.guarantorCellNo || '',
      experience: currentDriver?.experience || 0,
      dob: currentDriver?.dob || '',
      permanentAddress: currentDriver?.permanentAddress || '',
      bankCd: currentDriver?.bankCd || '',
      accNo: currentDriver?.accNo || '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentDriver]
  );

  const methods = useForm({
    resolver: yupResolver(NewDriverSchema),
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
    if (isEdit && currentDriver) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentDriver]);

  const onSubmit = async (data) => {
    try {
      if (!isEdit) {
        await dispatch(addDriver(data));
      } else {
        await dispatch(updateDriver(currentDriver._id, data));
      }
      reset();
      enqueueSnackbar(!isEdit ? 'Driver added successfully!' : 'Driver edited successfully!');
      navigate(PATH_DASHBOARD.driver.list);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const files = values.images || [];

      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );

      setValue('images', [...files, ...newFiles], { shouldValidate: true });
    },
    [setValue, values.images]
  );
  const handleRemoveFile = (inputFile) => {
    const filtered = values.images && values.images?.filter((file) => file !== inputFile);
    setValue('images', filtered);
  };

  const handleRemoveAllFiles = () => {
    setValue('images', []);
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card sx={{ pt: 10, pb: 5, px: 3 }}>
            {/* {isEdit && (
              <Label
                color={values.status === 'active' ? 'success' : 'error'}
                sx={{ textTransform: 'uppercase', position: 'absolute', top: 24, right: 24 }}
              >
                {values.status}
              </Label>
            )} */}

            <Box sx={{ mb: 5 }}>
              <Stack spacing={1}>
                <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                  Images
                </Typography>

                <RHFUpload
                  multiple
                  thumbnail
                  name="images"
                  maxSize={3145728}
                  onDrop={handleDrop}
                  onRemove={handleRemoveFile}
                  onRemoveAll={handleRemoveAllFiles}
                  onUpload={() => console.log('ON UPLOAD')}
                />
              </Stack>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
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
              <RHFTextField name="driverName" label="Driver Name" />
              <RHFTextField name="driverLicenceNo" label="Driver Licence No" />
              <RHFTextField name="driverPresentAddress" label="Driver Present Address" />
              <RHFTextField
                name="driverCellNo"
                label="Driver Cell No"
                InputProps={{
                  startAdornment: <InputAdornment position="start">+91 - </InputAdornment>,
                }}
              />
              <RHFDatePicker name="licenseFrom" label="License From" />
              <RHFDatePicker name="licenseTo" label="License To" />
              <RHFTextField name="aadharNo" label="Aadhar No" />
              <RHFTextField name="guarantorName" label="Guarantor Name" />
              <RHFTextField
                name="guarantorCellNo"
                label="Guarantor Cell No"
                InputProps={{
                  startAdornment: <InputAdornment position="start">+91 - </InputAdornment>,
                }}
              />
              <RHFTextField
                name="experience"
                label="Experience"
                type="number"
                InputProps={{
                  endAdornment: <InputAdornment position="end">years</InputAdornment>,
                }}
              />
              <RHFDatePicker name="dob" label="Date of Birth" />
              <RHFTextField name="permanentAddress" label="Permanent Address" />
              <RHFTextField name="bankCd" label="Bank Code" />
              <RHFTextField name="accNo" label="Account No" />
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!isEdit ? 'Create Driver' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
