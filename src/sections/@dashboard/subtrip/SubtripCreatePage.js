import { Helmet } from 'react-helmet-async';
import { Container } from '@mui/material';
import { useSettingsContext } from '../../../components/settings';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
import { PATH_DASHBOARD } from '../../../routes/paths';
import SubtripForm from './SubtripNewForm';

export default function SubtripNewPage() {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Helmet>
        <title>Add New Subtrip</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Add New Subtrip"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Subtrip List', href: PATH_DASHBOARD.subtrip.list },
            { name: 'Add New Subtrip' },
          ]}
        />

        <SubtripForm />
      </Container>
    </>
  );
}
