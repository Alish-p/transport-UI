import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  Card,
  Table,
  Button,
  TableBody,
  Container,
  TableContainer,
  Grid,
  TableRow,
  TableCell,
  Typography,
  TableHead,
} from '@mui/material';
import { paramCase } from 'change-case';
import Scrollbar from '../../../components/scrollbar';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
import SubtripListRow from './basic-subtrip-table-row';
import { subtripConfig } from './basic-subtrip-table-config';
import Iconify from '../../../components/iconify/Iconify';
import { useSettingsContext } from '../../../components/settings';
import { PATH_DASHBOARD } from '../../../routes/paths';

SimpleSubtripList.propTypes = {
  subtrips: PropTypes.array.isRequired,
};

export default function SimpleSubtripList({ subtrips }) {
  const { themeStretch } = useSettingsContext();
  const navigate = useNavigate();

  const handleDeleteRow = (id) => {
    // dispatch(deleteSubtrip(id)); // Add your delete logic here
  };

  const handleEditRow = (id) => {
    navigate(PATH_DASHBOARD.subtrip.edit(paramCase(id)));
  };

  return (
    <>
      <Helmet>
        <title>Subtrip List | Dashboard</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
                <Scrollbar>
                  <Table size="medium" sx={{ minWidth: 960 }}>
                    <TableHeadCustom headLabel={subtripConfig} />

                    <TableBody>
                      {subtrips.map((row) => (
                        <SubtripListRow
                          key={row._id}
                          row={row}
                          onDeleteRow={() => handleDeleteRow(row._id)}
                          onEditRow={() => handleEditRow(row._id)}
                        />
                      ))}

                      {subtrips.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={6}>
                            <Typography align="center">No subtrips found.</Typography>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </Scrollbar>
              </TableContainer>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

// ----------------------------------------------------------------------

function TableHeadCustom({ headLabel }) {
  return (
    <TableHead>
      <TableRow>
        {headLabel.map((headCell) => (
          <TableCell key={headCell.id} align={headCell.alignRight ? 'right' : 'left'}>
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

TableHeadCustom.propTypes = {
  headLabel: PropTypes.array.isRequired,
};
