import * as Yup from 'yup';
import { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
// @mui
import { Box, Grid, Card, Stack, Typography, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// auth
import { useAuthContext } from '../../../../auth/useAuthContext';

// components
import FormProvider, {
  RHFSwitch,
  RHFSelect,
  RHFTextField,
  RHFUploadAvatar,
  RHFDatePicker,
} from '../../../../components/hook-form';
// assets
import {
  engineType,
  modelType,
  transportCompany,
  vehicleCompany,
  vehicleTypes,
} from '../../../../assets/data';
// utils
import { useSnackbar } from '../../../../components/snackbar';

import ConfirmDialog from '../../../../components/confirm-dialog';
import { _vehicleList } from '../../../../_mock/arrays';

import { EcommerceBestSalesman } from '../../general/e-commerce';
import VehicleListPage from './VehicleTable';
import VehicleGeneral from '../../vehicle/Vehicle';

// ----------------------------------------------------------------------

const formFields = [
  { name: 'vehicleNo', label: 'Vehicle No', type: 'text' },
  { name: 'vehicleType', label: 'Vehicle Type', type: 'select', options: vehicleTypes },
  {
    name: 'modelType',
    label: 'Model Type',
    type: 'select',
    options: modelType,
  },
  { name: 'vehicleCompany', label: 'Vehicle Company', type: 'select', options: vehicleCompany },
  { name: 'noOfTyres', label: 'No Of Tyres', type: 'number' },
  { name: 'chasisNo', label: 'Chasis No', type: 'text' },
  { name: 'engineNo', label: 'Engine No', type: 'text' },
  { name: 'manufacturingYear', label: 'Manufacturing Year', type: 'number' },
  { name: 'loadingCapacity', label: 'Loading Capacity', type: 'number' },
  { name: 'engineType', label: 'Engine Type', type: 'select', options: engineType },
  { name: 'fuelTankCapacity', label: 'Fuel Tank Capacity', type: 'number' },
  { name: 'fromDate', label: 'From Date', type: 'date' },
  { name: 'toDate', label: 'To Date', type: 'date' },
  {
    name: 'transportCompany',
    label: 'Transport Company',
    type: 'select',
    options: transportCompany,
  },
];

export default function VehicleGeneral1() {
  // const { enqueueSnackbar } = useSnackbar();
  // const { user, vehicle } = useAuthContext();
  // const [showDialog, setShowDialog] = useState(false);

  // const schema = Yup.object().shape(
  //   formFields.reduce((acc, field) => {
  //     acc[field.name] =
  //       field.type === 'number'
  //         ? Yup.number().required(`${field.name} is required`).integer().positive()
  //         : Yup.string().required(`${field.name} is required`);
  //     return acc;
  //   }, {})
  // );

  // const defaultValues = formFields.reduce((acc, field) => {
  //   acc[field.name] = vehicle?.[field.name] || (field.type === 'number' ? 0 : '');
  //   return acc;
  // }, {});

  // const methods = useForm({
  //   resolver: yupResolver(schema),
  //   defaultValues,
  // });

  // const {
  //   setValue,
  //   handleSubmit,
  //   reset,
  //   formState: { isSubmitting },
  // } = methods;

  // const onSubmit = async (data) => {
  //   try {
  //     await new Promise((resolve) => setTimeout(resolve, 500));
  //     enqueueSnackbar('Update success!');
  //     console.log('DATA', data);
  //     handleReset();
  //     setShowDialog(false);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const handleReset = () => {
  //   reset(defaultValues);
  // };

  return (
    <>
      <VehicleGeneral />
      {/* <Button
        onClick={() => setShowDialog(true)}
        variant="contained"
        color="primary"
        sx={{ mb: 2 }}
      >
        Add Vehicle
      </Button>

      <ConfirmDialog
        open={showDialog}
        onClose={() => setShowDialog(false)}
        title="Add Vehicle"
        content={
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(4, 1fr)',
              }}
            >
              {formFields.map((field) => (
                <FormField
                  key={field.name}
                  name={field.name}
                  label={field.label}
                  type={field.type}
                  options={field.options}
                />
              ))}
            </Box>
          </FormProvider>
        }
        action={
          <Stack direction="row" spacing={1}>
            <LoadingButton
              type="button"
              onClick={handleReset}
              variant="outlined"
              color="secondary"
              loading={isSubmitting}
            >
              Reset
            </LoadingButton>
            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
              Save Changes
            </LoadingButton>
          </Stack>
        }
      />

      <Grid>
        <VehicleListPage tableHead={formFields.map(({ name, label }) => ({ id: name, label }))} />
      </Grid> */}
    </>
  );
}

function FormField({ name, type, options, label }) {
  switch (type) {
    case 'select':
      return (
        <RHFSelect native name={name} label={label} placeholder={name}>
          <option value="" />
          {options.map(({ key, value }) => (
            <option key={key} value={key}>
              {value}
            </option>
          ))}
        </RHFSelect>
      );
    case 'date':
      return <RHFDatePicker name={name} label={label} />;
    default:
      return <RHFTextField name={name} label={label} type={type} />;
  }
}
FormField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['text', 'select', 'number', 'date']).isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ),
};
