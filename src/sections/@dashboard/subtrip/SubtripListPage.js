import { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Card, Table, Button, TableBody, Container, TableContainer, Grid } from '@mui/material';
import { paramCase } from 'change-case';
import { useDispatch, useSelector } from '../../../redux/store';
import { fetchSubtrips, deleteSubtrip } from '../../../redux/slices/subtrip';
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
import SubtripListRow from './SubtripListRow';
import SubtripTableToolbar from './SubtripTableToolbar';
import { subtripConfig } from './SubtripTableConfig';
import Iconify from '../../../components/iconify/Iconify';

export default function SubtripList() {
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
    defaultOrderBy: 'routeCd',
  });

  const { themeStretch } = useSettingsContext();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { subtrips, isLoading } = useSelector((state) => state.subtrip);
  const [tableData, setTableData] = useState([]);
  const [filterCustomerId, setFilterCustomerId] = useState('');
  const [filterInvoiceNo, setFilterInvoiceNo] = useState('');

  useEffect(() => {
    dispatch(fetchSubtrips());
  }, [dispatch]);

  useEffect(() => {
    if (subtrips.length) {
      setTableData(subtrips);
    }
  }, [subtrips]);

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(order, orderBy),
    filterCustomerId,
    filterInvoiceNo,
  });

  const dataInPage = dataFiltered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const denseHeight = dense ? 60 : 80;

  const isFiltered = filterCustomerId !== '' || filterInvoiceNo !== '';

  const isNotFound =
    (!dataFiltered.length && !!filterCustomerId) ||
    (!isLoading && !dataFiltered.length && isFiltered);

  const handleFilterCustomerId = (event) => {
    setPage(0);
    setFilterCustomerId(event.target.value);
  };

  const handleFilterInvoiceNo = (event) => {
    setPage(0);
    setFilterInvoiceNo(event.target.value);
  };

  const handleDeleteRow = (id) => {
    dispatch(deleteSubtrip(id));
  };

  const handleEditRow = (id) => {
    navigate(PATH_DASHBOARD.subtrip.edit(paramCase(id)));
  };

  const handleResetFilter = () => {
    setFilterCustomerId('');
    setFilterInvoiceNo('');
  };

  return (
    <>
      <Helmet>
        <title>Subtrip List | Dashboard</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Subtrip List"
          links={[{ name: 'Dashboard', href: PATH_DASHBOARD.root }, { name: 'Subtrip List' }]}
          action={
            <Button
              component={RouterLink}
              // todo
              to={PATH_DASHBOARD.subtrip.new('123')}
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              New Subtrip
            </Button>
          }
        />
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <SubtripTableToolbar
                filterCustomerId={filterCustomerId}
                filterInvoiceNo={filterInvoiceNo}
                onFilterCustomerId={handleFilterCustomerId}
                onFilterInvoiceNo={handleFilterInvoiceNo}
                isFiltered={isFiltered}
                onResetFilter={handleResetFilter}
              />

              <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
                <Scrollbar>
                  <Table size={dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
                    <TableHeadCustom
                      order={order}
                      orderBy={orderBy}
                      headLabel={subtripConfig}
                      onSort={onSort}
                    />

                    <TableBody>
                      {(isLoading ? [...Array(rowsPerPage)] : dataFiltered)
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row, index) =>
                          row ? (
                            <SubtripListRow
                              key={row._id}
                              row={row}
                              selected={selected.includes(row._id)}
                              onDeleteRow={() => handleDeleteRow(row._id)}
                              onEditRow={() => handleEditRow(row._id)}
                            />
                          ) : (
                            !isNotFound && (
                              <TableSkeleton key={index} sx={{ height: denseHeight }} />
                            )
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
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

// ----------------------------------------------------------------------

function applyFilter({ inputData, comparator, filterCustomerId, filterInvoiceNo }) {
  let filteredData = [...inputData];

  if (filterCustomerId) {
    filteredData = filteredData.filter((subtrip) =>
      subtrip.customerId.toLowerCase().includes(filterCustomerId.toLowerCase())
    );
  }

  if (filterInvoiceNo) {
    filteredData = filteredData.filter((subtrip) =>
      subtrip.invoiceNo.toLowerCase().includes(filterInvoiceNo.toLowerCase())
    );
  }

  return filteredData.sort(comparator);
}
