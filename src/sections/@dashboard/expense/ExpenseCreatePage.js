import { Helmet } from 'react-helmet-async';
import { Container } from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import ExpenseNewForm from './ExpenseNewForm';
import { useSettingsContext } from '../../../components/settings';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
import { PATH_DASHBOARD } from '../../../routes/paths';
import { fetchSubtrips } from '../../../redux/slices/subtrip';

export default function NewExpensePage() {
  const { themeStretch } = useSettingsContext();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSubtrips());
  }, [dispatch]);

  const { subtrips, isLoading } = useSelector((state) => state.subtrip);

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

        <ExpenseNewForm subtrips={subtrips} />
      </Container>
    </>
  );
}
