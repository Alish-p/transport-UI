/* eslint-disable react/prop-types */
import { format } from 'date-fns';
// @mui
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
import { useBoolean } from '../../../../hooks/useBoolean';
import Label from '../../../../components/label/Label';
import Iconify from '../../../../components/iconify';
import CustomPopover, { usePopover } from '../../../../components/custom-popover';
import ConfirmDialog from '../../../../components/confirm-dialog/ConfirmDialog';
import { fDate } from '../../../../utils/formatTime';

// ----------------------------------------------------------------------

export default function VehicleTableRow({
  row,
  selected,
  onSelectRow,
  onViewRow,
  onEditRow,
  onDeleteRow,
}) {
  const {
    _id,
    vehicleId: { vehicleNo },
    driverId,
    tripStatus,
    fromDate,
    remarks,
    toDate,
  } = row;

  const confirm = useBoolean();

  const popover = usePopover();

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell>
        <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar alt={vehicleNo} sx={{ mr: 2 }}>
            {vehicleNo.slice(0, 2).toUpperCase()}
          </Avatar>

          <ListItemText
            disableTypography
            primary={
              <Typography variant="body2" noWrap>
                {vehicleNo}
              </Typography>
            }
            secondary={
              <Link
                noWrap
                variant="body2"
                onClick={() => {
                  onViewRow(_id);
                }}
                sx={{ color: 'text.disabled', cursor: 'pointer' }}
              >
                {_id}
              </Link>
            }
          />
        </TableCell>
        <TableCell>
          <ListItemText
            primary={driverId?.driverName}
            primaryTypographyProps={{ typography: 'body2', noWrap: true }}
          />
        </TableCell>
        <TableCell>
          <Label
            variant="soft"
            color={tripStatus.toLowerCase() === 'pending' ? 'error' : 'success'}
          >
            {tripStatus}
          </Label>
        </TableCell>
        <TableCell>
          <ListItemText
            primary={format(new Date(fromDate), 'dd MMM yyyy')}
            secondary={format(new Date(fromDate), 'p')}
            primaryTypographyProps={{ typography: 'body2', noWrap: true }}
            secondaryTypographyProps={{
              mt: 0.5,
              component: 'span',
              typography: 'caption',
            }}
          />
        </TableCell>
        <TableCell>
          <ListItemText
            primary={format(new Date(toDate), 'dd MMM yyyy')}
            secondary={format(new Date(toDate), 'p')}
            primaryTypographyProps={{ typography: 'body2', noWrap: true }}
            secondaryTypographyProps={{
              mt: 0.5,
              component: 'span',
              typography: 'caption',
            }}
          />
        </TableCell>
        <TableCell>
          <ListItemText
            primary={remarks}
            primaryTypographyProps={{ typography: 'body2', noWrap: true }}
          />
        </TableCell>

        <TableCell align="right" sx={{ px: 1 }}>
          <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 160 }}
      >
        <MenuItem
          onClick={() => {
            onViewRow();
            popover.onClose();
          }}
        >
          <Iconify icon="solar:eye-bold" />
          View
        </MenuItem>

        <MenuItem
          onClick={() => {
            onEditRow();
            popover.onClose();
          }}
        >
          <Iconify icon="solar:pen-bold" />
          Edit
        </MenuItem>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem
          onClick={() => {
            confirm.onTrue();
            popover.onClose();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="solar:trash-bin-trash-bold" />
          Delete
        </MenuItem>
      </CustomPopover>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        content="Are you sure want to delete?"
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            Delete
          </Button>
        }
      />
    </>
  );
}
