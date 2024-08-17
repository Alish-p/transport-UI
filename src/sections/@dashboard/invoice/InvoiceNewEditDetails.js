import sum from 'lodash/sum';
import { useCallback, useEffect } from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
// @mui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { inputBaseClasses } from '@mui/material/InputBase';
import InputAdornment from '@mui/material/InputAdornment';
// utils
// components
import Iconify from '../../../components/iconify';
import { RHFTextField, RHFSelect } from '../../../components/hook-form';
import { fCurrency } from '../../../utils/formatNumber';

// ----------------------------------------------------------------------

export default function InvoiceNewEditDetails() {
  const { control, setValue, watch, resetField } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'subtrips',
  });

  const values = watch();

  const totalOnRow = values.subtrips.map((item) => item.quantity * item.rate);
  const totalAmount = sum(totalOnRow);

  useEffect(() => {
    setValue('totalAmount', totalAmount);
  }, [setValue, totalAmount]);

  const handleAdd = () => {
    append({
      unloadingPoint: '',
      consignee: '',
      vehicleNo: '',
      _id: '',
      date: '',
      quantity: 0,
      rate: 0,
      total: 0,
    });
  };

  const handleRemove = (index) => {
    remove(index);
  };

  const handleChangeQuantity = useCallback(
    (event, index) => {
      setValue(`subtrips[${index}].quantity`, Number(event.target.value));
      setValue(
        `subtrips[${index}].total`,
        values.subtrips.map((item) => item.quantity * item.rate)[index]
      );
    },
    [setValue, values.subtrips]
  );

  const handleChangeRate = useCallback(
    (event, index) => {
      setValue(`subtrips[${index}].rate`, Number(event.target.value));
      setValue(
        `subtrips[${index}].total`,
        values.subtrips.map((item) => item.quantity * item.rate)[index]
      );
    },
    [setValue, values.subtrips]
  );

  const renderTotal = (
    <Stack
      spacing={2}
      alignItems="flex-end"
      sx={{ mt: 3, textAlign: 'right', typography: 'body2' }}
    >
      <Stack direction="row">
        <Box sx={{ color: 'text.secondary' }}>Total Amount</Box>
        <Box sx={{ width: 160, typography: 'subtitle2' }}>{fCurrency(totalAmount) || '-'}</Box>
      </Stack>
    </Stack>
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ color: 'text.disabled', mb: 3 }}>
        Subtrip Details:
      </Typography>

      <Stack divider={<Divider flexItem sx={{ borderStyle: 'dashed' }} />} spacing={3}>
        {fields.map((item, index) => (
          <Stack key={item.id} alignItems="flex-end" spacing={1.5}>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ width: 1 }}>
              <RHFTextField
                size="small"
                name={`subtrips[${index}].unloadingPoint`}
                label="Unloading Point"
                InputLabelProps={{ shrink: true }}
              />

              <RHFTextField
                size="small"
                name={`subtrips[${index}].consignee`}
                label="Consignee"
                InputLabelProps={{ shrink: true }}
              />

              <RHFTextField
                size="small"
                name={`subtrips[${index}].vehicleNo`}
                label="Vehicle No"
                InputLabelProps={{ shrink: true }}
              />

              <RHFTextField
                size="small"
                name={`subtrips[${index}]._id`}
                label="ID"
                InputLabelProps={{ shrink: true }}
              />

              <RHFTextField
                size="small"
                name={`subtrips[${index}].date`}
                label="Date"
                InputLabelProps={{ shrink: true }}
                type="date"
              />

              <RHFTextField
                size="small"
                type="number"
                name={`subtrips[${index}].quantity`}
                label="Quantity"
                placeholder="0"
                onChange={(event) => handleChangeQuantity(event, index)}
                InputLabelProps={{ shrink: true }}
                sx={{ maxWidth: { md: 96 } }}
              />

              <RHFTextField
                size="small"
                type="number"
                name={`subtrips[${index}].rate`}
                label="Rate"
                placeholder="0.00"
                onChange={(event) => handleChangeRate(event, index)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Box sx={{ typography: 'subtitle2', color: 'text.disabled' }}>$</Box>
                    </InputAdornment>
                  ),
                }}
                sx={{ maxWidth: { md: 96 } }}
              />

              <RHFTextField
                disabled
                size="small"
                type="number"
                name={`subtrips[${index}].total`}
                label="Total"
                placeholder="0.00"
                value={
                  values.subtrips[index].total === 0 ? '' : values.subtrips[index].total.toFixed(2)
                }
                onChange={(event) => handleChangeRate(event, index)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Box sx={{ typography: 'subtitle2', color: 'text.disabled' }}>$</Box>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  maxWidth: { md: 104 },
                  [`& .${inputBaseClasses.input}`]: {
                    textAlign: { md: 'right' },
                  },
                }}
              />
            </Stack>

            <Button
              size="small"
              color="error"
              startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
              onClick={() => handleRemove(index)}
            >
              Remove
            </Button>
          </Stack>
        ))}
      </Stack>

      <Button
        size="small"
        color="primary"
        startIcon={<Iconify icon="mingcute:add-line" />}
        onClick={handleAdd}
        sx={{ mt: 3 }}
      >
        Add Subtrip
      </Button>

      {renderTotal}
    </Box>
  );
}
