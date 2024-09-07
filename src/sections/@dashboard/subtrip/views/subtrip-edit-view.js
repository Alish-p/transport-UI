import { Helmet } from 'react-helmet-async';
import { paramCase } from 'change-case';
import { useParams } from 'react-router-dom';
import { Container } from '@mui/material';
import { useSelector } from 'react-redux';
import { PATH_DASHBOARD } from '../../../../routes/paths';
import { useSettingsContext } from '../../../../components/settings';
import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs';
import SubtripForm from '../subtrip-edit-form';

export default function SubtripEditPage() {
  const { themeStretch } = useSettingsContext();

  const { id } = useParams();

  const currentSubtrip = useSelector((state) =>
    state.subtrip.subtrips.find((subtrip) => paramCase(subtrip._id) === id)
  );

  return (
    <>
      <Helmet>
        <title>Subtrip: Edit Subtrip | Dashboard</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Edit Subtrip"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Subtrip List',
              href: PATH_DASHBOARD.subtrip.list,
            },
            { name: 'Edit Subtrip' },
          ]}
        />

        <SubtripForm isEdit currentSubtrip={currentSubtrip} />
      </Container>
    </>
  );
}
