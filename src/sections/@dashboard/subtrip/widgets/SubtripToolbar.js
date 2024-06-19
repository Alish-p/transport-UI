/* eslint-disable react/prop-types */
// @mui
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { CircularProgress, Tooltip } from '@mui/material';
import Label from '../../../../components/label/Label';
import Iconify from '../../../../components/iconify/Iconify';
import CustomPopover, { usePopover } from '../../../../components/custom-popover';
import LRPDF from '../lr/LRPdf';

// ----------------------------------------------------------------------

export default function OrderDetailsToolbar({
  status,
  backLink,
  subtripData,
  onAddMaterialInfo,
  onRecieve,
  onSubtripClose,
  onEdit,
}) {
  const popover = usePopover();

  return (
    <>
      <Stack
        spacing={3}
        direction={{ xs: 'column', md: 'row' }}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      >
        <Stack spacing={1} direction="row" alignItems="flex-start">
          <IconButton component="button" href={backLink}>
            <Iconify icon="eva:arrow-ios-back-fill" />
          </IconButton>

          <Stack spacing={0.5}>
            <Stack spacing={1} direction="row" alignItems="center">
              <Typography variant="h4">Subtrip #{subtripData._id} </Typography>
              <Label
                variant="soft"
                color={
                  (status === 'completed' && 'success') ||
                  (status === 'In-queue' && 'warning') ||
                  (status === 'cancelled' && 'error') ||
                  'default'
                }
              >
                {status}
              </Label>
            </Stack>
          </Stack>
        </Stack>

        <Stack
          flexGrow={1}
          spacing={1.5}
          direction="row"
          alignItems="center"
          justifyContent="flex-end"
        >
          <Button
            color="primary"
            variant="outlined"
            endIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}
            onClick={popover.onOpen}
            sx={{ textTransform: 'capitalize' }}
          >
            Actions
          </Button>

          <Button
            color="primary"
            variant="outlined"
            startIcon={<Iconify icon="solar:printer-minimalistic-bold" />}
          >
            Print
          </Button>

          <PDFDownloadLink
            document={<LRPDF subtrip={subtripData} />}
            fileName={subtripData._id}
            style={{ textDecoration: 'none' }}
            color="green"
          >
            {({ loading }) => (
              <Tooltip title="Download">
                <IconButton>
                  {loading ? (
                    <CircularProgress size={24} color="primary" />
                  ) : (
                    <Iconify icon="eva:download-fill" />
                  )}
                </IconButton>
              </Tooltip>
            )}
          </PDFDownloadLink>

          <Button
            color="primary"
            variant="outlined"
            startIcon={<Iconify icon="solar:pen-bold" />}
            onClick={onEdit}
          >
            Edit
          </Button>
        </Stack>
      </Stack>

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="top-right"
        sx={{ width: 160 }}
      >
        <MenuItem
          onClick={() => {
            popover.onClose();
            onAddMaterialInfo();
          }}
          disabled={!(subtripData.subtripStatus === 'In-queue')}
        >
          Add Material
        </MenuItem>
        <MenuItem
          onClick={() => {
            popover.onClose();
            onRecieve();
          }}
          disabled={!(subtripData.subtripStatus === 'Loaded')}
        >
          Recieve Trip
        </MenuItem>
        <MenuItem
          onClick={() => {
            popover.onClose();
            onSubtripClose();
          }}
          disabled={!(subtripData.subtripStatus === 'Received')}
        >
          Resolve
        </MenuItem>
        <MenuItem
          onClick={() => {
            popover.onClose();
            onSubtripClose();
          }}
          disabled={!(subtripData.subtripStatus === 'Received')}
        >
          Close Trip
        </MenuItem>
      </CustomPopover>
    </>
  );
}
