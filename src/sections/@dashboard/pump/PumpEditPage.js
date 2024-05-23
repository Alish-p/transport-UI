import { Helmet } from 'react-helmet-async';
import { paramCase } from 'change-case';
import { useParams } from 'react-router-dom';
import { Container } from '@mui/material';
import { useSelector } from 'react-redux';
import { PATH_DASHBOARD } from '../../../routes/paths';
import { useSettingsContext } from '../../../components/settings';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
import PumpForm from './PumpNewForm';

export default function PumpEditPage() {
  const { themeStretch } = useSettingsContext();

  const { id } = useParams();

  const currentPump = useSelector((state) =>
    state.pump.pumps.find((pump) => paramCase(pump._id) === id)
  );

  return (
    <>
      <Helmet>
        <title>Pump: Edit Pump | Minimal UI</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Edit Pump"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Pump List',
              href: PATH_DASHBOARD.pump.list,
            },
            { name: currentPump?.pumpName },
          ]}
        />

        <PumpForm isEdit currentPump={currentPump} />
      </Container>
    </>
  );
}
