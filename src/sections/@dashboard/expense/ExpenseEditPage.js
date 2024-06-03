import { Helmet } from 'react-helmet-async';
import { paramCase } from 'change-case';
import { useParams } from 'react-router-dom';
import { Container } from '@mui/material';
import { useSelector } from 'react-redux';
import { PATH_DASHBOARD } from '../../../routes/paths';
import { useSettingsContext } from '../../../components/settings';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
import ExpenseForm from './ExpenseNewForm';

// ----------------------------------------------------------------------

export default function ExpenseEditPage() {
  const { themeStretch } = useSettingsContext();

  const { id } = useParams();

  const currentExpense = useSelector((state) =>
    state.expense.expenses.find((expense) => paramCase(expense._id) === id)
  );

  return (
    <>
      <Helmet>
        <title> Expense: Edit Expense | Minimal UI</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Edit Expense"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Expenses List',
              href: PATH_DASHBOARD.expense.list,
            },
            { name: currentExpense?.expenseType },
          ]}
        />

        <ExpenseForm isEdit currentExpense={currentExpense} />
      </Container>
    </>
  );
}
