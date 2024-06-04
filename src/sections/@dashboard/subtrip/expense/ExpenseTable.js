// ExpenseListTable.js
import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import ExpenseListRow from './ExpenseTableListRow';
import { expenseTableConfig } from './ExpenseTableConfig';

// ----------------------------------------------------------------------

ExpenseListTable.propTypes = {
  expenses: PropTypes.array.isRequired,
  onDeleteRow: PropTypes.func.isRequired,
  onEditRow: PropTypes.func.isRequired,
};

export default function ExpenseListTable({ expenses, onDeleteRow, onEditRow }) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {expenseTableConfig.map((config) => (
              <TableCell key={config.id} align={config.type === 'number' ? 'right' : 'left'}>
                {config.label}
              </TableCell>
            ))}
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {expenses.map((expense) => (
            <ExpenseListRow
              key={expense._id}
              row={expense}
              onDeleteRow={() => onDeleteRow(expense._id)}
              onEditRow={() => onEditRow(expense)}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
