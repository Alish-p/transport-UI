import { Helmet } from 'react-helmet-async';
import { Container } from '@mui/material';

import CustomerNewForm from './CustomerNewForm'; // Import the new customer form component
import { useSettingsContext } from '../../../components/settings';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
import { PATH_DASHBOARD } from '../../../routes/paths';

export default function CustomerCreatePage() {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Helmet>
        <title>Add New Customer</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Add New Customer"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Customer List', href: PATH_DASHBOARD.customer.list },
            { name: 'Add New Customer' },
          ]}
        />

        <CustomerNewForm />
      </Container>
    </>
  );
}
