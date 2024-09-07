import { Helmet } from 'react-helmet-async';
import { Container } from '@mui/material';
import PumpForm from '../pump-form';
import { useSettingsContext } from '../../../../components/settings';
import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs';
import { PATH_DASHBOARD } from '../../../../routes/paths';

export default function PumpNewPage() {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Helmet>
        <title>Add New Pump</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Add New Pump"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Pump List', href: PATH_DASHBOARD.pump.list },
            { name: 'Add New Pump' },
          ]}
        />

        <PumpForm />
      </Container>
    </>
  );
}
