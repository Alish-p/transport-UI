import * as Yup from 'yup';
import PropTypes from 'prop-types';
// @mui
import { Box, Stack, Button } from '@mui/material';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useDispatch, useSelector } from '../../../redux/store';

// auth
import { addVehicle } from '../../../redux/slices/vehicle';

// components
import FormProvider, {
  RHFSelect,
  RHFTextField,
  RHFDatePicker,
} from '../../../components/hook-form';
import ConfirmDialog from '../../../components/confirm-dialog';
import { useSnackbar } from '../../../components/snackbar';

import { vehicleConfig } from './VehicleTableConfig';

// const defaultValues = {
//   vehicleNo: 'GJ08BH0566',
//   vehicleType: '4220',
//   modelType: '4220',
//   vehicleCompany: 'ashokLeyland',
//   noOfTyres: 12,
//   chasisNo: '21',
//   engineNo: '21',
//   manufacturingYear: 2121,
//   loadingCapacity: 12,
//   engineType: 'bs5',
//   fuelTankCapacity: 1212,
//   fromDate: new Date('Sun May 12 2024 00:00:00 GMT+0530 (India Standard Time)'),
//   toDate: new Date('Mon May 20 2024 00:00:00 GMT+0530 (India Standard Time)'),
//   transportCompany: 'shreeEnterprice',
// };

// ----------------------------------------------------------------------

export function VehicleDialog({ showDialog, setShowDialog, vehicleData }) {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const getDefaultValues = () =>
    vehicleData ||
    vehicleConfig.reduce((acc, field) => {
      acc[field.name] = field.type === 'number' ? 0 : '';
      return acc;
    }, {});

  const methods = useForm({
    resolver: yupResolver(getValidationSchema()),
    defaultValues: getDefaultValues(),
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  const handleReset = () => {
    reset(getDefaultValues());
  };

  const onSubmit = async (data) => {
    try {
      await dispatch(addVehicle(data));
      enqueueSnackbar('Vehicle added successfully!');
      handleReset();
      setShowDialog(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // Update default values when vehicleData changes
    if (vehicleData) {
      reset(vehicleData);
    }
  }, [vehicleData, reset]);

  return (
    <ConfirmDialog
      open={showDialog}
      onClose={() => setShowDialog(false)}
      title="Add Vehicle"
      content={
        <Box sx={{ marginTop: '6px' }}>
          <FormProvider methods={methods} onSubmit={onSubmit}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(4, 1fr)',
              }}
            >
              {vehicleConfig.map((field) => (
                <FormField
                  key={field.name}
                  name={field.name}
                  label={field.label}
                  type={field.type}
                  options={field.options}
                  validation={field.validation} // Add validation property
                />
              ))}
            </Box>
          </FormProvider>
        </Box>
      }
      action={
        <Stack direction="row" spacing={1}>
          <Button
            type="reset"
            onClick={handleReset}
            variant="outlined"
            // color=""
            loading={isSubmitting}
          >
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

VehicleDialog.propTypes = {
  showDialog: PropTypes.bool.isRequired,
  setShowDialog: PropTypes.func.isRequired,
  vehicleData: PropTypes.object,
};

function FormField({ name, type, options, label, validation }) {
  switch (type) {
    case 'select':
      return (
        <RHFSelect native name={name} label={label} placeholder={name} validation={validation}>
          <option value="" />
          {options.map(({ key, value }) => (
            <option key={key} value={key}>
              {value}
            </option>
          ))}
        </RHFSelect>
      );
    case 'date':
      return <RHFDatePicker name={name} label={label} validation={validation} />;
    default:
      return <RHFTextField name={name} label={label} type={type} validation={validation} />;
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
  validation: PropTypes.object, // Add validation prop type
};

function getValidationSchema() {
  const schema = Yup.object().shape(
    vehicleConfig.reduce((acc, field) => {
      if (field.validation) {
        acc[field.name] = field.validation;
      } else {
        acc[field.name] =
          field.type === 'number'
            ? Yup.number().required(`${field.label} is required`).integer().positive()
            : Yup.string().required(`${field.label} is required`);
      }
      return acc;
    }, {})
  );
  return schema;
}
