import PropTypes from 'prop-types';
// @mui
import {
  Box,
  Card,
  Table,
  Stack,
  Avatar,
  TableRow,
  TableBody,
  TableCell,
  CardHeader,
  Typography,
  TableContainer,
} from '@mui/material';
// utils
import { fCurrency } from '../../../../utils/formatNumber';
// components
import Label from '../../../../components/label';
import Image from '../../../../components/image';
import Scrollbar from '../../../../components/scrollbar';
import { TableHeadCustom } from '../../../../components/table';

// ----------------------------------------------------------------------

EcommerceBestSalesman.propTypes = {
  title: PropTypes.string,
  tableData: PropTypes.array,
  subheader: PropTypes.string,
  tableLabels: PropTypes.array,
};

export default function EcommerceBestSalesman({
  title,
  subheader,
  tableData,
  tableLabels,
  ...other
}) {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} sx={{ mb: 3 }} />

      <TableContainer sx={{ overflow: 'auto' }}>
        <Scrollbar>
          <Table sx={{ minWidth: 720 }}>
            <TableHeadCustom headLabel={tableLabels} />

            <TableBody>
              {tableData.map((row, index) => (
                <EcommerceBestSalesmanRow key={index} row={row} />
              ))}
            </TableBody>
          </Table>
        </Scrollbar>
      </TableContainer>
    </Card>
  );
}

// ----------------------------------------------------------------------

EcommerceBestSalesmanRow.propTypes = {
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
    joinDate: PropTypes.instanceOf(Date),
    transportCompany: PropTypes.string,
  }),
};

function EcommerceBestSalesmanRow({ row }) {
  return (
    <TableRow>
      <TableCell>{row.vehicleNo}</TableCell>
      <TableCell>{row.vehicleType}</TableCell>
      <TableCell>{row.vehicleCompany}</TableCell>
      <TableCell align="center">{row.modelType}</TableCell>
      <TableCell align="right">{row.noOfTyres}</TableCell>
      <TableCell align="right">{row.chasisNo || '-'}</TableCell>
      <TableCell align="right">{row.engineType || '-'}</TableCell>
      <TableCell align="right">{row.engineNo || '-'}</TableCell>
      <TableCell align="right">{row.fuelTankCapacity}</TableCell>
      <TableCell align="right">
        {row.joinDate ? new Date(row.joinDate).toLocaleDateString() : '-'}
      </TableCell>
      <TableCell align="right">{row.transportCompany || '-'}</TableCell>
    </TableRow>
  );
}
