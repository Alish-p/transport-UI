import PropTypes from 'prop-types';
import { Stack, Button, TextField, InputAdornment } from '@mui/material';
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

PumpTableToolbar.propTypes = {
  isFiltered: PropTypes.bool,
  filterPumpName: PropTypes.string,
  filterPlaceName: PropTypes.string,
  onFilterPumpName: PropTypes.func,
  onFilterPlaceName: PropTypes.func,
  onResetFilter: PropTypes.func,
};

export default function PumpTableToolbar({
  isFiltered,
  filterPumpName,
  filterPlaceName,
  onFilterPumpName,
  onFilterPlaceName,
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
        value={filterPumpName}
        onChange={onFilterPumpName}
        placeholder="Search Pump Name"
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
        value={filterPlaceName}
        onChange={onFilterPlaceName}
        placeholder="Search Place Name"
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
