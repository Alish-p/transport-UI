import { Helmet } from 'react-helmet-async';
import { Container } from '@mui/material';
import BankForm from './BankNewForm';
import { useSettingsContext } from '../../../components/settings';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
import { PATH_DASHBOARD } from '../../../routes/paths';

export default function BankNewPage() {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Helmet>
        <title>Add New Bank</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Add New Bank"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Bank List', href: PATH_DASHBOARD.bank.list },
            { name: 'Add New Bank' },
          ]}
        />

        <BankForm />
      </Container>
    </>
  );
}
