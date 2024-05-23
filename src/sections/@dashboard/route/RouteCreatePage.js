import { Helmet } from 'react-helmet-async';
import { Container } from '@mui/material';
import RouteForm from './RouteNewForm';
import { useSettingsContext } from '../../../components/settings';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
import { PATH_DASHBOARD } from '../../../routes/paths';

export default function RouteNewPage() {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Helmet>
        <title>Add New Route</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Add New Route"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Route List', href: PATH_DASHBOARD.route.list },
            { name: 'Add New Route' },
          ]}
        />

        <RouteForm />
      </Container>
    </>
  );
}
