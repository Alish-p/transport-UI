import PropTypes from 'prop-types';
import { Stack, Button, TextField, InputAdornment } from '@mui/material';
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

TransporterTableToolbar.propTypes = {
  isFiltered: PropTypes.bool,
  filterTransportName: PropTypes.string,
  filterAddress: PropTypes.string,
  filterPlace: PropTypes.string,
  onFilterTransportName: PropTypes.func,
  onFilterAddress: PropTypes.func,
  onFilterPlace: PropTypes.func,
  onResetFilter: PropTypes.func,
};

export default function TransporterTableToolbar({
  isFiltered,
  filterTransportName,
  filterAddress,
  filterPlace,
  onFilterTransportName,
  onFilterAddress,
  onFilterPlace,
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
        value={filterTransportName}
        onChange={onFilterTransportName}
        placeholder="Search Transport Name"
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
        value={filterAddress}
        onChange={onFilterAddress}
        placeholder="Search Address"
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
        value={filterPlace}
        onChange={onFilterPlace}
        placeholder="Search Place"
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
