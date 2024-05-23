import { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';
import { paramCase } from 'change-case';
import { Card, Table, Button, TableBody, Container, TableContainer } from '@mui/material';
import { useDispatch, useSelector } from '../../../redux/store';
import { fetchPumps } from '../../../redux/slices/pump';
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
import PumpListRow from './PumpListRow';
import PumpTableToolbar from './PumpTableToolbar';
import { pumpConfig } from './PumpTableConfig';
import Iconify from '../../../components/iconify/Iconify';

export default function PumpList() {
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
    defaultOrderBy: 'pumpName',
  });

  const { themeStretch } = useSettingsContext();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pumps, isLoading } = useSelector((state) => state.pump);
  const [tableData, setTableData] = useState([]);
  const [filterPumpName, setFilterPumpName] = useState('');
  const [filterPlaceName, setFilterPlaceName] = useState('');
  const [openConfirm, setOpenConfirm] = useState(false);

  useEffect(() => {
    dispatch(fetchPumps());
  }, [dispatch]);

  useEffect(() => {
    if (pumps.length) {
      setTableData(pumps);
    }
  }, [pumps]);

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(order, orderBy),
    filterPumpName,
    filterPlaceName,
  });

  const dataInPage = dataFiltered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const denseHeight = dense ? 60 : 80;

  const isFiltered = filterPumpName !== '' || filterPlaceName !== '';

  const isNotFound =
    (!dataFiltered.length && !!filterPumpName) ||
    (!isLoading && !dataFiltered.length && isFiltered);

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleFilterPumpName = (event) => {
    setPage(0);
    setFilterPumpName(event.target.value);
  };

  const handleFilterPlaceName = (event) => {
    setPage(0);
    setFilterPlaceName(event.target.value);
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
    navigate(PATH_DASHBOARD.pump.edit(paramCase(id)));
  };

  const handleResetFilter = () => {
    setFilterPumpName('');
    setFilterPlaceName('');
  };

  return (
    <>
      <Helmet>
        <title>Pump List | Dashboard</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Pump List"
          links={[{ name: 'Dashboard', href: PATH_DASHBOARD.root }, { name: 'Pump List' }]}
          action={
            <Button
              component={RouterLink}
              to={PATH_DASHBOARD.pump.new}
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              New Pump
            </Button>
          }
        />

        <Card>
          <PumpTableToolbar
            filterPumpName={filterPumpName}
            filterPlaceName={filterPlaceName}
            onFilterPumpName={handleFilterPumpName}
            onFilterPlaceName={handleFilterPlaceName}
            isFiltered={isFiltered}
            onResetFilter={handleResetFilter}
          />

          <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
            <Scrollbar>
              <Table size={dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
                <TableHeadCustom
                  order={order}
                  orderBy={orderBy}
                  headLabel={pumpConfig}
                  onSort={onSort}
                />

                <TableBody>
                  {(isLoading ? [...Array(rowsPerPage)] : dataFiltered)
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) =>
                      row ? (
                        <PumpListRow
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

function applyFilter({ inputData, comparator, filterPumpName, filterPlaceName }) {
  let filteredData = [...inputData];

  if (filterPumpName) {
    filteredData = filteredData.filter((pump) =>
      pump.pumpName.toLowerCase().includes(filterPumpName.toLowerCase())
    );
  }

  if (filterPlaceName) {
    filteredData = filteredData.filter((pump) =>
      pump.placeName.toLowerCase().includes(filterPlaceName.toLowerCase())
    );
  }

  return filteredData.sort(comparator);
}
