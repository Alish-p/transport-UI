import sumBy from 'lodash/sumBy';
import { useState, useCallback, useEffect } from 'react';
// @mui
import { useTheme, alpha } from '@mui/material/styles';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import IconButton from '@mui/material/IconButton';
import TableContainer from '@mui/material/TableContainer';

// _mock

import { paramCase } from 'change-case';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import RouteTableRow from './route-table-row';
import RouteTableToolbar from './route-table-toolbar';
import RouteTableFiltersResult from './route-table-filters-result';
import { PATH_DASHBOARD } from '../../../../routes/paths';
import { useRouter } from '../../../../hooks/useRouter';
import RouterLink from '../../../../routes/components/router-link';
import { useBoolean } from '../../../../hooks/useBoolean';
import { fTimestamp } from '../../../../utils/formatTime';
import Label from '../../../../components/label/Label';
import Iconify from '../../../../components/iconify/Iconify';
import Scrollbar from '../../../../components/scrollbar/Scrollbar';
import ConfirmDialog from '../../../../components/confirm-dialog/ConfirmDialog';
import { useSettingsContext } from '../../../../components/settings';
import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs/CustomBreadcrumbs';
import {
  useTable,
  getComparator,
  emptyRows,
  TableNoData,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedAction,
  TablePaginationCustom,
} from '../../../../components/table';
import { isDateError } from '../../../../components/date-range-picker/utils';
import RouteAnalytic from './route-analytic';
import { deleteRoute, fetchRoutes } from '../../../../redux/slices/route';
import { exportToExcel } from '../../../../utils/ExportToExcel';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'routeName', label: 'Route Name', type: 'string' },
  { id: 'fromPlace', label: 'From Place', type: 'string' },
  { id: 'toPlace', label: 'To Place', type: 'string' },
  { id: 'tollAmt', label: 'Toll Amount', type: 'number' },
  { id: 'advanceAmt', label: 'Advance Amount', type: 'number' },
  { id: 'diesel', label: 'Diesel', type: 'number' },
  { id: 'adBlue', label: 'AdBlue', type: 'number' },
  { id: 'noOfDays', label: 'Number of Days', type: 'number' },
  { id: 'driverSalary', label: 'Driver Salary', type: 'number' },
  { id: 'tripType', label: 'Trip Type', type: 'string' },
  { id: 'fixMilage', label: 'Fixed Mileage', type: 'number' },
  { id: 'performanceMilage', label: 'Performance Mileage', type: 'number' },
  { id: 'ratePerTon', label: 'Rate Per Ton', type: 'number' },
  { id: 'salary', label: 'Salary', type: 'number' },
  { id: 'salaryPercentage', label: 'Salary Percentage', type: 'number' },
  { id: 'distance', label: 'Distance', type: 'number' },
  { id: 'validFromDate', label: 'Valid From Date', type: 'date' },
  { id: 'transportType', label: 'Transport Type', type: 'string' },
  { id: '' },
];

const defaultFilters = {
  routeName: '',
  fromPlace: '',
  toPlace: '',
};

// ----------------------------------------------------------------------

export default function VehicleListView() {
  const theme = useTheme();
  const settings = useSettingsContext();
  const router = useRouter();
  const table = useTable({ defaultOrderBy: 'createDate' });
  const confirm = useBoolean();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [filters, setFilters] = useState(defaultFilters);

  useEffect(() => {
    dispatch(fetchRoutes());
  }, [dispatch]);

  const { routes, isLoading } = useSelector((state) => state.route);

  useEffect(() => {
    if (routes.length) {
      setTableData(routes);
    }
  }, [routes]);

  const [tableData, setTableData] = useState([]);

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
    filters,
  });

  const denseHeight = table.dense ? 56 : 76;

  const canReset = !!filters.routeName || !!filters.fromPlace || !!filters.toPlace;

  const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;

  const handleFilters = useCallback(
    (name, value) => {
      table.onResetPage();
      setFilters((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    },
    [table]
  );

  const handleDeleteRow = (id) => {
    dispatch(deleteRoute(id));
  };

  const handleEditRow = (id) => {
    navigate(PATH_DASHBOARD.route.edit(paramCase(id)));
  };

  const handleDeleteRows = useCallback(() => {}, []);

  const handleViewRow = useCallback(
    (id) => {
      router.push(PATH_DASHBOARD.route.details(id));
    },
    [router]
  );

  const handleResetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  return (
    <>
      <Container maxWidth={settings.themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Route List"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Route',
              href: PATH_DASHBOARD.route.root,
            },
            {
              name: 'Route List',
            },
          ]}
          action={
            <Button
              component={RouterLink}
              href={PATH_DASHBOARD.route.new}
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
            >
              New Route
            </Button>
          }
          sx={{
            mb: { xs: 3, md: 5 },
          }}
        />

        {/* Table Section */}
        <Card>
          <RouteTableToolbar filters={filters} onFilters={handleFilters} tableData={dataFiltered} />

          {canReset && (
            <RouteTableFiltersResult
              filters={filters}
              onFilters={handleFilters}
              onResetFilters={handleResetFilters}
              results={dataFiltered.length}
              sx={{ p: 2.5, pt: 0 }}
            />
          )}

          <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
            <TableSelectedAction
              dense={table.dense}
              numSelected={table.selected.length}
              rowCount={dataFiltered.length}
              onSelectAllRows={(checked) =>
                table.onSelectAllRows(
                  checked,
                  dataFiltered.map((row) => row._id)
                )
              }
              action={
                <Stack direction="row">
                  <Tooltip title="Sent">
                    <IconButton color="primary">
                      <Iconify icon="iconamoon:send-fill" />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Download">
                    <IconButton
                      color="primary"
                      onClick={() => {
                        const selectedRows = tableData.filter(({ _id }) =>
                          table.selected.includes(_id)
                        );
                        exportToExcel(selectedRows, 'filtered');
                      }}
                    >
                      <Iconify icon="eva:download-outline" />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Print">
                    <IconButton color="primary">
                      <Iconify icon="solar:printer-minimalistic-bold" />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Delete">
                    <IconButton color="primary" onClick={confirm.onTrue}>
                      <Iconify icon="solar:trash-bin-trash-bold" />
                    </IconButton>
                  </Tooltip>
                </Stack>
              }
            />

            <Scrollbar>
              <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 800 }}>
                <TableHeadCustom
                  order={table.order}
                  orderBy={table.orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={dataFiltered.length}
                  numSelected={table.selected.length}
                  onSort={table.onSort}
                  onSelectAllRows={(checked) =>
                    table.onSelectAllRows(
                      checked,
                      dataFiltered.map((row) => row._id)
                    )
                  }
                />
                <TableBody>
                  {dataFiltered
                    .slice(
                      table.page * table.rowsPerPage,
                      table.page * table.rowsPerPage + table.rowsPerPage
                    )
                    .map((row) => (
                      <RouteTableRow
                        key={row._id}
                        row={row}
                        selected={table.selected.includes(row._id)}
                        onSelectRow={() => table.onSelectRow(row._id)}
                        onViewRow={() => handleViewRow(row._id)}
                        onEditRow={() => handleEditRow(row._id)}
                        onDeleteRow={() => handleDeleteRow(row._id)}
                      />
                    ))}

                  <TableEmptyRows
                    height={denseHeight}
                    emptyRows={emptyRows(table.page, table.rowsPerPage, tableData.length)}
                  />

                  <TableNoData notFound={notFound} />
                </TableBody>
              </Table>
            </Scrollbar>
          </TableContainer>

          <TablePaginationCustom
            count={dataFiltered.length}
            page={table.page}
            rowsPerPage={table.rowsPerPage}
            onPageChange={table.onChangePage}
            onRowsPerPageChange={table.onChangeRowsPerPage}
            //
            dense={table.dense}
            onChangeDense={table.onChangeDense}
          />
        </Card>
      </Container>

      {/* Delete Confirmations dialogue */}
      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        content={
          <>
            Are you sure want to delete <strong> {table.selected.length} </strong> items?
          </>
        }
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleDeleteRows();
              confirm.onFalse();
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

// filtering logic
function applyFilter({ inputData, comparator, filters }) {
  const { routeName, fromPlace, toPlace } = filters;

  const stabilizedThis = inputData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (routeName) {
    inputData = inputData.filter(
      (record) =>
        record.routeName && record.routeName.toLowerCase().indexOf(routeName.toLowerCase()) !== -1
    );
  }

  if (fromPlace) {
    inputData = inputData.filter(
      (record) =>
        record.fromPlace && record.fromPlace.toLowerCase().indexOf(fromPlace.toLowerCase()) !== -1
    );
  }

  if (toPlace) {
    inputData = inputData.filter(
      (record) =>
        record.toPlace && record.toPlace.toLowerCase().indexOf(toPlace.toLowerCase()) !== -1
    );
  }

  return inputData;
}
