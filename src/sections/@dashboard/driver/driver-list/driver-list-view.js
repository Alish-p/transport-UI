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
import InvoiceTableRow from './driver-table-row';
import DriverTableToolbar from './driver-table-toolbar';
import InvoiceTableFiltersResult from './driver-table-filters-result';
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
import DriverAnalytics from './driver-analytic';
import { _invoices } from '../../../../_mock/arrays';
import { deleteDriver, fetchDrivers } from '../../../../redux/slices/driver';
import { exportToExcel } from '../../../../utils/ExportToExcel';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'driverName', name: 'driverName', label: 'Driver Name' },
  { id: 'driverCellNo', name: 'driverCellNo', label: 'Phone No' },

  {
    id: 'permanentAddress',
    name: 'permanentAddress',
    label: 'Address',
  },
  { id: 'experience', name: 'experience', label: 'Experience' },

  { id: 'licenseTo', name: 'licenseTo', label: 'Expiry Date' },
  { id: 'aadharNo', name: 'aadharNo', label: 'Adhar Number' },
  { id: 'status', name: 'status', label: 'Status' },
  { id: '' },
];

const defaultFilters = {
  driverName: '',
  driverLicenceNo: '',
  driverCellNo: '',
  status: 'all',
};

// ----------------------------------------------------------------------

export default function DriverListView() {
  const theme = useTheme();
  const settings = useSettingsContext();
  const router = useRouter();
  const table = useTable({ defaultOrderBy: 'createDate' });
  const confirm = useBoolean();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [filters, setFilters] = useState(defaultFilters);

  useEffect(() => {
    dispatch(fetchDrivers());
  }, [dispatch]);

  const { drivers, isLoading } = useSelector((state) => state.driver);

  const today = new Date();

  useEffect(() => {
    if (drivers.length) {
      const statusMappedDrivers = drivers.map((driver) => {
        const licenseToDate = new Date(driver.licenseTo);
        const status = licenseToDate > today ? 'valid' : 'expired';

        return {
          ...driver,
          status,
        };
      });

      setTableData(statusMappedDrivers);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drivers]);

  const [tableData, setTableData] = useState([]);

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
    filters,
  });

  const denseHeight = table.dense ? 56 : 76;

  const canReset =
    !!filters.driverName ||
    !!filters.driverLicenceNo ||
    !!filters.driverCellNo ||
    filters.status !== 'all';

  const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;

  const getDriverLength = (status) => tableData.filter((item) => item.status === status).length;

  const getTotalAmount = (status) =>
    sumBy(
      tableData.filter((item) => item.status === status),
      'totalAmount'
    );

  const getPercentByStatus = (status) => (getDriverLength(status) / tableData.length) * 100;

  const TABS = [
    { value: 'all', label: 'All', color: 'default', count: tableData.length },
    { value: 'valid', label: 'Valid', color: 'success', count: getDriverLength('valid') },
    { value: 'expired', label: 'Expired', color: 'error', count: getDriverLength('expired') },
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
    dispatch(deleteDriver(id));
  };

  const handleEditRow = (id) => {
    navigate(PATH_DASHBOARD.driver.edit(paramCase(id)));
  };
  const handleDeleteRows = useCallback(() => {}, []);

  const handleViewRow = useCallback(
    (id) => {
      router.push(PATH_DASHBOARD.driver.details(id));
    },
    [router]
  );

  const handleFilterStatus = useCallback(
    (event, newValue) => {
      handleFilters('status', newValue);
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
          heading="Driver List"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Driver',
              href: PATH_DASHBOARD.driver.root,
            },
            {
              name: 'Driver List',
            },
          ]}
          action={
            <Button
              component={RouterLink}
              href={PATH_DASHBOARD.driver.new}
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
            >
              New Driver
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
              <DriverAnalytics
                title="Total"
                total={tableData.length}
                percent={100}
                price={sumBy(tableData, 'totalAmount')}
                icon="solar:bill-list-bold-duotone"
                color={theme.palette.info.main}
              />

              <DriverAnalytics
                title="Valid"
                total={getDriverLength('valid')}
                percent={getPercentByStatus('valid')}
                price={getTotalAmount('valid')}
                icon="solar:file-check-bold-duotone"
                color={theme.palette.success.main}
              />

              <DriverAnalytics
                title="Expired"
                total={getDriverLength('expired')}
                percent={getPercentByStatus('expired')}
                price={getTotalAmount('expired')}
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
            value={filters.status}
            onChange={handleFilterStatus}
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
                      ((tab.value === 'all' || tab.value === filters.status) && 'filled') || 'soft'
                    }
                    color={tab.color}
                  >
                    {tab.count}
                  </Label>
                }
              />
            ))}
          </Tabs>

          <DriverTableToolbar
            filters={filters}
            onFilters={handleFilters}
            tableData={dataFiltered}
          />

          {canReset && (
            <InvoiceTableFiltersResult
              filters={filters}
              onFilters={handleFilters}
              //
              onResetFilters={handleResetFilters}
              //
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
                  rowCount={dataFiltered.length}
                  numSelected={table.selected.length}
                  onSort={table.onSort}
                  onSelectAllRows={(checked) =>
                    table.onSelectAllRows(
                      checked
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
                      <InvoiceTableRow
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
  const { driverName, driverLicenceNo, driverCellNo, status } = filters;

  const stabilizedThis = inputData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (driverName) {
    inputData = inputData.filter(
      (record) =>
        record.driverName &&
        record.driverName.toLowerCase().indexOf(driverName.toLowerCase()) !== -1
    );
  }

  if (driverLicenceNo) {
    inputData = inputData.filter(
      (record) =>
        record.driverLicenceNo &&
        record.driverLicenceNo.toLowerCase().indexOf(driverLicenceNo.toLowerCase()) !== -1
    );
  }

  if (driverCellNo) {
    inputData = inputData.filter(
      (record) =>
        record.driverCellNo &&
        record.driverCellNo.toLowerCase().indexOf(driverCellNo.toLowerCase()) !== -1
    );
  }

  if (status !== 'all') {
    inputData = inputData.filter((record) => record.status === status);
  }

  return inputData;
}
