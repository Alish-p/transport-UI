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
import { vehicleConfig } from './VehicleTableConfig';

// ----------------------------------------------------------------------

VehicleListRow.propTypes = {
  row: PropTypes.shape({
    vehicleNo: PropTypes.string,
    vehicleType: PropTypes.string,
    vehicleCompany: PropTypes.string,
    modelType: PropTypes.string,
    noOfTyres: PropTypes.number,
    chasisNo: PropTypes.string,
    engineType: PropTypes.string,
    engineNo: PropTypes.string,
    fuelTankCapacity: PropTypes.number,
    manufacturingYear: PropTypes.number,
    loadingCapacity: PropTypes.number,
    fromDate: PropTypes.instanceOf(Date),
    toDate: PropTypes.instanceOf(Date),
    transporter: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        transportName: PropTypes.string,
      }),
    ]),
  }).isRequired,
  onDeleteRow: PropTypes.func.isRequired,
  onEditRow: PropTypes.func.isRequired,
};

// Helper function to render table cell content
const renderTableCellContent = (row, config) => {
  const { id, type } = config;

  if (id === 'transporter') {
    return typeof row.transporter === 'string' ? row.transporter : row.transporter.transportName;
  }

  if (type === 'date') {
    return fDate(row[id]);
  }

  return row[id];
};

export default function VehicleListRow({ row, onDeleteRow, onEditRow }) {
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
        {vehicleConfig.map((config) => (
          <TableCell key={config.id} align={config.type === 'number' ? 'center' : 'center'}>
            {renderTableCellContent(row, config)}
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
