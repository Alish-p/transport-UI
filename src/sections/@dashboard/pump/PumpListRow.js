import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { TableRow, MenuItem, TableCell, IconButton } from '@mui/material';
// components
import Iconify from '../../../components/iconify';
import MenuPopover from '../../../components/menu-popover';
import ConfirmDialog from '../../../components/confirm-dialog';
import { pumpConfig } from './PumpTableConfig';

// ----------------------------------------------------------------------

PumpTableRow.propTypes = {
  row: PropTypes.shape({
    pumpName: PropTypes.string,
    placeName: PropTypes.string,
    ownerName: PropTypes.string,
    ownerCellNo: PropTypes.string,
    pumpPhoneNo: PropTypes.string,
    taluk: PropTypes.string,
    district: PropTypes.string,
    contactPerson: PropTypes.string,
    address: PropTypes.string,
  }),
  onDeleteRow: PropTypes.func,
  onEditRow: PropTypes.func,
};

export default function PumpTableRow({ row, onDeleteRow, onEditRow }) {
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
        {pumpConfig.map((config) => (
          <TableCell key={config.id} align={config.type === 'number' ? 'center' : 'center'}>
            {row[config.id]}
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
