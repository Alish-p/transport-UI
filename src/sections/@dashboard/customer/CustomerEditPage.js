import { Helmet } from 'react-helmet-async';
import { paramCase } from 'change-case';
import { useParams } from 'react-router-dom';
import { Container } from '@mui/material';
import { useSelector } from 'react-redux';
import { PATH_DASHBOARD } from '../../../routes/paths';
import { useSettingsContext } from '../../../components/settings';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
import CustomerNewForm from './CustomerNewForm';

// ----------------------------------------------------------------------

export default function CustomerEditPage() {
  const { themeStretch } = useSettingsContext();

  const { id } = useParams();

  const currentCustomer = useSelector((state) =>
    state.customer.customers.find((customer) => paramCase(customer._id) === id)
  );

  return (
    <>
      <Helmet>
        <title>Customer: Edit customer | Minimal UI</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Edit Customer"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Customer List',
              href: PATH_DASHBOARD.customer.list,
            },
            { name: currentCustomer?.customerName },
          ]}
        />

        <CustomerNewForm isEdit currentCustomer={currentCustomer} />
      </Container>
    </>
  );
}
