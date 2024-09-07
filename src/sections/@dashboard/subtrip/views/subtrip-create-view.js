import { Helmet } from 'react-helmet-async';
import { Container } from '@mui/material';
import { useParams } from 'react-router';
import { useSettingsContext } from '../../../../components/settings';
import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs';
import { PATH_DASHBOARD } from '../../../../routes/paths';
import SubtripForm from '../subtrip-edit-form';
import SubtripCreateForm from '../subtrip-create-form';

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
          heading={tripId !== 'undefined' ? `Add New Subtrip to ${tripId}` : 'Create New Subtrip'}
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Subtrip List', href: PATH_DASHBOARD.subtrip.list },
            { name: 'Add New Subtrip' },
          ]}
        />

        <SubtripCreateForm currentTrip={tripId !== 'undefined' ? tripId : null} />
      </Container>
    </>
  );
}
