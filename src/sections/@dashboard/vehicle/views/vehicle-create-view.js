import { Helmet } from 'react-helmet-async';
import { Container, Box, Stack, Button } from '@mui/material';

import VehicleNewForm from '../vehicle-form';
import { useSettingsContext } from '../../../../components/settings';
import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs';
import { PATH_DASHBOARD } from '../../../../routes/paths';

export default function NewVehiclePage() {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Helmet>
        <title>Add New Vehicle</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Add New Vehicle"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Vehicles List', href: PATH_DASHBOARD.vehicle.list },
            { name: 'Add New Vehicle' },
          ]}
        />

        <VehicleNewForm />
      </Container>
    </>
  );
}
