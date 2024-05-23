import { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';
import { paramCase } from 'change-case';
import { Card, Table, Button, TableBody, Container, TableContainer } from '@mui/material';
import { useDispatch, useSelector } from '../../../redux/store';
import { fetchTransporters } from '../../../redux/slices/transporter';
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
import TransporterListRow from './TransporterListRow';
import TransporterTableToolbar from './TransporterTableToolbar';
import { transporterConfig } from './TransporterTableConfig';
import Iconify from '../../../components/iconify/Iconify';

export default function TransporterList() {
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
    defaultOrderBy: 'transporterName',
  });

  const { themeStretch } = useSettingsContext();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { transporters, isLoading } = useSelector((state) => state.transporter);
  const [tableData, setTableData] = useState([]);
  const [filterTransporterName, setFilterTransporterName] = useState('');
  const [filterTransporterType, setFilterTransporterType] = useState('');
  const [openConfirm, setOpenConfirm] = useState(false);

  useEffect(() => {
    dispatch(fetchTransporters());
  }, [dispatch]);

  useEffect(() => {
    if (transporters.length) {
      setTableData(transporters);
    }
  }, [transporters]);

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(order, orderBy),
    filterTransporterName,
    filterTransporterType,
  });

  const dataInPage = dataFiltered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const denseHeight = dense ? 60 : 80;

  const isFiltered = filterTransporterName !== '' || filterTransporterType !== '';

  const isNotFound =
    (!dataFiltered.length && !!filterTransporterName) ||
    (!isLoading && !dataFiltered.length && isFiltered);

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleFilterTransporterName = (event) => {
    setPage(0);
    setFilterTransporterName(event.target.value);
  };

  const handleFilterTransporterType = (event) => {
    setPage(0);
    setFilterTransporterType(event.target.value);
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
    navigate(PATH_DASHBOARD.transporter.edit(paramCase(id)));
  };

  const handleResetFilter = () => {
    setFilterTransporterName('');
    setFilterTransporterType('');
  };

  return (
    <>
      <Helmet>
        <title>Transporter List | Dashboard</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Transporter List"
          links={[{ name: 'Dashboard', href: PATH_DASHBOARD.root }, { name: 'Transporter List' }]}
          action={
            <Button
              component={RouterLink}
              to={PATH_DASHBOARD.transporter.new}
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              New Transporter
            </Button>
          }
        />

        <Card>
          <TransporterTableToolbar
            filterTransporterName={filterTransporterName}
            filterTransporterType={filterTransporterType}
            onFilterTransporterName={handleFilterTransporterName}
            onFilterTransporterType={handleFilterTransporterType}
            isFiltered={isFiltered}
            onResetFilter={handleResetFilter}
          />

          <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
            <Scrollbar>
              <Table size={dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
                <TableHeadCustom
                  order={order}
                  orderBy={orderBy}
                  headLabel={transporterConfig}
                  onSort={onSort}
                />

                <TableBody>
                  {(isLoading ? [...Array(rowsPerPage)] : dataFiltered)
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) =>
                      row ? (
                        <TransporterListRow
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

function applyFilter({ inputData, comparator, filterTransporterName, filterTransporterType }) {
  let filteredData = [...inputData];

  if (filterTransporterName) {
    filteredData = filteredData.filter((transporter) =>
      transporter.transporterName.toLowerCase().includes(filterTransporterName.toLowerCase())
    );
  }

  if (filterTransporterType) {
    filteredData = filteredData.filter((transporter) =>
      transporter.transporterType.toLowerCase().includes(filterTransporterType.toLowerCase())
    );
  }

  return filteredData.sort(comparator);
}
