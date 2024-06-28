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
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import IconButton from '@mui/material/IconButton';
import TableContainer from '@mui/material/TableContainer';

// _mock

import { paramCase } from 'change-case';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import TripTableRow from './trip-table-row';
import TripTableToolbar from './trip-table-toolbar';
import TripTableFiltersResult from './trip-table-filters-result';
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
import TripAnalytic from './trip-analytic';
import { deleteTrip, fetchTrips } from '../../../../redux/slices/trip';
import { exportToExcel } from '../../../../utils/ExportToExcel';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'vehicleNo', label: 'Vehicle Number & ID' },
  { id: 'driverName', label: 'Driver Name' },
  { id: 'tripStatus', label: 'Trip Status' },
  { id: 'fromDate', label: 'From Date' },
  { id: 'toDate', label: 'To Date' },
  { id: 'remarks', label: 'Remarks' },
  { id: '' },
];

const defaultFilters = {
  tripNo: '',
  driver: '',
  vehicleNo: '',
  tripStatus: 'all',
  fromDate: null,
  endDate: null,
};

// ----------------------------------------------------------------------

export default function TripListView() {
  const theme = useTheme();
  const settings = useSettingsContext();
  const router = useRouter();
  const table = useTable({ defaultOrderBy: 'createDate' });
  const confirm = useBoolean();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [filters, setFilters] = useState(defaultFilters);

  const dateError = isDateError(filters.fromDate, filters.endDate);

  useEffect(() => {
    dispatch(fetchTrips());
  }, [dispatch]);

  const { trips, isLoading } = useSelector((state) => state.trip);

  useEffect(() => {
    if (trips.length) {
      setTableData(trips);
    }
  }, [trips]);

  const [tableData, setTableData] = useState([]);

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
    filters,
    dateError,
  });

  const denseHeight = table.dense ? 56 : 76;

  const canReset =
    !!filters.vehicleNo ||
    !!filters.tripNo ||
    !!filters.driver ||
    filters.tripStatus !== 'all' ||
    (!!filters.fromDate && !!filters.endDate);

  const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;

  const getTripLength = (tripStatus) =>
    tableData.filter((item) => item.tripStatus === tripStatus).length;

  const getTotalAmount = (tripStatus) =>
    sumBy(
      tableData.filter((item) => item.tripStatus === tripStatus),
      'totalAmount'
    );

  const getPercentByTripStatus = (tripStatus) =>
    (getTripLength(tripStatus) / tableData.length) * 100;

  const TABS = [
    { value: 'all', label: 'All', color: 'default', count: tableData.length },
    { value: 'billed', label: 'Billed', color: 'success', count: getTripLength('billed') },
    { value: 'pending', label: 'Pending', color: 'error', count: getTripLength('pending') },
  ];

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
    dispatch(deleteTrip(id));
  };

  const handleEditRow = (id) => {
    navigate(PATH_DASHBOARD.trip.edit(paramCase(id)));
  };
  const handleDeleteRows = useCallback(() => {}, []);

  const handleViewRow = useCallback(
    (id) => {
      router.push(PATH_DASHBOARD.trip.detail(id));
    },
    [router]
  );

  const handleFilterTripStatus = useCallback(
    (event, newValue) => {
      handleFilters('tripStatus', newValue);
    },
    [handleFilters]
  );

  const handleResetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  return (
    <>
      <Container maxWidth={settings.themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Trip List"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Trip',
              href: PATH_DASHBOARD.trip.root,
            },
            {
              name: 'Trip List',
            },
          ]}
          action={
            <Button
              component={RouterLink}
              href={PATH_DASHBOARD.trip.new}
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
            >
              New Trip
            </Button>
          }
          sx={{
            mb: { xs: 3, md: 5 },
          }}
        />

        {/* Analytics Section */}
        <Card
          sx={{
            mb: { xs: 3, md: 5 },
          }}
        >
          <Scrollbar>
            <Stack
              direction="row"
              divider={<Divider orientation="vertical" flexItem sx={{ borderStyle: 'dashed' }} />}
              sx={{ py: 2 }}
            >
              <TripAnalytic
                title="All"
                total={tableData.length}
                percent={100}
                price={sumBy(tableData, 'totalAmount')}
                icon="solar:bill-list-bold-duotone"
                color={theme.palette.info.main}
              />

              <TripAnalytic
                title="Billed"
                total={getTripLength('billed')}
                percent={getPercentByTripStatus('billed')}
                price={getTotalAmount('billed')}
                icon="solar:file-check-bold-duotone"
                color={theme.palette.success.main}
              />

              <TripAnalytic
                title="Pending"
                total={getTripLength('pending')}
                percent={getPercentByTripStatus('pending')}
                price={getTotalAmount('pending')}
                icon="solar:sort-by-time-bold-duotone"
                color={theme.palette.warning.main}
              />
            </Stack>
          </Scrollbar>
        </Card>

        {/* Table Section */}
        <Card>
          {/* filtering Tabs */}
          <Tabs
            value={filters.tripStatus}
            onChange={handleFilterTripStatus}
            sx={{
              px: 2.5,
              boxShadow: `inset 0 -2px 0 0 ${alpha(theme.palette.grey[500], 0.08)}`,
            }}
          >
            {TABS.map((tab) => (
              <Tab
                key={tab.value}
                value={tab.value}
                label={tab.label}
                iconPosition="end"
                icon={
                  <Label
                    variant={
                      ((tab.value === 'all' || tab.value === filters.vehicleType) && 'filled') ||
                      'soft'
                    }
                    color={tab.color}
                  >
                    {tab.count}
                  </Label>
                }
              />
            ))}
          </Tabs>

          <TripTableToolbar filters={filters} onFilters={handleFilters} tableData={dataFiltered} />

          {canReset && (
            <TripTableFiltersResult
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
              rowCount={tableData.length}
              onSelectAllRows={(checked) =>
                table.onSelectAllRows(
                  checked,
                  tableData.map((row) => row._id)
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
                  rowCount={tableData.length}
                  numSelected={table.selected.length}
                  onSort={table.onSort}
                  onSelectAllRows={(checked) =>
                    table.onSelectAllRows(
                      checked,
                      tableData.map((row) => row._id)
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
                      <TripTableRow
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
function applyFilter({ inputData, comparator, filters, dateError }) {
  const { vehicleNo, tripNo, driver, tripStatus, fromDate, endDate } = filters;

  const stabilizedThis = inputData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (driver) {
    inputData = inputData.filter(
      (record) =>
        record.driverId &&
        record.driverId.driverName &&
        record.driverId.driverName.toLowerCase().indexOf(driver.toLowerCase()) !== -1
    );
  }

  if (vehicleNo) {
    inputData = inputData.filter(
      (record) =>
        record.vehicleId &&
        record.vehicleId.vehicleNo &&
        record.vehicleId.vehicleNo.toLowerCase().indexOf(vehicleNo.toLowerCase()) !== -1
    );
  }
  if (tripNo) {
    inputData = inputData.filter(
      (record) => record._id && record._id.toLowerCase().indexOf(tripNo.toLowerCase()) !== -1
    );
  }

  if (tripStatus !== 'all') {
    inputData = inputData.filter((record) => record.tripStatus === tripStatus);
  }
  if (!dateError) {
    if (fromDate && endDate) {
      inputData = inputData.filter(
        (trip) =>
          fTimestamp(trip.fromDate) >= fTimestamp(fromDate) &&
          fTimestamp(trip.fromDate) <= fTimestamp(endDate)
      );
    }
  }

  return inputData;
}
