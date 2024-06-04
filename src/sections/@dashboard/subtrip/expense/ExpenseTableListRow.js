// ExpenseListRow.js
import PropTypes from 'prop-types';
import { useState } from 'react';
import { TableRow, MenuItem, TableCell, IconButton } from '@mui/material';
import Iconify from '../../../../components/iconify';
import MenuPopover from '../../../../components/menu-popover';
import ConfirmDialog from '../../../../components/confirm-dialog';
import { expenseTableConfig } from './ExpenseTableConfig';
import { fDate } from '../../../../utils/formatTime';

// ----------------------------------------------------------------------

ExpenseListRow.propTypes = {
  row: PropTypes.shape({
    expenseType: PropTypes.string,
    amount: PropTypes.number,
    date: PropTypes.string,
    slipNo: PropTypes.string,
    paidThrough: PropTypes.string,
    authorisedBy: PropTypes.string,
    remarks: PropTypes.string,
  }),
  onDeleteRow: PropTypes.func,
  onEditRow: PropTypes.func,
};

export default function ExpenseListRow({ row, onDeleteRow, onEditRow }) {
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
      <TableRow hover>
        {expenseTableConfig.map((config) => (
          <TableCell key={config.id} align={config.type === 'number' ? 'right' : 'left'}>
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
        content="Are you sure you want to delete this expense?"
        action={
          <MenuItem variant="contained" color="error" onClick={onDeleteRow}>
            Delete
          </MenuItem>
        }
      />
    </>
  );
}
