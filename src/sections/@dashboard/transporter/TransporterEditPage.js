import { Helmet } from 'react-helmet-async';
import { paramCase } from 'change-case';
import { useParams } from 'react-router-dom';
import { Container } from '@mui/material';
import { useSelector } from 'react-redux';
import { PATH_DASHBOARD } from '../../../routes/paths';
import { useSettingsContext } from '../../../components/settings';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
import TransporterForm from './TransporterNewForm';

// ----------------------------------------------------------------------

export default function TransporterEditPage() {
  const { themeStretch } = useSettingsContext();

  const { id } = useParams();

  const currentTransporter = useSelector((state) =>
    state.transporter.transporters.find((transporter) => paramCase(transporter._id) === id)
  );

  return (
    <>
      <Helmet>
        <title> Transporter: Edit transporter | Minimal UI</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Edit Transporter"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Transporter List',
              href: PATH_DASHBOARD.transporter.list,
            },
            { name: currentTransporter?.transportName },
          ]}
        />

        <TransporterForm isEdit currentTransporter={currentTransporter} />
      </Container>
    </>
  );
}
