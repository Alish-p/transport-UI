import PropTypes from 'prop-types';
import { Stack, Button, TextField, InputAdornment } from '@mui/material';
import Iconify from '../../../components/iconify';

RouteTableToolbar.propTypes = {
  isFiltered: PropTypes.bool,
  filterRouteName: PropTypes.string,
  filterFromPlace: PropTypes.string,
  filterToPlace: PropTypes.string,
  onFilterRouteName: PropTypes.func,
  onFilterFromPlace: PropTypes.func,
  onFilterToPlace: PropTypes.func,
  onResetFilter: PropTypes.func,
};

export default function RouteTableToolbar({
  isFiltered,
  filterRouteName,
  filterFromPlace,
  filterToPlace,
  onFilterRouteName,
  onFilterFromPlace,
  onFilterToPlace,
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
        value={filterRouteName}
        onChange={onFilterRouteName}
        placeholder="Search Route Name"
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
        value={filterFromPlace}
        onChange={onFilterFromPlace}
        placeholder="Search From Place"
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
        value={filterToPlace}
        onChange={onFilterToPlace}
        placeholder="Search To Place"
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
