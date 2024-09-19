import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useCallback, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, InputAdornment, Stack, Typography, Button, Divider } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import { useSnackbar } from '../../../components/snackbar';
import { Form, Field } from '../../../components/hook-form';
// redux
import { dispatch } from '../../../redux/store';
import { addCustomer, updateCustomer } from '../../../redux/slices/customer';
import Iconify from '../../../components/iconify/Iconify';

// ----------------------------------------------------------------------

CustomerNewForm.propTypes = {
  isEdit: PropTypes.bool,
  currentCustomer: PropTypes.object,
};

export default function CustomerNewForm({ isEdit = false, currentCustomer }) {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const NewCustomerSchema = Yup.object().shape({
    customerName: Yup.string().required('Customer Name is required'),
    address: Yup.string().required('Address is required'),
    place: Yup.string().required('Place is required'),
    state: Yup.string().required('State is required'),
    pinCode: Yup.number()
      .required('Pin Code is required')
      .typeError('Pin Code must be a number')
      .test(
        'len',
        'Pin Code must be exactly 6 digits',
        (val) => val && val.toString().length === 6
      ),
    cellNo: Yup.number()
      .required('Cell No is required')
      .typeError('Cell No must be a number')
      .test(
        'len',
        'Cell No must be exactly 10 digits',
        (val) => val && val.toString().length === 10
      ),
    GSTNo: Yup.string().required('GST No is required'),
    PANNo: Yup.string()
      .required('PAN No is required')
      .matches(
        /[A-Z]{5}[0-9]{4}[A-Z]{1}/,
        'PAN No must be in the format: five letters followed by four digits and one letter'
      ),
    consignees: Yup.array().of(
      Yup.object().shape({
        name: Yup.string().required('Name is required'),
        address: Yup.string().required('Address is required'),
        state: Yup.string().required('State is required'),
        pinCode: Yup.number()
          .required('Pin Code is required')
          .typeError('Pin Code must be a number')
          .test(
            'len',
            'Pin Code must be exactly 6 digits',
            (val) => val && val.toString().length === 6
          ),
      })
    ),
  });

  const defaultValues = useMemo(
    () => ({
      customerName: currentCustomer?.customerName || '',
      address: currentCustomer?.address || '',
      place: currentCustomer?.place || '',
      state: currentCustomer?.state || '',
      pinCode: currentCustomer?.pinCode || '',
      cellNo: currentCustomer?.cellNo || '',
      GSTNo: currentCustomer?.GSTNo || '',
      PANNo: currentCustomer?.PANNo || '',
      consignees: currentCustomer?.consignees || [
        { name: '', address: '', state: '', pinCode: '' },
      ],
    }),
    [currentCustomer]
  );

  const methods = useForm({
    resolver: yupResolver(NewCustomerSchema),
    defaultValues,
  });

  const {
    reset,
    control,
    watch,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'consignees',
  });

  const values = watch();

  useEffect(() => {
    if (isEdit && currentCustomer) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
  }, [isEdit, currentCustomer, reset, defaultValues]);

  const onSubmit = async (data) => {
    try {
      if (!isEdit) {
        await dispatch(addCustomer(data));
      } else {
        await dispatch(updateCustomer(currentCustomer._id, data));
      }
      reset();
      enqueueSnackbar(!isEdit ? 'Customer added successfully!' : 'Customer edited successfully!');
      navigate(PATH_DASHBOARD.customer.list);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddConsignee = () => {
    append({ name: '', address: '', state: '', pinCode: '' });
  };

  const handleRemoveConsignee = (index) => {
    remove(index);
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
              <Field.Text name="customerName" label="Customer Name" />
              <Field.Text name="address" label="Address" />
              <Field.Text name="place" label="Place" />
              <Field.Text name="state" label="State" />
              <Field.Text name="pinCode" label="Pin Code" />
              <Field.Text name="cellNo" label="Cell No" />
              <Field.Text name="GSTNo" label="GST No" />
              <Field.Text name="PANNo" label="PAN No" />
            </Box>

            <Typography variant="h6" sx={{ color: 'text.disabled', mt: 3 }}>
              Consignees:
            </Typography>

            {fields.map((field, index) => (
              <Stack key={field.id} spacing={2} sx={{ mt: 2 }}>
                <Box
                  rowGap={3}
                  columnGap={2}
                  display="grid"
                  gridTemplateColumns={{
                    xs: 'repeat(2, 1fr)',
                    sm: 'repeat(9, 1fr)',
                  }}
                >
                  <Box gridColumn="span 2">
                    <Field.Text name={`consignees[${index}].name`} label="Consignee Name" />
                  </Box>
                  <Box gridColumn="span 2">
                    <Field.Text name={`consignees[${index}].address`} label="Consignee Address" />
                  </Box>
                  <Box gridColumn="span 2">
                    <Field.Text name={`consignees[${index}].state`} label="Consignee State" />
                  </Box>
                  <Box gridColumn="span 2">
                    <Field.Text name={`consignees[${index}].pinCode`} label="Consignee Pin Code" />
                  </Box>
                  <Box
                    gridColumn="span 1"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Button
                      size="small"
                      color="error"
                      startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
                      onClick={() => handleRemoveConsignee(index)}
                    >
                      Remove
                    </Button>
                  </Box>
                </Box>
              </Stack>
            ))}

            <Button
              size="small"
              color="primary"
              startIcon={<Iconify icon="mingcute:add-line" />}
              onClick={handleAddConsignee}
              sx={{ mt: 3 }}
            >
              Add Consignee
            </Button>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!isEdit ? 'Create Customer' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Form>
  );
}
