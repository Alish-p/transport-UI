import PropTypes from 'prop-types';
import { Stack, Button, TextField, InputAdornment } from '@mui/material';
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

VehicleTableToolbar.propTypes = {
  isFiltered: PropTypes.bool,
  filterVehicleNo: PropTypes.string,
  filterVehicleType: PropTypes.string,
  filterTransportCompany: PropTypes.string,
  onFilterVehicleNo: PropTypes.func,
  onFilterVehicleType: PropTypes.func,
  onFilterTransportCompany: PropTypes.func,
  onResetFilter: PropTypes.func,
};

export default function VehicleTableToolbar({
  isFiltered,
  filterVehicleNo,
  filterVehicleType,
  filterTransportCompany,
  onFilterVehicleNo,
  onFilterVehicleType,
  onFilterTransportCompany,
  onResetFilter,
}) {
  return (
    <Stack
      spacing={2}
      alignItems="center"
      direction={{
        xs: 'column',
        md: 'row',
      }}
      sx={{ px: 2.5, py: 3 }}
    >
      <TextField
        fullWidth
        value={filterVehicleNo}
        onChange={onFilterVehicleNo}
        placeholder="Search Vehicle No"
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
        value={filterVehicleType}
        onChange={onFilterVehicleType}
        placeholder="Search Vehicle Type"
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
        value={filterTransportCompany}
        onChange={onFilterTransportCompany}
        placeholder="Search Transport Company"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
            </InputAdornment>
          ),
        }}
      />

      {isFiltered && (
        <Button
          color="error"
          sx={{ flexShrink: 0 }}
          onClick={onResetFilter}
          startIcon={<Iconify icon="eva:trash-2-outline" />}
        >
          Clear
        </Button>
      )}
    </Stack>
  );
}
