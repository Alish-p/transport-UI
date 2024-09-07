import { Helmet } from 'react-helmet-async';
import { paramCase } from 'change-case';
import { useParams } from 'react-router-dom';
import { Container } from '@mui/material';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { PATH_DASHBOARD } from '../../../../routes/paths';
import { useSettingsContext } from '../../../../components/settings';
import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs';
import { dispatch } from '../../../../redux/store';
import { fetchTrip } from '../../../../redux/slices/trip';
import TripForm from '../trip-form';

// ----------------------------------------------------------------------

export default function TripEditPage() {
  const { themeStretch } = useSettingsContext();
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchTrip(id));
  }, [id]);

  const currentTrip = useSelector((state) => state.trip.trip);

  return (
    <>
      <Helmet>
        <title> Trip: Edit Trip | Minimal UI</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Edit Trip"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Trip List',
              href: PATH_DASHBOARD.trip.list,
            },
            { name: currentTrip?.tripName },
          ]}
        />

        <TripForm isEdit currentTrip={currentTrip} />
      </Container>
    </>
  );
}
