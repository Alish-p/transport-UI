import PropTypes from 'prop-types';
import { Stack, Button, TextField, InputAdornment } from '@mui/material';
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

DriverTableToolbar.propTypes = {
  isFiltered: PropTypes.bool,
  filterDriverName: PropTypes.string,
  filterLicenseNo: PropTypes.string,
  onFilterDriverName: PropTypes.func,
  onFilterLicenseNo: PropTypes.func,
  onResetFilter: PropTypes.func,
};

export default function DriverTableToolbar({
  isFiltered,
  filterDriverName,
  filterLicenseNo,
  onFilterDriverName,
  onFilterLicenseNo,
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
        value={filterDriverName}
        onChange={onFilterDriverName}
        placeholder="Search Driver Name"
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
        value={filterLicenseNo}
        onChange={onFilterLicenseNo}
        placeholder="Search License No"
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
