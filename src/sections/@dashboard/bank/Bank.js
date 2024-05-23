import { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';
import { paramCase } from 'change-case';
import { Card, Table, Button, TableBody, Container, TableContainer } from '@mui/material';
import { useDispatch, useSelector } from '../../../redux/store';
import { fetchBanks } from '../../../redux/slices/bank';
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
import BankListRow from './BankListRow';
import BankTableToolbar from './BankTableToolbar';
import { bankConfig } from './BankTableConfig';
import Iconify from '../../../components/iconify/Iconify';

export default function BankList() {
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
    defaultOrderBy: 'bankBranch',
  });

  const { themeStretch } = useSettingsContext();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { banks, isLoading } = useSelector((state) => state.bank);
  const [tableData, setTableData] = useState([]);
  const [filterBankBranch, setFilterBankBranch] = useState('');
  const [filterIfscCode, setFilterIfscCode] = useState('');
  const [openConfirm, setOpenConfirm] = useState(false);

  useEffect(() => {
    dispatch(fetchBanks());
  }, [dispatch]);

  useEffect(() => {
    if (banks.length) {
      setTableData(banks);
    }
  }, [banks]);

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(order, orderBy),
    filterBankBranch,
    filterIfscCode,
  });

  const dataInPage = dataFiltered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const denseHeight = dense ? 60 : 80;

  const isFiltered = filterBankBranch !== '' || filterIfscCode !== '';

  const isNotFound =
    (!dataFiltered.length && !!filterBankBranch) ||
    (!isLoading && !dataFiltered.length && isFiltered);

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleFilterBankBranch = (event) => {
    setPage(0);
    setFilterBankBranch(event.target.value);
  };

  const handleFilterIfscCode = (event) => {
    setPage(0);
    setFilterIfscCode(event.target.value);
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
    navigate(PATH_DASHBOARD.bank.edit(paramCase(id)));
  };

  const handleResetFilter = () => {
    setFilterBankBranch('');
    setFilterIfscCode('');
  };

  return (
    <>
      <Helmet>
        <title>Bank List | Dashboard</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Bank List"
          links={[{ name: 'Dashboard', href: PATH_DASHBOARD.root }, { name: 'Bank List' }]}
          action={
            <Button
              component={RouterLink}
              to={PATH_DASHBOARD.bank.new}
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill"> </Iconify>}
            >
              New Bank
            </Button>
          }
        />
        <Card>
          <BankTableToolbar
            filterBankBranch={filterBankBranch}
            filterIfscCode={filterIfscCode}
            onFilterBankBranch={handleFilterBankBranch}
            onFilterIfscCode={handleFilterIfscCode}
            isFiltered={isFiltered}
            onResetFilter={handleResetFilter}
          />

          <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
            <Scrollbar>
              <Table size={dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
                <TableHeadCustom
                  order={order}
                  orderBy={orderBy}
                  headLabel={bankConfig}
                  onSort={onSort}
                />

                <TableBody>
                  {(isLoading ? [...Array(rowsPerPage)] : dataFiltered)
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) =>
                      row ? (
                        <BankListRow
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

function applyFilter({ inputData, comparator, filterBankBranch, filterIfscCode }) {
  let filteredData = [...inputData];

  if (filterBankBranch) {
    filteredData = filteredData.filter((bank) =>
      bank.bankBranch.toLowerCase().includes(filterBankBranch.toLowerCase())
    );
  }

  if (filterIfscCode) {
    filteredData = filteredData.filter((bank) =>
      bank.ifscCode.toLowerCase().includes(filterIfscCode.toLowerCase())
    );
  }

  return filteredData.sort(comparator);
}
