import * as Yup from 'yup';
import PropTypes from 'prop-types';
// @mui
import { Box, Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// auth

// components
import FormProvider, {
  RHFSelect,
  RHFTextField,
  RHFDatePicker,
} from '../../../../components/hook-form';
import ConfirmDialog from '../../../../components/confirm-dialog';
import { useSnackbar } from '../../../../components/snackbar';

import {
  vehicleTypes,
  modelType,
  engineType,
  transportCompany,
  vehicleCompany,
} from '../../../../assets/data';
import { vehicleConfig } from './VehicleSchema';

// ----------------------------------------------------------------------

export function VehicleDialog({ showDialog, setShowDialog }) {
  const { enqueueSnackbar } = useSnackbar();

  const defaultValues = vehicleConfig.reduce((acc, field) => {
    acc[field.name] = field.type === 'number' ? 0 : '';
    return acc;
  }, {});

  const methods = useForm({
    resolver: yupResolver(getValidationSchema()),
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
      await new Promise((resolve) => setTimeout(resolve, 500));
      enqueueSnackbar('Update success!');
      console.log('DATA', data);
      handleReset();
      setShowDialog(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ConfirmDialog
      open={showDialog}
      onClose={() => setShowDialog(false)}
      title="Add Vehicle"
      content={
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
          <LoadingButton
            type="submit"
            variant="contained"
            loading={isSubmitting}
            onClick={handleSubmit(onSubmit)}
          >
            Save Changes
          </LoadingButton>
        </Stack>
      }
    />
  );
}

VehicleDialog.propTypes = {
  showDialog: PropTypes.bool.isRequired,
  setShowDialog: PropTypes.func.isRequired,
};

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

function getValidationSchema() {
  const schema = Yup.object().shape(
    vehicleConfig.reduce((acc, field) => {
      acc[field.name] =
        field.type === 'number'
          ? Yup.number().required(`${field.label} is required`).integer().positive()
          : Yup.string().required(`${field.label} is required`);
      return acc;
    }, {})
  );
  return schema;
}
