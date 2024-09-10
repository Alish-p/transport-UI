import { Helmet } from 'react-helmet-async';
import { Container } from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import ExpenseNewForm from '../expense-form';
import { useSettingsContext } from '../../../../components/settings';
import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs';
import { PATH_DASHBOARD } from '../../../../routes/paths';
import { fetchSubtrips } from '../../../../redux/slices/subtrip';
import { fetchVehicles } from '../../../../redux/slices/vehicle';

export default function ExpenseCreateView() {
  const { themeStretch } = useSettingsContext();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSubtrips());
    dispatch(fetchVehicles());
  }, [dispatch]);

  const { subtrips } = useSelector((state) => state.subtrip);
  const { vehicles } = useSelector((state) => state.vehicle);

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

        <ExpenseNewForm subtrips={subtrips} vehicles={vehicles} />
      </Container>
    </>
  );
}
