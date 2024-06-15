import PropTypes from 'prop-types';
import { Box, Stack, Button, TextField, Tooltip, IconButton, InputAdornment } from '@mui/material';
import Iconify from '../../../components/iconify/Iconify';

SubtripTableToolbar.propTypes = {
  filterCustomerId: PropTypes.string,
  filterId: PropTypes.string,
  onFilterCustomerId: PropTypes.func,
  onFilterId: PropTypes.func,
  isFiltered: PropTypes.bool,
  onResetFilter: PropTypes.func,
};

export default function SubtripTableToolbar({
  filterCustomerId,
  filterId,
  onFilterCustomerId,
  onFilterId,
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
          label="Customer ID"
          value={filterCustomerId}
          onChange={onFilterCustomerId}
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
          label="Subtrip ID"
          value={filterId}
          onChange={onFilterId}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon="eva:search-fill" />
              </InputAdornment>
            ),
          }}
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
