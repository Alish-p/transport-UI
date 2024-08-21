import Container from '@mui/material/Container';
import { useNavigate, useParams } from 'react-router';
import { useForm, FormProvider, useWatch } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Button, Stack } from '@mui/material';
import { useSnackbar } from 'notistack';
import { paramCase } from 'change-case';
import SubtripsSelectors from '../SubtripsSelectors';
import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs/CustomBreadcrumbs';
import { useSettingsContext } from '../../../../components/settings';
import InvoiceDetails from '../invoice-details';
import { fetchSubtrips } from '../../../../redux/slices/subtrip';
import { addInvoice } from '../../../../redux/slices/invoice';
import { PATH_DASHBOARD } from '../../../../routes/paths';

export default function InvoiceCreateView() {
  const settings = useSettingsContext();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { subtrips, isLoading } = useSelector((state) => state.subtrip);

  useEffect(() => {
    dispatch(fetchSubtrips());
  }, [dispatch]);

  const methods = useForm();

  const selectedSubtrips = useWatch({
    control: methods.control,
    name: 'selectedSubtrips',
    defaultValue: [],
  });

  const customer = useWatch({
    control: methods.control,
    name: 'customerId',
    defaultValue: null,
  });

  const handleCreateAndSend = async () => {
    try {
      const createdInvoice = await dispatch(
        addInvoice({ customerId: customer._id, subtrips: selectedSubtrips })
      );

      enqueueSnackbar('Invoice generated successfully!');
      navigate(PATH_DASHBOARD.invoice.view(paramCase(createdInvoice._id)));
    } catch (error) {
      console.error(error);
    }
  };

  console.log({ selectedSubtrips, customer });

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="INV-123"
        links={[
          { name: 'Dashboard', href: '/dashboard' },
          { name: 'Invoice', href: '/dashboard/invoice' },
          { name: 'INV-123' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <FormProvider {...methods}>
        <SubtripsSelectors />
        <InvoiceDetails
          subtrips={subtrips.filter((st) => selectedSubtrips.includes(st._id))}
          customer={customer}
        />

        <Stack justifyContent="flex-end" direction="row" spacing={2} sx={{ mt: 3 }}>
          <Button size="large" variant="contained" onClick={handleCreateAndSend}>
            Create
          </Button>
        </Stack>
      </FormProvider>
    </Container>
  );
}
