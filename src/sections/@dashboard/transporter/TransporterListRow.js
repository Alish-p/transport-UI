import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { TableRow, MenuItem, TableCell, IconButton } from '@mui/material';
// utils
import { fDate } from '../../../utils/formatTime';
// components
import Iconify from '../../../components/iconify';
import MenuPopover from '../../../components/menu-popover';
import ConfirmDialog from '../../../components/confirm-dialog';
import { transporterConfig } from './TransporterTableConfig';

// ----------------------------------------------------------------------

TransporterListRow.propTypes = {
  row: PropTypes.shape({
    transportName: PropTypes.string,
    address: PropTypes.string,
    place: PropTypes.string,
    pinNo: PropTypes.string,
    cellNo: PropTypes.string,
    bankCd: PropTypes.string,
    ifscCode: PropTypes.string,
    accNo: PropTypes.string,
    paymentMode: PropTypes.string,
    panNo: PropTypes.string,
    ownerName: PropTypes.string,
    gstNo: PropTypes.string,
    bankBranch: PropTypes.string,
    emailId: PropTypes.string,
    phoneNo: PropTypes.string,
    transportType: PropTypes.string,
    agreementNo: PropTypes.string,
    tdsPercentage: PropTypes.number,
  }),
  onDeleteRow: PropTypes.func,
  onEditRow: PropTypes.func,
};

export default function TransporterListRow({ row, onDeleteRow, onEditRow }) {
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
        {transporterConfig.map((config) => (
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
