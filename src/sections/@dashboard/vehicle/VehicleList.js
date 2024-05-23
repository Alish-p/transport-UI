import PropTypes from 'prop-types';

import { Helmet } from 'react-helmet-async';
import { paramCase } from 'change-case';
import { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// @mui
import { Card, Table, Button, TableBody, Container, TableContainer } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../../redux/store';
import { fetchVehicles } from '../../../redux/slices/vehicle';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import { useSettingsContext } from '../../../components/settings';
import {
  useTable,
  getComparator,
  emptyRows,
  TableNoData,
  TableSkeleton,
  TableEmptyRows,
  TableHeadCustom,
  TablePaginationCustom,
} from '../../../components/table';
import Scrollbar from '../../../components/scrollbar';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
import ConfirmDialog from '../../../components/confirm-dialog';
import VehicleListRow from './VehicleListRow';
import VehicleTableToolbar from './VehicleTableToolbar';
import { vehicleConfig } from './VehicleTableConfig';
import Iconify from '../../../components/iconify/Iconify';

// ----------------------------------------------------------------------

export default function VehicleTable() {
  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    //
    selected,
    setSelected,
    //
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable({
    defaultOrderBy: 'vehicleNo',
  });

  const { themeStretch } = useSettingsContext();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { vehicles, isLoading } = useSelector((state) => state.vehicle); // Get vehicles and isLoading from the vehicle state

  const [tableData, setTableData] = useState([]);

  const [filterVehicleNo, setFilterVehicleNo] = useState('');
  const [filterVehicleType, setFilterVehicleType] = useState('');
  const [filterTransportCompany, setFilterTransportCompany] = useState('');
  const [openConfirm, setOpenConfirm] = useState(false);

  useEffect(() => {
    dispatch(fetchVehicles());
  }, [dispatch]);

  useEffect(() => {
    if (vehicles.length) {
      setTableData(vehicles);
    }
  }, [vehicles]);

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(order, orderBy),
    filterVehicleNo,
    filterVehicleType,
    filterTransportCompany,
  });

  const dataInPage = dataFiltered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const denseHeight = dense ? 60 : 80;

  const isFiltered =
    filterVehicleNo !== '' || filterVehicleType !== '' || filterTransportCompany !== '';

  const isNotFound =
    (!dataFiltered.length && !!filterVehicleNo) ||
    (!isLoading && !dataFiltered.length && isFiltered);

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleFilterVehicleNo = (event) => {
    setPage(0);
    setFilterVehicleNo(event.target.value);
  };

  const handleFilterVehicleType = (event) => {
    setPage(0);
    setFilterVehicleType(event.target.value);
  };

  const handleFilterTransportCompany = (event) => {
    setPage(0);
    setFilterTransportCompany(event.target.value);
  };

  const handleDeleteRow = (id) => {
    const deleteRow = tableData.filter((row) => row.id !== id);
    setSelected([]);
    setTableData(deleteRow);

    if (page > 0) {
      if (dataInPage.length < 2) {
        setPage(page - 1);
      }
    }
  };

  const handleDeleteRows = (selectedRows) => {
    const deleteRows = tableData.filter((row) => !selectedRows.includes(row.id));
    setSelected([]);
    setTableData(deleteRows);

    if (page > 0) {
      if (selectedRows.length === dataInPage.length) {
        setPage(page - 1);
      } else if (selectedRows.length === dataFiltered.length) {
        setPage(0);
      } else if (selectedRows.length > dataInPage.length) {
        const newPage = Math.ceil((tableData.length - selectedRows.length) / rowsPerPage) - 1;
        setPage(newPage);
      }
    }
  };

  const handleEditRow = (id) => {
    console.log({ id });
    navigate(PATH_DASHBOARD.vehicle.edit(paramCase(id)));
  };

  const handleResetFilter = () => {
    setFilterVehicleNo('');
    setFilterVehicleType('');
    setFilterTransportCompany('');
  };

  return (
    <>
      <Helmet>
        <title>Vehicle List | Dashboard</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Vehicle List"
          links={[{ name: 'Dashboard', href: PATH_DASHBOARD.root }, { name: 'Vehicle List' }]}
          action={
            <Button
              component={RouterLink}
              to={PATH_DASHBOARD.vehicle.new}
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              New Vehicle
            </Button>
          }
        />

        <Card>
          <VehicleTableToolbar
            filterVehicleNo={filterVehicleNo}
            filterVehicleType={filterVehicleType}
            filterTransportCompany={filterTransportCompany}
            onFilterVehicleNo={handleFilterVehicleNo}
            onFilterVehicleType={handleFilterVehicleType}
            onFilterTransportCompany={handleFilterTransportCompany}
            isFiltered={isFiltered}
            onResetFilter={handleResetFilter}
          />

          <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
            <Scrollbar>
              <Table size={dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
                <TableHeadCustom
                  order={order}
                  orderBy={orderBy}
                  headLabel={vehicleConfig}
                  onSort={onSort}
                />

                <TableBody>
                  {(isLoading ? [...Array(rowsPerPage)] : dataFiltered)
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) =>
                      row ? (
                        <VehicleListRow
                          key={row._id}
                          row={row}
                          selected={selected.includes(row._id)}
                          onDeleteRow={() => handleDeleteRow(row._id)}
                          onEditRow={() => handleEditRow(row._id)}
                        />
                      ) : (
                        !isNotFound && <TableSkeleton key={index} sx={{ height: denseHeight }} />
                      )
                    )}

                  <TableEmptyRows
                    height={denseHeight}
                    emptyRows={emptyRows(page, rowsPerPage, tableData.length)}
                  />

                  <TableNoData isNotFound={isNotFound} />
                </TableBody>
              </Table>
            </Scrollbar>
          </TableContainer>

          <TablePaginationCustom
            count={dataFiltered.length}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={onChangePage}
            onRowsPerPageChange={onChangeRowsPerPage}
            //
            dense={dense}
            onChangeDense={onChangeDense}
          />
        </Card>
      </Container>

      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title="Delete"
        content={`Are you sure you want to delete ${selected.length} items?`}
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleDeleteRows(selected);
              handleCloseConfirm();
            }}
          >
            Delete
          </Button>
        }
      />
    </>
  );
}

// ----------------------------------------------------------------------

function applyFilter({
  inputData,
  comparator,
  filterVehicleNo,
  filterVehicleType,
  filterTransportCompany,
}) {
  let filteredData = [...inputData];

  if (filterVehicleNo) {
    filteredData = filteredData.filter((vehicle) =>
      vehicle.vehicleNo.toLowerCase().includes(filterVehicleNo.toLowerCase())
    );
  }

  if (filterVehicleType) {
    filteredData = filteredData.filter((vehicle) =>
      vehicle.vehicleType.toLowerCase().includes(filterVehicleType.toLowerCase())
    );
  }

  if (filterTransportCompany) {
    filteredData = filteredData.filter((vehicle) =>
      vehicle.transportCompany.toLowerCase().includes(filterTransportCompany.toLowerCase())
    );
  }

  return filteredData.sort(comparator);
}
