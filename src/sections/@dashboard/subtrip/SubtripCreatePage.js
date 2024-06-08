import { Helmet } from 'react-helmet-async';
import { Container } from '@mui/material';
import { useParams } from 'react-router';
import { useSettingsContext } from '../../../components/settings';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
import { PATH_DASHBOARD } from '../../../routes/paths';
import SubtripForm from './SubtripNewForm';
import SubtripCreateForm from './SubtripCreateForm';

export default function SubtripNewPage() {
  const { themeStretch } = useSettingsContext();
  const { id: tripId } = useParams();

  return (
    <>
      <Helmet>
        <title>Add New Subtrip </title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading={`Add New Subtrip to ${tripId}`}
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Subtrip List', href: PATH_DASHBOARD.subtrip.list },
            { name: 'Add New Subtrip' },
          ]}
        />

        <SubtripCreateForm currentTrip={tripId} />
      </Container>
    </>
  );
}
