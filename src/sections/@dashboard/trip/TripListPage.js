import { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';
import { paramCase } from 'change-case';
import { Card, Table, Button, TableBody, Container, TableContainer } from '@mui/material';
import { useDispatch, useSelector } from '../../../redux/store';
import { deleteTrip, fetchTrips } from '../../../redux/slices/trip';
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
import TripListRow from './TripListRow';
import TripTableToolbar from './TripTableToolbar';
import { tripConfig } from './TripTableConfig';
import Iconify from '../../../components/iconify/Iconify';

export default function TripList() {
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
    defaultOrderBy: 'fromDate',
  });

  const { themeStretch } = useSettingsContext();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { trips, isLoading } = useSelector((state) => state.trip);
  const [tableData, setTableData] = useState([]);
  const [filterDriverName, setFilterDriverName] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [openConfirm, setOpenConfirm] = useState(false);

  useEffect(() => {
    dispatch(fetchTrips());
  }, [dispatch]);

  useEffect(() => {
    if (trips.length) {
      setTableData(trips);
    }
  }, [trips]);

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(order, orderBy),
    filterDriverName,
    filterDate,
  });

  const dataInPage = dataFiltered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const denseHeight = dense ? 60 : 80;

  const isFiltered = filterDriverName !== '' || filterDate !== '';

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

  const handleFilterDate = (event) => {
    setPage(0);
    setFilterDate(event.target.value);
  };

  const handleDeleteRow = (id) => {
    dispatch(deleteTrip(id));
  };

  const handleEditRow = (id) => {
    navigate(PATH_DASHBOARD.trip.edit(paramCase(id)));
  };

  const handleResetFilter = () => {
    setFilterDriverName('');
    setFilterDate('');
  };

  return (
    <>
      <Helmet>
        <title>Trip List | Dashboard</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Trip List"
          links={[{ name: 'Dashboard', href: PATH_DASHBOARD.root }, { name: 'Trip List' }]}
          action={
            <Button
              component={RouterLink}
              to={PATH_DASHBOARD.trip.new}
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              New Trip
            </Button>
          }
        />

        <Card>
          <TripTableToolbar
            filterDriverName={filterDriverName}
            filterDate={filterDate}
            onFilterDriverName={handleFilterDriverName}
            onFilterDate={handleFilterDate}
            isFiltered={isFiltered}
            onResetFilter={handleResetFilter}
          />

          <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
            <Scrollbar>
              <Table size={dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
                <TableHeadCustom
                  order={order}
                  orderBy={orderBy}
                  headLabel={tripConfig}
                  onSort={onSort}
                />

                <TableBody>
                  {(isLoading ? [...Array(rowsPerPage)] : dataFiltered)
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) =>
                      row ? (
                        <TripListRow
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
    </>
  );
}

// ----------------------------------------------------------------------

function applyFilter({ inputData, comparator, filterDriverName, filterDate }) {
  let filteredData = [...inputData];

  if (filterDriverName) {
    filteredData = filteredData.filter((trip) =>
      trip.driverName.toLowerCase().includes(filterDriverName.toLowerCase())
    );
  }

  if (filterDate) {
    filteredData = filteredData.filter((trip) =>
      trip.fromDate.toLowerCase().includes(filterDate.toLowerCase())
    );
  }

  return filteredData.sort(comparator);
}
