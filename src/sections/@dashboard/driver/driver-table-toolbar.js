import { useCallback } from 'react';
// @mui
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
// components

import CustomPopover, { usePopover } from '../../../components/custom-popover';
import Iconify from '../../../components/iconify/Iconify';
import { exportToExcel } from '../../../utils/ExportToExcel';

// ----------------------------------------------------------------------

export default function DriverTableToolbar({ filters, onFilters, tableData }) {
  const popover = usePopover();

  const handleFilterDriverName = useCallback(
    (event) => {
      onFilters('driverName', event.target.value);
    },
    [onFilters]
  );

  const handleFilterCellNo = useCallback(
    (event) => {
      onFilters('driverCellNo', event.target.value);
    },
    [onFilters]
  );

  const handleFilterLicenseNo = useCallback(
    (event) => {
      onFilters('driverLicenceNo', event.target.value);
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
          value={filters.driverName}
          onChange={handleFilterDriverName}
          placeholder="Search driver name..."
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
          value={filters.driverCellNo}
          onChange={handleFilterCellNo}
          placeholder="Search mobile number..."
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
          value={filters.driverLicenceNo}
          onChange={handleFilterLicenseNo}
          placeholder="Search license number..."
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
            exportToExcel(tableData, 'Drivers-list');
          }}
        >
          <Iconify icon="solar:export-bold" />
          Export
        </MenuItem>
      </CustomPopover>
    </>
  );
}
