import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { TableRow, MenuItem, TableCell, IconButton } from '@mui/material';
// components
import Iconify from '../../../components/iconify';
import MenuPopover from '../../../components/menu-popover';
import ConfirmDialog from '../../../components/confirm-dialog';
import { routeConfig } from './RouteTableConfig';
import { fDate } from '../../../utils/formatTime';

// ----------------------------------------------------------------------

RouteTableRow.propTypes = {
  row: PropTypes.shape({
    routeName: PropTypes.string,
    tollAmt: PropTypes.number,
    advanceAmt: PropTypes.number,
    diesel: PropTypes.number,
    adBlue: PropTypes.number,
    fromPlace: PropTypes.string,
    toPlace: PropTypes.string,
    noOfDays: PropTypes.number,
    driverSalary: PropTypes.number,
    tripType: PropTypes.string,
    fixMilage: PropTypes.number,
    performanceMilage: PropTypes.number,
    ratePerTon: PropTypes.number,
    salary: PropTypes.number,
    salaryPercentage: PropTypes.number,
    distance: PropTypes.number,
    validFromDate: PropTypes.string,
    transportType: PropTypes.string,
    validTillDate: PropTypes.string,
  }),
  onDeleteRow: PropTypes.func,
  onEditRow: PropTypes.func,
};

export default function RouteTableRow({ row, onDeleteRow, onEditRow }) {
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openPopover, setOpenPopover] = useState(null);

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleOpenPopover = (event) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  return (
    <>
      <TableRow>
        {routeConfig.map((config) => (
          <TableCell key={config.id} align={config.type === 'number' ? 'center' : 'center'}>
            {config.type === 'date' ? fDate(row[config.id]) : row[config.id]}
          </TableCell>
        ))}
        <TableCell align="right">
          <IconButton color={openPopover ? 'primary' : 'default'} onClick={handleOpenPopover}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>
      <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        arrow="right-top"
        sx={{ width: 140 }}
      >
        <MenuItem onClick={() => onEditRow(row)}>
          <Iconify icon="eva:edit-fill" />
          Edit
        </MenuItem>

        <MenuItem
          onClick={() => {
            handleOpenConfirm();
            handleClosePopover();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="eva:trash-2-outline" />
          Delete
        </MenuItem>
      </MenuPopover>

      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title="Delete"
        content="Are you sure want to delete?"
        action={
          <MenuItem variant="contained" color="error" onClick={onDeleteRow}>
            Delete
          </MenuItem>
        }
      />
    </>
  );
}
