import PropTypes from 'prop-types';
import { useState } from 'react';
import { TableRow, MenuItem, TableCell, IconButton, Link } from '@mui/material';
import { paramCase } from 'change-case';
import { useNavigate } from 'react-router';
import { useTheme } from '@emotion/react';
import Iconify from '../../../components/iconify';
import MenuPopover from '../../../components/menu-popover';
import ConfirmDialog from '../../../components/confirm-dialog';
import { subtripConfig } from './SubtripTableConfig';
import { fDate } from '../../../utils/formatTime';
import Label from '../../../components/label';
import { PATH_DASHBOARD } from '../../../routes/paths';

SubtripListRow.propTypes = {
  row: PropTypes.shape({
    customerId: PropTypes.string,
    invoiceNo: PropTypes.string,
    subtripStatus: PropTypes.string,
    fromDate: PropTypes.string,
    _id: PropTypes.string,
    routeCd: PropTypes.object,
    // other fields...
  }),
  onDeleteRow: PropTypes.func,
  onEditRow: PropTypes.func,
  selected: PropTypes.bool,
};

export default function SubtripListRow({ row, selected, onDeleteRow, onEditRow }) {
  const [openConfirm, setOpenConfirm] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';

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
        {subtripConfig.map((column) => (
          <TableCell key={column.id} align={column.align || 'left'}>
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
                  return row.customerId;
                case 'routeName':
                  return row.routeCd.routeName;
                case 'invoiceNo':
                  return row.invoiceNo;
                case 'startDate':
                  return fDate(row[column.id]);
                case 'subtripStatus':
                  return (
                    <Label
                      variant={isLight ? 'soft' : 'filled'}
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
