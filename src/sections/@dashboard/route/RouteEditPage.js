import { Helmet } from 'react-helmet-async';
import { paramCase } from 'change-case';
import { useParams } from 'react-router-dom';
import { Container } from '@mui/material';
import { useSelector } from 'react-redux';
import { PATH_DASHBOARD } from '../../../routes/paths';
import { useSettingsContext } from '../../../components/settings';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
import RouteForm from './RouteNewForm';

export default function RouteEditPage() {
  const { themeStretch } = useSettingsContext();

  const { id } = useParams();

  const currentRoute = useSelector((state) =>
    state.route.routes.find((route) => paramCase(route._id) === id)
  );

  return (
    <>
      <Helmet>
        <title>Route: Edit Route | Minimal UI</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Edit Route"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Route List',
              href: PATH_DASHBOARD.route.list,
            },
            { name: currentRoute?.routeName },
          ]}
        />

        <RouteForm isEdit currentRoute={currentRoute} />
      </Container>
    </>
  );
}
