import PropTypes from 'prop-types';
import { Box, Stack, Button, TextField, Tooltip, IconButton, InputAdornment } from '@mui/material';
import Iconify from '../../../components/iconify/Iconify';

TripTableToolbar.propTypes = {
  filterDriverName: PropTypes.string,
  filterDate: PropTypes.string,
  onFilterDriverName: PropTypes.func,
  onFilterDate: PropTypes.func,
  isFiltered: PropTypes.bool,
  onResetFilter: PropTypes.func,
};

export default function TripTableToolbar({
  filterDriverName,
  filterDate,
  onFilterDriverName,
  onFilterDate,
  isFiltered,
  onResetFilter,
}) {
  return (
    <Stack
      spacing={2}
      alignItems="center"
      direction={{
        xs: 'column',
        sm: 'row',
      }}
      sx={{ px: 2.5, py: 3 }}
    >
      <Stack direction="row" spacing={1} flexGrow={1}>
        <TextField
          fullWidth
          label="Driver Name"
          value={filterDriverName}
          onChange={onFilterDriverName}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon="eva:search-fill" />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          fullWidth
          type="date"
          label="From Date"
          value={filterDate}
          onChange={onFilterDate}
          InputLabelProps={{ shrink: true }}
        />
      </Stack>

      {isFiltered && (
        <Tooltip title="Clear">
          <IconButton onClick={onResetFilter}>
            <Iconify icon="eva:trash-2-outline" />
          </IconButton>
        </Tooltip>
      )}
    </Stack>
  );
}
