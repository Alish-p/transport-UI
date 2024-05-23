import PropTypes from 'prop-types';
import { Stack, Button, TextField, InputAdornment } from '@mui/material';
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

BankTableToolbar.propTypes = {
  isFiltered: PropTypes.bool,
  filterBankBranch: PropTypes.string,
  filterIfscCode: PropTypes.string,
  onFilterBankBranch: PropTypes.func,
  onFilterIfscCode: PropTypes.func,
  onResetFilter: PropTypes.func,
};

export default function BankTableToolbar({
  isFiltered,
  filterBankBranch,
  filterIfscCode,
  onFilterBankBranch,
  onFilterIfscCode,
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
        value={filterBankBranch}
        onChange={onFilterBankBranch}
        placeholder="Search Bank Branch"
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
        value={filterIfscCode}
        onChange={onFilterIfscCode}
        placeholder="Search IFSC Code"
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
