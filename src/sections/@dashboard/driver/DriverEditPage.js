import { Helmet } from 'react-helmet-async';
import { paramCase } from 'change-case';
import { useParams } from 'react-router-dom';
import { Container } from '@mui/material';
import { useSelector } from 'react-redux';
import { PATH_DASHBOARD } from '../../../routes/paths';
import { useSettingsContext } from '../../../components/settings';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
import DriverForm from './DriverNewForm';

// ----------------------------------------------------------------------

export default function DriverEditPage() {
  const { themeStretch } = useSettingsContext();

  const { id } = useParams();

  const currentDriver = useSelector((state) =>
    state.driver.drivers.find((driver) => paramCase(driver._id) === id)
  );

  return (
    <>
      <Helmet>
        <title>Driver: Edit driver | Minimal UI</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Edit Driver"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Drivers List',
              href: PATH_DASHBOARD.driver.list,
            },
            { name: currentDriver?.driverName },
          ]}
        />

        <DriverForm isEdit currentDriver={currentDriver} />
      </Container>
    </>
  );
}
