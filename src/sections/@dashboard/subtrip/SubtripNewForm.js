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
} from '../vehicle/VehicleTableConfig';
// components
import { useSnackbar } from '../../../components/snackbar';
import FormProvider, {
  RHFEditor,
  RHFSelect,
  RHFTextField,
  RHFUpload,
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
      fromDate: currentVehicle?.fromDate || new Date(),
      toDate: currentVehicle?.toDate || new Date(),
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
      <Grid container spacing={3} sx={{ pt: 10 }}>
        <Grid item xs={12} md={3}>
          <Box sx={{ pt: 2, pb: 5, px: 3 }}>
            <Typography variant="h6" sx={{ color: 'text.primary' }}>
              Vehicle & Driver
            </Typography>
            <Typography variant="subtitle1" sx={{ color: 'text.secondary', mt: 1 }}>
              Please Select the Vehicle and the Driver for the trip.
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(1, 1fr)',
              }}
            >
              <RHFTextField name="vehicleNo" label="Vehicle No" />
              <RHFTextField name="vehicleNo" label="Driver No" />
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!isEdit ? 'Assign Driver' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ pt: 10 }}>
        <Grid item xs={12} md={3}>
          <Box sx={{ pt: 2, pb: 5, px: 3 }}>
            <Typography variant="h6" sx={{ color: 'text.primary' }}>
              Trip Details
            </Typography>
            <Typography variant="subtitle1" sx={{ color: 'text.secondary', mt: 1 }}>
              Please Select the details of the Trip.
            </Typography>
          </Box>
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
              <RHFTextField name="vehicleNo" label="Trip No" />
              <RHFDatePickerField name="fromDate" label="Trip Creation Date" type="date" />

              {/* Adjusting gridColumn for RHFEditor */}
              <Box
                sx={{
                  gridColumn: { xs: '1 / -1', sm: 'span 2' },
                }}
              >
                <RHFEditor native name="vehicleType" label="Remarks" />
              </Box>

              <RHFTextField name="totalDetTime" label="Total Detention Time" type="number" />

              <RHFSelect native name="tripType" label="Trip Type">
                <option value="" />
                {engineType.map(({ key, value }) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </RHFSelect>
              <RHFSelect native name="tripStatus" label="Trip Status">
                <option value="" />
                {transporters.map((transporter) => (
                  <option key={transporter._id} value={transporter._id}>
                    {transporter.transportName}
                  </option>
                ))}
              </RHFSelect>
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!isEdit ? 'Create Trip' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ pt: 10 }}>
        <Grid item xs={12} md={3}>
          <Box sx={{ pt: 2, pb: 5, px: 3 }}>
            <Typography variant="h6" sx={{ color: 'text.primary' }}>
              Expense Details
            </Typography>
            <Typography variant="subtitle1" sx={{ color: 'text.secondary', mt: 1 }}>
              Please Select the details of the Trip.
            </Typography>
          </Box>
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
              <RHFTextField name="subtripNo" label="Subtrip No" />
              <RHFSelect native name="routeCd" label="Route Code">
                <option value="" />
                <option value="Pending">Mudhol - Pune</option>
                <option value="Pending">Pune - Ahmedabad</option>
              </RHFSelect>
              <RHFTextField name="customerId" label="Customer ID" />
              <RHFTextField name="loadingPoint" label="Loading Point" />
              <RHFTextField name="unloadingPoint" label="Unloading Point" />
              <RHFTextField name="loadingWeight" label="Loading Weight" type="number" />
              <RHFTextField name="rate" label="Rate" type="number" />
              <RHFDatePickerField name="startDate" label="Start Date" type="date" />
              <RHFTextField name="startKm" label="Start Km" type="number" />
              <RHFTextField name="tripPartNo" label="Trip Part No" type="number" />
              <RHFSelect native name="subtripStatus" label="Subtrip Status">
                <option value="billed">Billed</option>
                <option value="Clear">Clear</option>
                <option value="Pending">Pending</option>
                <option value="Received">Received</option>
              </RHFSelect>
              <RHFTextField name="endKm" label="End Km" type="number" />
              <RHFDatePickerField name="endDate" label="End Date" type="date" />
              <RHFTextField name="invoiceNo" label="Invoice No" />
              <RHFTextField name="shipmentNo" label="Shipment No" />
              <RHFTextField name="orderNo" label="Order No" />
              <RHFTextField name="ewayBill" label="E-way Bill" />
              <RHFDatePickerField name="ewayExpiryDate" label="E-way Expiry Date" type="date" />
              <RHFTextField name="materialType" label="Material Type" />
              <RHFTextField name="quantity" label="Quantity" type="number" />
              <RHFTextField name="grade" label="Grade" />
              <RHFTextField name="dieselLtr" label="Diesel Ltr" type="number" />
              <RHFTextField name="detentionTime" label="Detention Time" type="number" />
              <RHFTextField name="unloadingWeight" label="Unloading Weight" type="number" />
              <RHFTextField name="tds" label="TDS" type="number" />
              <RHFTextField name="deductedWeight" label="Deducted Weight" type="number" />
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!isEdit ? 'Create Trip' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
      <Grid container spacing={3} sx={{ pt: 10 }}>
        <Grid item xs={12} md={3}>
          <Box sx={{ pt: 2, pb: 5, px: 3 }}>
            <Typography variant="h6" sx={{ color: 'text.primary' }}>
              LR Details
            </Typography>
            <Typography variant="subtitle1" sx={{ color: 'text.secondary', mt: 1 }}>
              Please Add any advance Expenses
            </Typography>
          </Box>
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
              <RHFDatePickerField name="date" label="Date" type="date" />
              <RHFSelect native name="expenseType" label="Expense Type">
                <option value="" />
                {[
                  'Advance for trip',
                  'Extra Advance for trip',
                  'Diesel',
                  'Toll',
                  'Puncher',
                  'Police',
                  'Rto',
                  'Repair',
                ].map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </RHFSelect>
              <RHFTextField name="installment" label="Installment" type="number" />
              <RHFSelect native name="vehicleNo" label="Vehicle No">
                {['GJ01BH12345', 'GJ02BH12345', 'GJ03BH12345', 'GJ04BH12345'].map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </RHFSelect>
              <RHFTextField name="amount" label="Amount" type="number" />
              <RHFTextField name="slipNo" label="Slip No" />
              <RHFTextField name="pumpCd" label="Pump Code" />
              <RHFTextField name="remarks" label="Remarks" />
              <RHFTextField name="dieselLtr" label="Diesel Liters" type="number" />
              <RHFTextField name="paidThrough" label="Paid Through" />
              <RHFTextField name="authorisedBy" label="Authorised By" />
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!isEdit ? 'Create Trip' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
