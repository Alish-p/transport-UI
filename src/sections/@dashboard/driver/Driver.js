import { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';
import { paramCase } from 'change-case';
import { Card, Table, Button, TableBody, Container, TableContainer } from '@mui/material';
import { useDispatch, useSelector } from '../../../redux/store';
import { fetchDrivers } from '../../../redux/slices/driver';
import { PATH_DASHBOARD } from '../../../routes/paths';
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
import DriverListRow from './DriverListRow';
import DriverTableToolbar from './DriverTableToolbar';
import { driverConfig } from './DriverTableConfig';
import Iconify from '../../../components/iconify/Iconify';

export default function DriverList() {
  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    selected,
    setSelected,
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable({
    defaultOrderBy: 'driverName',
  });

  const { themeStretch } = useSettingsContext();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { drivers, isLoading } = useSelector((state) => state.driver);
  const [tableData, setTableData] = useState([]);
  const [filterDriverName, setFilterDriverName] = useState('');
  const [filterLicenseType, setFilterLicenseType] = useState('');
  const [openConfirm, setOpenConfirm] = useState(false);

  useEffect(() => {
    dispatch(fetchDrivers());
  }, [dispatch]);

  useEffect(() => {
    if (drivers.length) {
      setTableData(drivers);
    }
  }, [drivers]);

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(order, orderBy),
    filterDriverName,
    filterLicenseType,
  });

  const dataInPage = dataFiltered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const denseHeight = dense ? 60 : 80;

  const isFiltered = filterDriverName !== '' || filterLicenseType !== '';

  const isNotFound =
    (!dataFiltered.length && !!filterDriverName) ||
    (!isLoading && !dataFiltered.length && isFiltered);

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleFilterDriverName = (event) => {
    setPage(0);
    setFilterDriverName(event.target.value);
  };

  const handleFilterLicenseType = (event) => {
    setPage(0);
    setFilterLicenseType(event.target.value);
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
    navigate(PATH_DASHBOARD.driver.edit(paramCase(id)));
  };

  const handleResetFilter = () => {
    setFilterDriverName('');
    setFilterLicenseType('');
  };

  return (
    <>
      <Helmet>
        <title>Driver List | Dashboard</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Driver List"
          links={[{ name: 'Dashboard', href: PATH_DASHBOARD.root }, { name: 'Driver List' }]}
          action={
            <Button
              component={RouterLink}
              to={PATH_DASHBOARD.driver.new}
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              New Driver
            </Button>
          }
        />

        <Card>
          <DriverTableToolbar
            filterDriverName={filterDriverName}
            filterLicenseType={filterLicenseType}
            onFilterDriverName={handleFilterDriverName}
            onFilterLicenseType={handleFilterLicenseType}
            isFiltered={isFiltered}
            onResetFilter={handleResetFilter}
          />

          <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
            <Scrollbar>
              <Table size={dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
                <TableHeadCustom
                  order={order}
                  orderBy={orderBy}
                  headLabel={driverConfig}
                  onSort={onSort}
                />

                <TableBody>
                  {(isLoading ? [...Array(rowsPerPage)] : dataFiltered)
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) =>
                      row ? (
                        <DriverListRow
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

function applyFilter({ inputData, comparator, filterDriverName, filterLicenseType }) {
  let filteredData = [...inputData];

  if (filterDriverName) {
    filteredData = filteredData.filter((driver) =>
      driver.driverName.toLowerCase().includes(filterDriverName.toLowerCase())
    );
  }

  if (filterLicenseType) {
    filteredData = filteredData.filter((driver) =>
      driver.licenseType.toLowerCase().includes(filterLicenseType.toLowerCase())
    );
  }

  return filteredData.sort(comparator);
}
