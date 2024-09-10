/* eslint-disable react/prop-types */
// @mui
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import { Box, CircularProgress, Dialog, DialogActions, Tooltip } from '@mui/material';
import { useNavigate } from 'react-router';
import Label from '../../../components/label/Label';
import Iconify from '../../../components/iconify/Iconify';
import CustomPopover, { usePopover } from '../../../components/custom-popover';
import LRPDF from './pdfs/lorry-reciept-pdf';
import { useBoolean } from '../../../hooks/useBoolean';
import IndentPdf from './pdfs/petrol-indent-pdf';
import RouterLink from '../../../routes/components/router-link';

// ----------------------------------------------------------------------

export default function SubtripToolbar({
  status,
  backLink,
  subtripData,
  onAddMaterialInfo,
  onRecieve,
  onSubtripClose,
  onEdit,
  onResolve,
}) {
  const actionPopover = usePopover();
  const viewPopover = usePopover();
  const downloadPopover = usePopover();

  const navigate = useNavigate();
  const viewLR = useBoolean();
  const viewIntent = useBoolean();

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
            onClick={actionPopover.onOpen}
            sx={{ textTransform: 'capitalize' }}
          >
            Actions
          </Button>

          <Button
            color="primary"
            variant="outlined"
            startIcon={<Iconify icon="solar:eye-bold" />}
            endIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}
            onClick={viewPopover.onOpen}
            sx={{ textTransform: 'capitalize' }}
          >
            View
          </Button>
          <Button
            color="primary"
            variant="outlined"
            startIcon={<Iconify icon="material-symbols:download" />}
            endIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}
            onClick={downloadPopover.onOpen}
            sx={{ textTransform: 'capitalize' }}
          >
            Download
          </Button>

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

      {/* Actions Popover */}
      <CustomPopover
        open={actionPopover.open}
        onClose={actionPopover.onClose}
        arrow="top-right"
        sx={{ width: 160 }}
      >
        <MenuItem
          onClick={() => {
            actionPopover.onClose();
            onAddMaterialInfo();
          }}
          disabled={!(subtripData.subtripStatus === 'in-queue')}
        >
          Add Material
        </MenuItem>
        <MenuItem
          onClick={() => {
            actionPopover.onClose();
            onRecieve();
          }}
          disabled={!(subtripData.subtripStatus === 'loaded')}
        >
          Recieve Trip
        </MenuItem>
        <MenuItem
          onClick={() => {
            actionPopover.onClose();
            onResolve();
          }}
          disabled={!(subtripData.subtripStatus === 'error')}
        >
          Resolve
        </MenuItem>
        <MenuItem
          onClick={() => {
            actionPopover.onClose();
            onSubtripClose();
          }}
          disabled={!(subtripData.subtripStatus === 'received')}
        >
          Close Trip
        </MenuItem>
      </CustomPopover>

      {/* View Popover */}
      <CustomPopover
        open={viewPopover.open}
        onClose={viewPopover.onClose}
        arrow="top-right"
        sx={{ width: 200 }}
      >
        <MenuItem
          onClick={() => {
            viewPopover.onClose();
            viewLR.onTrue();
          }}
          disabled={subtripData.subtripStatus !== 'loaded'}
        >
          Lorry Receipt (LR)
        </MenuItem>
        <MenuItem
          onClick={() => {
            viewPopover.onClose();
            viewIntent.onTrue();
          }}
          disabled={subtripData.subtripStatus !== 'loaded'}
        >
          Petrol Pump Intent
        </MenuItem>
      </CustomPopover>

      {/* Download Popover */}
      <CustomPopover
        open={downloadPopover.open}
        onClose={downloadPopover.onClose}
        arrow="top-right"
        sx={{ width: 200 }}
      >
        <PDFDownloadLink
          document={<LRPDF subtripData={subtripData} />}
          fileName={subtripData._id}
          style={{ textDecoration: 'none' }}
          color="green"
          onClick={() => {
            downloadPopover.onClose();
          }}
        >
          {({ loading }) => (
            <Tooltip title="Download">
              <Button
                startIcon={
                  loading ? (
                    <Iconify icon="line-md:loading-loop" />
                  ) : (
                    <Iconify icon="eva:download-fill" />
                  )
                }
              >
                LR
              </Button>
            </Tooltip>
          )}
        </PDFDownloadLink>

        <PDFDownloadLink
          document={<IndentPdf subtripData={subtripData} />}
          fileName={`${subtripData._id}_indent`}
          style={{ textDecoration: 'none' }}
          color="green"
          onClick={() => {
            downloadPopover.onClose();
          }}
        >
          {({ loading }) => (
            <Tooltip title="Download">
              <Button
                startIcon={
                  loading ? (
                    <Iconify icon="line-md:loading-loop" />
                  ) : (
                    <Iconify icon="eva:download-fill" />
                  )
                }
              >
                Petrol Pump Indent
              </Button>
            </Tooltip>
          )}
        </PDFDownloadLink>
      </CustomPopover>

      {/* View LR Dialog */}
      <Dialog fullScreen open={viewLR.value}>
        <Box sx={{ height: 1, display: 'flex', flexDirection: 'column' }}>
          <DialogActions
            sx={{
              p: 1.5,
            }}
          >
            <Button color="primary" variant="outlined" onClick={viewLR.onFalse}>
              Close
            </Button>
          </DialogActions>

          <Box sx={{ flexGrow: 1, height: 1, overflow: 'hidden' }}>
            <PDFViewer width="100%" height="100%" style={{ border: 'none' }}>
              <LRPDF subtripData={subtripData} />
            </PDFViewer>
          </Box>
        </Box>
      </Dialog>

      {/* View Intent Dialog */}
      <Dialog fullScreen open={viewIntent.value}>
        <Box sx={{ height: 1, display: 'flex', flexDirection: 'column' }}>
          <DialogActions
            sx={{
              p: 1.5,
            }}
          >
            <Button color="primary" variant="outlined" onClick={viewIntent.onFalse}>
              Close
            </Button>
          </DialogActions>

          <Box sx={{ flexGrow: 1, height: 1, overflow: 'hidden' }}>
            <PDFViewer width="100%" height="100%" style={{ border: 'none' }}>
              <IndentPdf subtripData={subtripData} />
            </PDFViewer>
          </Box>
        </Box>
      </Dialog>
    </>
  );
}
