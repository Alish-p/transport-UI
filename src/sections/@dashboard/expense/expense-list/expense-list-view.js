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
import ExpenseTableRow from './expense-table-row';
import ExpenseTableToolbar from './expense-table-toolbar';
import ExpenseTableFiltersResult from './expense-table-filters-result';
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
import ExpenseAnalytic from './expense-analytic';
import { deleteExpense, fetchExpenses } from '../../../../redux/slices/expense';
import { exportToExcel } from '../../../../utils/ExportToExcel';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'vehicleId', label: 'Vehicle', type: 'string' },
  { id: 'date', label: 'Date', type: 'date' },
  { id: 'expenseType', label: 'Expense Type', type: 'string' },
  { id: 'amount', label: 'Amount', type: 'number' },
  { id: 'slipNo', label: 'Slip No', type: 'string' },
  { id: 'pumpCd', label: 'Pump Code', type: 'string' },
  { id: 'remarks', label: 'Remarks', type: 'string' },
  { id: 'dieselLtr', label: 'Diesel (Ltr)', type: 'number' },
  { id: 'paidThrough', label: 'Paid Through', type: 'string' },
  { id: 'authorisedBy', label: 'Authorised By', type: 'string' },
];

const defaultFilters = {
  vehicleNo: '',
  pump: '',
  expenseType: 'all',
  fromDate: null,
  toDate: null,
};

// ----------------------------------------------------------------------

export default function ExpenseListView() {
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
    dispatch(fetchExpenses());
  }, [dispatch]);

  const { expenses, isLoading } = useSelector((state) => state.expense);

  useEffect(() => {
    if (expenses.length) {
      setTableData(expenses);
    }
  }, [expenses]);

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
    !!filters.pump ||
    filters.expenseType !== 'all' ||
    (!!filters.fromDate && !!filters.endDate);

  const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;

  const getExpenseLength = (expenseType) =>
    tableData.filter((item) => item.expenseType === expenseType).length;

  const getTotalAmount = (expenseType) =>
    sumBy(
      tableData.filter((item) => item.expenseType === expenseType),
      'totalAmount'
    );

  const getPercentByExpenseType = (expenseType) =>
    (getExpenseLength(expenseType) / tableData.length) * 100;

  const TABS = [
    { value: 'all', label: 'All', color: 'default', count: tableData.length },
    { value: 'diesel', label: 'Diesel', color: 'primary', count: getExpenseLength('diesel') },
    { value: 'adblue', label: 'Adblue', color: 'secondary', count: getExpenseLength('adblue') },
    {
      value: 'driver-salary',
      label: 'Driver Salary',
      color: 'success',
      count: getExpenseLength('driver-salary'),
    },
    {
      value: 'trip-advance',
      label: 'Driver Advance',
      color: 'error',
      count: getExpenseLength('trip-advance'),
    },
    {
      value: 'trip-extra-advance',
      label: 'Extra Advance',
      color: 'warning',
      count: getExpenseLength('trip-extra-advance'),
    },
    {
      value: 'puncher',
      label: 'Tyre puncher',
      color: 'success',
      count: getExpenseLength('puncher'),
    },
    {
      value: 'tyre-expense',
      label: 'Tyre Expense',
      color: 'error',
      count: getExpenseLength('tyre-expense'),
    },
    { value: 'police', label: 'Police', color: 'default', count: getExpenseLength('police') },
    { value: 'rto', label: 'Rto', color: 'success', count: getExpenseLength('rto') },
    { value: 'toll', label: 'Toll', color: 'default', count: getExpenseLength('toll') },
    {
      value: 'vehicle-repair',
      label: 'Vehicle Repair',
      color: 'default',
      count: getExpenseLength('vehicle-repair'),
    },
    { value: 'other', label: 'Other', color: 'default', count: getExpenseLength('other') },
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
    dispatch(deleteExpense(id));
  };

  const handleEditRow = (id) => {
    navigate(PATH_DASHBOARD.expense.edit(paramCase(id)));
  };
  const handleDeleteRows = useCallback(() => {}, []);

  const handleViewRow = useCallback(
    (id) => {
      router.push(PATH_DASHBOARD.expense.detail(id));
    },
    [router]
  );

  const handleFilterExpenseType = useCallback(
    (event, newValue) => {
      handleFilters('expenseType', newValue);
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
          heading="Expense List"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Expense',
              href: PATH_DASHBOARD.expense.root,
            },
            {
              name: 'Expense List',
            },
          ]}
          action={
            <Button
              component={RouterLink}
              href={PATH_DASHBOARD.expense.new}
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
            >
              New Expense
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
              <ExpenseAnalytic
                title="All"
                total={tableData.length}
                percent={100}
                price={sumBy(tableData, 'totalAmount')}
                icon="solar:bill-list-bold-duotone"
                color={theme.palette.info.main}
              />

              <ExpenseAnalytic
                title="Diesel"
                total={getExpenseLength('diesel')}
                percent={getPercentByExpenseType('diesel')}
                price={getTotalAmount('diesel')}
                icon="solar:file-check-bold-duotone"
                color={theme.palette.success.main}
              />

              <ExpenseAnalytic
                title="adblue"
                total={getExpenseLength('adblue')}
                percent={getPercentByExpenseType('adblue')}
                price={getTotalAmount('adblue')}
                icon="solar:sort-by-time-bold-duotone"
                color={theme.palette.warning.main}
              />

              <ExpenseAnalytic
                title="driver-salary"
                total={getExpenseLength('driver-salary')}
                percent={getPercentByExpenseType('driver-salary')}
                price={getTotalAmount('driver-salary')}
                icon="solar:sort-by-time-bold-duotone"
                color={theme.palette.error.main}
              />
              <ExpenseAnalytic
                title="trip-advance"
                total={getExpenseLength('trip-advance')}
                percent={getPercentByExpenseType('trip-advance')}
                price={getTotalAmount('trip-advance')}
                icon="solar:sort-by-time-bold-duotone"
                color={theme.palette.text.secondary}
              />
              <ExpenseAnalytic
                title="trip-extra-advance"
                total={getExpenseLength('trip-extra-advance')}
                percent={getPercentByExpenseType('trip-extra-advance')}
                price={getTotalAmount('trip-extra-advance')}
                icon="solar:sort-by-time-bold-duotone"
                color={theme.palette.primary.main}
              />
              <ExpenseAnalytic
                title="puncher"
                total={getExpenseLength('puncher')}
                percent={getPercentByExpenseType('puncher')}
                price={getTotalAmount('puncher')}
                icon="solar:sort-by-time-bold-duotone"
                color={theme.palette.secondary.main}
              />
              <ExpenseAnalytic
                title="tyre-expense"
                total={getExpenseLength('tyre-expense')}
                percent={getPercentByExpenseType('tyre-expense')}
                price={getTotalAmount('tyre-expense')}
                icon="solar:sort-by-time-bold-duotone"
                color={theme.palette.common.white}
              />
              <ExpenseAnalytic
                title="police"
                total={getExpenseLength('police')}
                percent={getPercentByExpenseType('police')}
                price={getTotalAmount('police')}
                icon="solar:sort-by-time-bold-duotone"
                color={theme.palette.common.white}
              />
              <ExpenseAnalytic
                title="rto"
                total={getExpenseLength('rto')}
                percent={getPercentByExpenseType('rto')}
                price={getTotalAmount('rto')}
                icon="solar:sort-by-time-bold-duotone"
                color={theme.palette.common.white}
              />
              <ExpenseAnalytic
                title="toll"
                total={getExpenseLength('toll')}
                percent={getPercentByExpenseType('toll')}
                price={getTotalAmount('toll')}
                icon="solar:sort-by-time-bold-duotone"
                color={theme.palette.common.white}
              />
              <ExpenseAnalytic
                title="vehicle-repair"
                total={getExpenseLength('vehicle-repair')}
                percent={getPercentByExpenseType('vehicle-repair')}
                price={getTotalAmount('vehicle-repair')}
                icon="solar:sort-by-time-bold-duotone"
                color={theme.palette.common.white}
              />
              <ExpenseAnalytic
                title="other"
                total={getExpenseLength('other')}
                percent={getPercentByExpenseType('other')}
                price={getTotalAmount('other')}
                icon="solar:sort-by-time-bold-duotone"
                color={theme.palette.common.white}
              />
            </Stack>
          </Scrollbar>
        </Card>

        {/* Table Section */}
        <Card>
          {/* filtering Tabs */}
          <Tabs
            value={filters.expenseType}
            onChange={handleFilterExpenseType}
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
                      ((tab.value === 'all' || tab.value === filters.expenseType) && 'filled') ||
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

          <ExpenseTableToolbar
            filters={filters}
            onFilters={handleFilters}
            tableData={dataFiltered}
          />

          {canReset && (
            <ExpenseTableFiltersResult
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
                      <ExpenseTableRow
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
  const { vehicleNo, pump, expenseType, fromDate, endDate } = filters;

  const stabilizedThis = inputData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (vehicleNo) {
    inputData = inputData.filter(
      (record) =>
        record.vehicleId &&
        record.vehicleId.vehicleNo &&
        record.vehicleId.vehicleNo.toLowerCase().indexOf(vehicleNo.toLowerCase()) !== -1
    );
  }

  if (pump) {
    inputData = inputData.filter(
      (record) =>
        record.pumpCd &&
        record.pumpCd.pumpName &&
        record.pumpCd.pumpName.toLowerCase().indexOf(pump.toLowerCase()) !== -1
    );
  }

  if (expenseType !== 'all') {
    inputData = inputData.filter((record) => record.expenseType === expenseType);
  }
  if (!dateError) {
    if (fromDate && endDate) {
      inputData = inputData.filter(
        (expense) =>
          fTimestamp(expense.date) >= fTimestamp(fromDate) &&
          fTimestamp(expense.date) <= fTimestamp(endDate)
      );
    }
  }

  return inputData;
}
