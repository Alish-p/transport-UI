import { Helmet } from 'react-helmet-async';
import { Container, Box, Stack, Button } from '@mui/material';

import { useSettingsContext } from '../../../../components/settings';
import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs';
import { PATH_DASHBOARD } from '../../../../routes/paths';
import TripNewForm from '../trip-form';

export default function NewTripPage() {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Helmet>
        <title>Add New Trip</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Add New Trip"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Trips List', href: PATH_DASHBOARD.trip.list },
            { name: 'Add New Trip' },
          ]}
        />

        <TripNewForm />
      </Container>
    </>
  );
}
