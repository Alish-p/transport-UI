import { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';
import { paramCase } from 'change-case';
import { Card, Table, Button, TableBody, Container, TableContainer } from '@mui/material';
import { useDispatch, useSelector } from '../../../redux/store';
import { fetchRoutes } from '../../../redux/slices/route';
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
import RouteListRow from './RouteListRow';
import RouteTableToolbar from './RouteTableToolbar';
import { routeConfig } from './RouteTableConfig';
import Iconify from '../../../components/iconify/Iconify';

export default function RouteList() {
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
    defaultOrderBy: 'routeName',
  });

  const { themeStretch } = useSettingsContext();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { routes, isLoading } = useSelector((state) => state.route);
  const [tableData, setTableData] = useState([]);
  const [filterRouteName, setFilterRouteName] = useState('');
  const [filterFromPlace, setFilterFromPlace] = useState('');
  const [filterToPlace, setFilterToPlace] = useState('');
  const [openConfirm, setOpenConfirm] = useState(false);

  useEffect(() => {
    dispatch(fetchRoutes());
  }, [dispatch]);

  useEffect(() => {
    if (routes.length) {
      setTableData(routes);
    }
  }, [routes]);

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(order, orderBy),
    filterRouteName,
    filterFromPlace,
    filterToPlace,
  });

  const dataInPage = dataFiltered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const denseHeight = dense ? 60 : 80;

  const isFiltered = filterRouteName !== '' || filterFromPlace !== '' || filterToPlace !== '';

  const isNotFound =
    (!dataFiltered.length && !!filterRouteName) ||
    (!isLoading && !dataFiltered.length && isFiltered);

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleFilterRouteName = (event) => {
    setPage(0);
    setFilterRouteName(event.target.value);
  };

  const handleFilterFromPlace = (event) => {
    setPage(0);
    setFilterFromPlace(event.target.value);
  };

  const handleFilterToPlace = (event) => {
    setPage(0);
    setFilterToPlace(event.target.value);
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
    navigate(PATH_DASHBOARD.route.edit(paramCase(id)));
  };

  const handleResetFilter = () => {
    setFilterRouteName('');
    setFilterFromPlace('');
    setFilterToPlace('');
  };

  return (
    <>
      <Helmet>
        <title>Route List | Dashboard</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Route List"
          links={[{ name: 'Dashboard', href: PATH_DASHBOARD.root }, { name: 'Route List' }]}
          action={
            <Button
              component={RouterLink}
              to={PATH_DASHBOARD.route.new}
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              New Route
            </Button>
          }
        />

        <Card>
          <RouteTableToolbar
            filterRouteName={filterRouteName}
            filterFromPlace={filterFromPlace}
            filterToPlace={filterToPlace}
            onFilterRouteName={handleFilterRouteName}
            onFilterFromPlace={handleFilterFromPlace}
            onFilterToPlace={handleFilterToPlace}
            isFiltered={isFiltered}
            onResetFilter={handleResetFilter}
          />

          <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
            <Scrollbar>
              <Table size={dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
                <TableHeadCustom
                  order={order}
                  orderBy={orderBy}
                  headLabel={routeConfig}
                  onSort={onSort}
                />

                <TableBody>
                  {(isLoading ? [...Array(rowsPerPage)] : dataFiltered)
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) =>
                      row ? (
                        <RouteListRow
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

function applyFilter({ inputData, comparator, filterRouteName, filterFromPlace, filterToPlace }) {
  let filteredData = [...inputData];

  if (filterRouteName) {
    filteredData = filteredData.filter((route) =>
      route.routeName.toLowerCase().includes(filterRouteName.toLowerCase())
    );
  }

  if (filterFromPlace) {
    filteredData = filteredData.filter((route) =>
      route.fromPlace.toLowerCase().includes(filterFromPlace.toLowerCase())
    );
  }

  if (filterToPlace) {
    filteredData = filteredData.filter((route) =>
      route.toPlace.toLowerCase().includes(filterToPlace.toLowerCase())
    );
  }

  return filteredData.sort(comparator);
}
