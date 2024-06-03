import PropTypes from 'prop-types';
import { Stack, Button, TextField, InputAdornment } from '@mui/material';
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

ExpenseTableToolbar.propTypes = {
  isFiltered: PropTypes.bool,
  filterExpenseType: PropTypes.string,
  filterDate: PropTypes.string,
  filterAmount: PropTypes.string,
  onFilterExpenseType: PropTypes.func,
  onFilterDate: PropTypes.func,
  onFilterAmount: PropTypes.func,
  onResetFilter: PropTypes.func,
};

export default function ExpenseTableToolbar({
  isFiltered,
  filterExpenseType,
  filterDate,
  filterAmount,
  onFilterExpenseType,
  onFilterDate,
  onFilterAmount,
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
        value={filterExpenseType}
        onChange={onFilterExpenseType}
        placeholder="Search Expense Type"
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
        value={filterDate}
        onChange={onFilterDate}
        placeholder="Search Date"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Iconify icon="eva:calendar-outline" sx={{ color: 'text.disabled' }} />
            </InputAdornment>
          ),
        }}
      />

      <TextField
        fullWidth
        value={filterAmount}
        onChange={onFilterAmount}
        placeholder="Search Amount"
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
