import PropTypes from 'prop-types';
import { useState } from 'react';
import { TableRow, MenuItem, TableCell, IconButton, Link } from '@mui/material';
import { paramCase } from 'change-case';
import { useNavigate } from 'react-router';
import Iconify from '../../../components/iconify';
import MenuPopover from '../../../components/menu-popover';
import ConfirmDialog from '../../../components/confirm-dialog';
import { tripConfig } from './TripTableConfig';
import Button from '../../../theme/overrides/Button';
import { fDate } from '../../../utils/formatTime';
import Label from '../../../components/label';
import { PATH_DASHBOARD } from '../../../routes/paths';

TripListRow.propTypes = {
  row: PropTypes.shape({
    driverId: PropTypes.shape({
      driverName: PropTypes.string,
    }),
    vehicleId: PropTypes.shape({
      vehicleNo: PropTypes.string,
    }),
    tripStatus: PropTypes.string,
    fromDate: PropTypes.string,
    _id: PropTypes.string,
    // other fields...
  }),
  onDeleteRow: PropTypes.func,
  onEditRow: PropTypes.func,
  selected: PropTypes.bool,
};

export default function TripListRow({ row, selected, onDeleteRow, onEditRow }) {
  const [openConfirm, setOpenConfirm] = useState(false);
  const navigate = useNavigate();

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const [openPopover, setOpenPopover] = useState(null);

  const handleOpenPopover = (event) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  return (
    <>
      <TableRow hover selected={selected}>
        {tripConfig.map((column) => (
          <TableCell key={column.id} align={column.align || 'left'}>
            {(() => {
              switch (column.id) {
                case '_id':
                  return (
                    <Link
                      onClick={() => {
                        navigate(PATH_DASHBOARD.trip.detail(paramCase(row._id)));
                      }}
                    >
                      # {row._id}
                    </Link>
                  );
                case 'driverName':
                  return row.driverId?.driverName;
                case 'vehicleNo':
                  return row.vehicleId?.vehicleNo;
                case 'fromDate':
                  return fDate(row[column.id]);
                case 'tripStatus':
                  return (
                    <Label
                      variant="soft"
                      color={
                        // (status === 'paid' && 'success') ||
                        // (status === 'unpaid' && 'warning') ||
                        // (status === 'overdue' && 'error') ||
                        'success'
                      }
                    >
                      Completed
                    </Label>
                  );

                default:
                  return row[column.id];
              }
            })()}
          </TableCell>
        ))}

        <TableCell align="right">
          <IconButton color={openPopover ? 'inherit' : 'default'} onClick={handleOpenPopover}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <MenuPopover
        open={Boolean(openPopover)}
        anchorEl={openPopover}
        onClose={handleClosePopover}
        arrow="right-top"
        sx={{ width: 140 }}
      >
        <MenuItem
          onClick={() => {
            onEditRow();
            handleClosePopover();
          }}
        >
          <Iconify icon="eva:edit-fill" />
          Edit
        </MenuItem>

        <MenuItem onClick={handleOpenConfirm} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" />
          Delete
        </MenuItem>
      </MenuPopover>

      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title="Delete"
        content="Are you sure you want to delete?"
        action={
          <MenuItem
            variant="contained"
            color="error"
            onClick={() => {
              onDeleteRow();
            }}
          >
            Delete
          </MenuItem>
        }
      />
    </>
  );
}
