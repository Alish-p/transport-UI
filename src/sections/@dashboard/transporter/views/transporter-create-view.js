import { Helmet } from 'react-helmet-async';
import { Container } from '@mui/material';

import TransporterNewForm from '../transporter-form'; // Import the new transporter form component
import { useSettingsContext } from '../../../../components/settings';
import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs';
import { PATH_DASHBOARD } from '../../../../routes/paths';

export default function NewTransporterPage() {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Helmet>
        <title>Add New Transporter</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Add New Transporter"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Transporters List', href: PATH_DASHBOARD.transporter.list },
            { name: 'Add New Transporter' },
          ]}
        />

        <TransporterNewForm />
      </Container>
    </>
  );
}
