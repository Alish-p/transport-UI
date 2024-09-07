import PropTypes from 'prop-types';
import { useState } from 'react';
import { TableRow, MenuItem, TableCell, IconButton, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { paramCase } from 'change-case';
import Iconify from '../../../components/iconify';
import MenuPopover from '../../../components/menu-popover';
import ConfirmDialog from '../../../components/confirm-dialog';
import { subtripConfig } from './basic-subtrip-table-config';
import { fDate } from '../../../utils/formatTime';
import { PATH_DASHBOARD } from '../../../routes/paths';
import Label from '../../../components/label';

// ----------------------------------------------------------------------

SubtripListRow.propTypes = {
  row: PropTypes.shape({
    _id: PropTypes.string,
    routeCd: PropTypes.string,
    customerId: PropTypes.string,
    loadingPoint: PropTypes.string,
    unloadingPoint: PropTypes.string,
    loadingWeight: PropTypes.number,
    unloadingWeight: PropTypes.number,
    startDate: PropTypes.string,
    endDate: PropTypes.string,
    startKm: PropTypes.number,
    endKm: PropTypes.number,
    rate: PropTypes.number,
    subtripStatus: PropTypes.string,
    invoiceNo: PropTypes.string,
    shipmentNo: PropTypes.string,
    orderNo: PropTypes.string,
    ewayBill: PropTypes.string,
    ewayExpiryDate: PropTypes.string,
    materialType: PropTypes.string,
    quantity: PropTypes.number,
    grade: PropTypes.string,
    dieselLtr: PropTypes.number,
    detentionTime: PropTypes.number,
    tds: PropTypes.number,
    deductedWeight: PropTypes.number,
  }),
  onDeleteRow: PropTypes.func,
  onEditRow: PropTypes.func,
};

export default function SubtripListRow({ row, onDeleteRow, onEditRow }) {
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openPopover, setOpenPopover] = useState(null);
  const navigate = useNavigate();

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

  const handleRowClick = () => {
    navigate(PATH_DASHBOARD.subtrip.detail(paramCase(row._id)));
  };

  return (
    <>
      <TableRow>
        {subtripConfig.map((column) => (
          <TableCell key={column.id} align={column.align || 'center'}>
            {(() => {
              switch (column.id) {
                case '_id':
                  return (
                    <Link
                      onClick={() => {
                        navigate(PATH_DASHBOARD.subtrip.detail(paramCase(row._id)));
                      }}
                    >
                      # {row._id}
                    </Link>
                  );
                case 'customerId':
                  return row?.customerId?.customerName;
                case 'routeName':
                  return row.routeCd.routeName;
                case 'invoiceNo':
                  return row.invoiceNo;
                case 'startDate':
                  return fDate(row[column.id]);
                case 'subtripStatus':
                  return (
                    <Label
                      variant="soft"
                      color={
                        (row[column.id] === 'In-queue' && 'primary') ||
                        (row[column.id] === 'Loaded' && 'secondary') ||
                        (row[column.id] === 'pending' && 'info') ||
                        // (row[column.id] === 'pending' && 'success') ||
                        // (row[column.id] === 'pending' && 'warning') ||
                        'default'
                      }
                    >
                      {row[column.id]}
                    </Label>
                  );

                default:
                  return row[column.id];
              }
            })()}
          </TableCell>
        ))}
        <TableCell align="right">
          <IconButton
            color={openPopover ? 'primary' : 'default'}
            onClick={(e) => {
              e.stopPropagation(); // Prevent triggering row click
              handleOpenPopover(e);
            }}
          >
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
