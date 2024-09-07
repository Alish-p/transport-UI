import { Helmet } from 'react-helmet-async';
import { Container } from '@mui/material';

import DriverForm from '../driver-form';
import { useSettingsContext } from '../../../../components/settings';
import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs';
import { PATH_DASHBOARD } from '../../../../routes/paths';

export default function DriverNewPage() {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Helmet>
        <title>Add New Driver</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Add New Driver"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Drivers List', href: PATH_DASHBOARD.driver.list },
            { name: 'Add New Driver' },
          ]}
        />

        <DriverForm />
      </Container>
    </>
  );
}
