import { Helmet } from 'react-helmet-async';
import { Container } from '@mui/material';

import ExpenseNewForm from './ExpenseNewForm'; // Import the new expense form component
import { useSettingsContext } from '../../../components/settings';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
import { PATH_DASHBOARD } from '../../../routes/paths';

export default function NewExpensePage() {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Helmet>
        <title>Add New Expense</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Add New Expense"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Expenses List', href: PATH_DASHBOARD.expense.list },
            { name: 'Add New Expense' },
          ]}
        />

        <ExpenseNewForm />
      </Container>
    </>
  );
}
