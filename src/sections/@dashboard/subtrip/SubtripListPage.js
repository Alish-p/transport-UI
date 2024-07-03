import { useState, useEffect, useCallback } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { alpha } from '@mui/material/styles';
import {
  Card,
  Table,
  Button,
  TableBody,
  Container,
  TableContainer,
  Grid,
  Tab,
  Tabs,
} from '@mui/material';
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

const STATUS_OPTIONS = [
  { value: 'all', label: 'All' },
  { value: 'loaded', label: 'Loaded' },
  { value: 'in-queue', label: 'In Queue' },
  { value: 'received', label: 'Recieved' },
  { value: 'error', label: 'Error' },
  { value: 'closed', label: 'Closed' },
  { value: 'billed', label: 'Billed' },
];

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
  const [filterId, setFilterId] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

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
    filterId,
    filterStatus,
  });

  const denseHeight = dense ? 60 : 80;

  const isFiltered = filterCustomerId !== '' || filterId !== '' || filterStatus !== 'all';

  const isNotFound =
    (!dataFiltered.length && !!filterCustomerId) ||
    (!isLoading && !dataFiltered.length && isFiltered);

  const handleFilterCustomerId = (event) => {
    setPage(0);
    setFilterCustomerId(event.target.value);
  };

  const handleFilterId = (event) => {
    setPage(0);
    setFilterId(event.target.value);
  };

  const handleFilterStatus = (event, newValue) => {
    setPage(0);
    setFilterStatus(newValue);
  };

  const handleDeleteRow = (id) => {
    dispatch(deleteSubtrip(id));
  };

  const handleEditRow = (id) => {
    navigate(PATH_DASHBOARD.subtrip.edit(paramCase(id)));
  };

  const handleResetFilter = () => {
    setFilterCustomerId('');
    setFilterId('');
    setFilterStatus('all');
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
              to={PATH_DASHBOARD.subtrip.new}
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
              <Tabs
                value={filterStatus}
                onChange={handleFilterStatus}
                sx={{
                  px: 2.5,
                  boxShadow: (theme) => `inset 0 -2px 0 0 ${alpha(theme.palette.grey[500], 0.08)}`,
                }}
              >
                {STATUS_OPTIONS.map((tab) => (
                  <Tab key={tab.value} value={tab.value} label={tab.label} />
                ))}
              </Tabs>
              <SubtripTableToolbar
                filterCustomerId={filterCustomerId}
                filterId={filterId}
                onFilterCustomerId={handleFilterCustomerId}
                onFilterId={handleFilterId}
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

function applyFilter({ inputData, comparator, filterCustomerId, filterId, filterStatus }) {
  let filteredData = [...inputData];

  if (filterCustomerId) {
    filteredData = filteredData.filter((subtrip) =>
      subtrip.customerId.toLowerCase().includes(filterCustomerId.toLowerCase())
    );
  }

  if (filterId) {
    filteredData = filteredData.filter((subtrip) =>
      subtrip._id.toLowerCase().includes(filterId.toLowerCase())
    );
  }

  if (filterStatus !== 'all') {
    filteredData = filteredData.filter(
      (subtrip) => subtrip.subtripStatus.toLowerCase() === filterStatus.toLowerCase()
    );
  }

  return filteredData.sort(comparator);
}
