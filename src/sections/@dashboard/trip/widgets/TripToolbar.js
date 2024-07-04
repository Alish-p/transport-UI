/* eslint-disable react/prop-types */
// @mui
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import { Box, CircularProgress, Dialog, DialogActions, Tooltip } from '@mui/material';
import Label from '../../../../components/label/Label';
import Iconify from '../../../../components/iconify/Iconify';
import CustomPopover, { usePopover } from '../../../../components/custom-popover';
import LRPDF from '../../subtrip/lr/LRPdf';
import RouterLink from '../../../../routes/components/router-link';

// ----------------------------------------------------------------------

export default function TripToolbar({ status, backLink, tripData, onTripClose, onEdit }) {
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
          <IconButton component={RouterLink} href={backLink}>
            <Iconify icon="eva:arrow-ios-back-fill" />
          </IconButton>

          <Stack spacing={0.5}>
            <Stack spacing={1} direction="row" alignItems="center">
              <Typography variant="h4">Trip #{tripData._id} </Typography>
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

          {/* <PDFDownloadLink
            document={<LRPDF subtrip={tripData} />}
            fileName={tripData._id}
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
          </PDFDownloadLink> */}

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
          }}
        >
          Close Trip
        </MenuItem>
        <MenuItem
          onClick={() => {
            popover.onClose();
          }}
        >
          Bill Trip
        </MenuItem>
      </CustomPopover>
    </>
  );
}
