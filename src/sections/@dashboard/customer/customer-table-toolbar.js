/* eslint-disable react/prop-types */
import { useCallback } from 'react';
// @mui
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
// components

import CustomPopover, { usePopover } from '../../../components/custom-popover';
import Iconify from '../../../components/iconify/Iconify';
import { exportToExcel } from '../../../utils/ExportToExcel';

// ----------------------------------------------------------------------

export default function CustomerTableToolbar({ filters, onFilters, tableData }) {
  const popover = usePopover();

  const handleFilterCustomerName = useCallback(
    (event) => {
      onFilters('customerName', event.target.value);
    },
    [onFilters]
  );

  const handleFilterGSTNo = useCallback(
    (event) => {
      onFilters('GSTNo', event.target.value);
    },
    [onFilters]
  );

  const handleFilterPANNo = useCallback(
    (event) => {
      onFilters('PANNo', event.target.value);
    },
    [onFilters]
  );

  return (
    <>
      <Stack
        spacing={2}
        alignItems={{ xs: 'flex-end', md: 'center' }}
        direction={{
          xs: 'column',
          md: 'row',
        }}
        sx={{
          p: 2.5,
          pr: { xs: 2.5, md: 1 },
        }}
      >
        <TextField
          fullWidth
          value={filters.customerName}
          onChange={handleFilterCustomerName}
          placeholder="Search Customer Name..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          fullWidth
          value={filters.GSTNo}
          onChange={handleFilterGSTNo}
          placeholder="Search GST No..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          fullWidth
          value={filters.PANNo}
          onChange={handleFilterPANNo}
          placeholder="Search PAN No..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
              </InputAdornment>
            ),
          }}
        />

        <IconButton onClick={popover.onOpen}>
          <Iconify icon="eva:more-vertical-fill" />
        </IconButton>
      </Stack>

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 140 }}
      >
        <MenuItem
          onClick={() => {
            popover.onClose();
          }}
        >
          <Iconify icon="solar:printer-minimalistic-bold" />
          Print
        </MenuItem>

        <MenuItem
          onClick={() => {
            popover.onClose();
          }}
        >
          <Iconify icon="solar:import-bold" />
          Import
        </MenuItem>

        <MenuItem
          onClick={() => {
            popover.onClose();
            exportToExcel(tableData, 'Customers-list');
          }}
        >
          <Iconify icon="solar:export-bold" />
          Export
        </MenuItem>
      </CustomPopover>
    </>
  );
}
