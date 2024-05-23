import { Helmet } from 'react-helmet-async';
import { paramCase } from 'change-case';
import { useParams } from 'react-router-dom';
import { Container } from '@mui/material';
import { useSelector } from 'react-redux';
import { PATH_DASHBOARD } from '../../../routes/paths';
import { useSettingsContext } from '../../../components/settings';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
import BankForm from './BankNewForm';

export default function BankEditPage() {
  const { themeStretch } = useSettingsContext();

  const { id } = useParams();

  const currentBank = useSelector((state) =>
    state.bank.banks.find((bank) => paramCase(bank._id) === id)
  );

  return (
    <>
      <Helmet>
        <title>Bank: Edit Bank | Minimal UI</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Edit Bank"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Bank List',
              href: PATH_DASHBOARD.bank.list,
            },
            { name: currentBank?.bankBranch },
          ]}
        />

        <BankForm isEdit currentBank={currentBank} />
      </Container>
    </>
  );
}
