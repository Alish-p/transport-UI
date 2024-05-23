import { Helmet } from 'react-helmet-async';
import { paramCase } from 'change-case';
import { useParams } from 'react-router-dom';
// @mui
import { Container } from '@mui/material';
// routes
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { PATH_DASHBOARD } from '../../../routes/paths';
import { useSettingsContext } from '../../../components/settings';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
// sections
import VehicleForm from './VehicleNewForm';

// ----------------------------------------------------------------------

export default function VehicleEditPage() {
  const { themeStretch } = useSettingsContext();

  const { id } = useParams();

  const currentVehicle = useSelector((state) =>
    state.vehicle.vehicles.find((vehicle) => paramCase(vehicle._id) === id)
  );

  console.log({ id });

  return (
    <>
      <Helmet>
        <title> Vehicle: Edit vehicle | Minimal UI</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Edit vehicle"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Vehicle List',
              href: PATH_DASHBOARD.vehicle.list,
            },
            { name: currentVehicle?.vehicleNo },
          ]}
        />

        <VehicleForm isEdit currentVehicle={currentVehicle} />
      </Container>
    </>
  );
}
