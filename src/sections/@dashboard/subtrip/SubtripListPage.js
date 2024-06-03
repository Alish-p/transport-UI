import PropTypes from 'prop-types';
import { useState } from 'react';
import { format } from 'date-fns';
import { sentenceCase } from 'change-case';
// @mui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Card,
  Stack,
  Table,
  Button,
  Divider,
  MenuItem,
  TableRow,
  TableBody,
  TableCell,
  CardHeader,
  Typography,
  IconButton,
  TableContainer,
} from '@mui/material';
// components
import Label from '../../../components/label';
import Iconify from '../../../components/iconify';
import Scrollbar from '../../../components/scrollbar';
import MenuPopover from '../../../components/menu-popover';
import { TableHeadCustom } from '../../../components/table';

// ----------------------------------------------------------------------

SubtripDetails.propTypes = {
  title: PropTypes.string,
  tableData: PropTypes.array,
  subheader: PropTypes.string,
  tableLabels: PropTypes.array,
};

export default function SubtripDetails({ title, subheader, tableLabels, tableData, ...other }) {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} sx={{ mb: 3 }} />

      <TableContainer sx={{ overflow: 'unset' }}>
        <Scrollbar>
          <Table sx={{ minWidth: 960 }}>
            <TableHeadCustom headLabel={tableLabels} />

            <TableBody>
              {tableData.map((row) => (
                <SubtripDetailsRow key={row._id} row={row} />
              ))}
            </TableBody>
          </Table>
        </Scrollbar>
      </TableContainer>

      <Divider />

      <Box sx={{ p: 2, textAlign: 'right' }}>
        <Button
          size="small"
          color="inherit"
          endIcon={<Iconify icon="eva:arrow-ios-forward-fill" />}
        >
          View All
        </Button>
      </Box>
    </Card>
  );
}

// ----------------------------------------------------------------------

SubtripDetailsRow.propTypes = {
  row: PropTypes.shape({
    _id: PropTypes.string,
    routeCd: PropTypes.string,
    subtripStatus: PropTypes.string,
    loadingPoint: PropTypes.string,
    unloadingPoint: PropTypes.string,
  }),
};

function SubtripDetailsRow({ row }) {
  const theme = useTheme();

  const isLight = theme.palette.mode === 'light';

  const [openPopover, setOpenPopover] = useState(null);

  const handleOpenPopover = (event) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  const handleDownload = () => {
    handleClosePopover();
    console.log('DOWNLOAD', row._id);
  };

  const handlePrint = () => {
    handleClosePopover();
    console.log('PRINT', row._id);
  };

  const handleEdit = () => {
    handleClosePopover();
    console.log('EDIT', row._id);
    // Navigate to SubtripEditPage
    // e.g., navigate(`/subtrip/edit/${row._id}`);
  };

  const handleViewDetails = () => {
    console.log('VIEW DETAILS', row._id);
    // Navigate to SubtripDetailPage
    // e.g., navigate(`/subtrip/details/${row._id}`);
  };

  return (
    <>
      <TableRow hover onClick={handleViewDetails} sx={{ cursor: 'pointer' }}>
        <TableCell>{row.routeCd}</TableCell>
        <TableCell>
          <Label
            variant={isLight ? 'soft' : 'filled'}
            color={
              (row.subtripStatus === '1' && 'success') ||
              (row.subtripStatus === '2' && 'warning') ||
              'error'
            }
          >
            {sentenceCase(row.subtripStatus)}
          </Label>
        </TableCell>
        <TableCell>{row.loadingPoint}</TableCell>
        <TableCell>{row.unloadingPoint}</TableCell>

        <TableCell align="right">
          <IconButton color={openPopover ? 'inherit' : 'default'} onClick={handleOpenPopover}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        arrow="right-top"
        sx={{ width: 160 }}
      >
        <MenuItem onClick={handleDownload}>
          <Iconify icon="eva:download-fill" />
          Download
        </MenuItem>

        <MenuItem onClick={handlePrint}>
          <Iconify icon="eva:printer-fill" />
          Print
        </MenuItem>

        <MenuItem onClick={handleEdit}>
          <Iconify icon="eva:edit-fill" />
          Edit
        </MenuItem>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={handleClosePopover} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" />
          Delete
        </MenuItem>
      </MenuPopover>
    </>
  );
}

// Sample Usage of SubtripDetails Component
const subtrips = [
  {
    _id: '665a1ed91917f37011da27d9',
    routeCd: '664f8e687cbf8fac101843be',
    subtripStatus: '1',
    loadingPoint: '1',
    unloadingPoint: '1',
  },
  // More subtrip objects...
];

const tableLabels = [
  { id: 'routeCd', label: 'Route' },
  { id: 'subtripStatus', label: 'Status' },
  { id: 'loadingPoint', label: 'Loading Point' },
  { id: 'unloadingPoint', label: 'Unloading Point' },
  { id: '' }, // Empty cell for action buttons
];
