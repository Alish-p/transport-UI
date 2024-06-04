import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useCallback, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack, Typography, FormControlLabel } from '@mui/material';
// utils
import { useDispatch } from 'react-redux';
import { fData } from '../../../utils/formatNumber';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// assets
import {
  engineType,
  modelType,
  transportCompany,
  vehicleCompany,
  vehicleTypes,
} from './VehicleTableConfig';
// components
import Label from '../../../components/label';
import { useSnackbar } from '../../../components/snackbar';
import FormProvider, {
  RHFSelect,
  RHFTextField,
  RHFUpload,
  RHFUploadAvatar,
} from '../../../components/hook-form';
import RHFDatePickerField from '../../../components/hook-form/RHFDatePicker';
import { addVehicle, updateVehicle } from '../../../redux/slices/vehicle';
import { fetchTransporters } from '../../../redux/slices/transporter';
import { useSelector } from '../../../redux/store';

// ----------------------------------------------------------------------

VehicleForm.propTypes = {
  isEdit: PropTypes.bool,
  currentVehicle: PropTypes.object,
};

export default function VehicleForm({ isEdit = false, currentVehicle }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const NewVehicleSchema = Yup.object().shape({
    vehicleNo: Yup.string().required('Vehicle No is required'),
    images: Yup.mixed().nullable(true),
    vehicleType: Yup.string().required('Vehicle Type is required'),
    modelType: Yup.string().required('Model Type is required'),
    vehicleCompany: Yup.string().required('Vehicle Company is required'),
    noOfTyres: Yup.number().required('No Of Tyres is required').min(1),
    chasisNo: Yup.string().required('Chasis No is required'),
    engineNo: Yup.string().required('Engine No is required'),
    manufacturingYear: Yup.number().required('Manufacturing Year is required').min(1900),
    loadingCapacity: Yup.number().required('Loading Capacity is required').min(1),
    engineType: Yup.string().required('Engine Type is required'),
    fuelTankCapacity: Yup.number().required('Fuel Tank Capacity is required').min(1),
    fromDate: Yup.date().required('From Date is required'),
    toDate: Yup.date().required('To Date is required'),
    transporter: Yup.string().required('Transport Company is required'),
  });

  const defaultValues = useMemo(
    () => ({
      vehicleNo: currentVehicle?.vehicleNo || '',
      images: currentVehicle?.images || null,
      vehicleType: currentVehicle?.vehicleType || '',
      modelType: currentVehicle?.modelType || '',
      vehicleCompany: currentVehicle?.vehicleCompany || '',
      noOfTyres: currentVehicle?.noOfTyres || 0,
      chasisNo: currentVehicle?.chasisNo || '',
      engineNo: currentVehicle?.engineNo || '',
      manufacturingYear: currentVehicle?.manufacturingYear || new Date().getFullYear(),
      loadingCapacity: currentVehicle?.loadingCapacity || 0,
      engineType: currentVehicle?.engineType || '',
      fuelTankCapacity: currentVehicle?.fuelTankCapacity || 0,
      fromDate: currentVehicle?.fromDate ? new Date(currentVehicle?.fromDate) : new Date(),
      toDate: currentVehicle?.toDate ? new Date(currentVehicle?.toDate) : new Date(),
      transporter: currentVehicle?.transporter?._id || '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentVehicle]
  );

  console.log({ defaultValues });

  useEffect(() => {
    dispatch(fetchTransporters());
  }, [dispatch]);

  const { transporters } = useSelector((state) => state.transporter);

  const methods = useForm({
    resolver: yupResolver(NewVehicleSchema),
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
    if (isEdit && currentVehicle) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentVehicle]);

  const onSubmit = async (data) => {
    try {
      if (!isEdit) {
        await dispatch(addVehicle(data));
      } else {
        await dispatch(updateVehicle(currentVehicle._id, data));
      }
      reset();
      enqueueSnackbar(!isEdit ? 'Vehicle added successfully!' : 'Vehicle edited successfully!');
      navigate(PATH_DASHBOARD.vehicle.list);
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
        <Grid item xs={12} md={4}>
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

        <Grid item xs={12} md={8}>
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
              <RHFTextField name="vehicleNo" label="Vehicle No" />
              <RHFSelect native name="vehicleType" label="Vehicle Type">
                <option value="" />
                {vehicleTypes.map(({ key, value }) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </RHFSelect>
              <RHFSelect native name="modelType" label="Model Type">
                <option value="" />
                {modelType.map(({ key, value }) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </RHFSelect>
              <RHFSelect native name="vehicleCompany" label="Vehicle Company">
                <option value="" />
                {vehicleCompany.map(({ key, value }) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </RHFSelect>
              <RHFTextField name="noOfTyres" label="No Of Tyres" type="number" />
              <RHFTextField name="chasisNo" label="Chasis No" />
              <RHFTextField name="engineNo" label="Engine No" />
              <RHFTextField name="manufacturingYear" label="Manufacturing Year" type="number" />
              <RHFTextField name="loadingCapacity" label="Loading Capacity" type="number" />
              <RHFTextField name="fuelTankCapacity" label="Fuel Tank Capacity" type="number" />

              <RHFSelect native name="engineType" label="Engine Type">
                <option value="" />
                {engineType.map(({ key, value }) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </RHFSelect>
              <RHFSelect native name="transporter" label="Transport Company">
                <option value="" />
                {transporters.map((transporter) => (
                  <option key={transporter._id} value={transporter._id}>
                    {transporter.transportName}
                  </option>
                ))}
              </RHFSelect>
              <RHFDatePickerField name="fromDate" label="From Date" type="date" />
              <RHFDatePickerField name="toDate" label="To Date" type="date" />
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!isEdit ? 'Create Vehicle' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
