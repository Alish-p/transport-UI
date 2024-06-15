// @mui
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import { PropTypes } from 'prop-types';
import Iconify from '../../../../components/iconify/Iconify';
import { fDate } from '../../../../utils/formatTime';
import _mock from '../../../../_mock';

// ----------------------------------------------------------------------

LRInfoCard.propTypes = {
  subtrip: PropTypes.object.isRequired,
};

const avatar = _mock.image.avatar(0);

export default function LRInfoCard({ subtrip }) {
  const {
    routeCd: { routeName },
    customerId,
    ewayBill,
    ewayExpiryDate,
    loadingPoint,
    unloadingPoint,
    materialType,
    quantity,
    grade,
    tripId,
    startDate,
    endDate,
    rate,
    subtripStatus,
    loadingWeight,
    UnloadingWeight,
    startKm = '-',
    endKm = '-',
    tds,
    invoiceNo,
    orderNo,
    shipmentNo,
  } = subtrip;

  const renderCustomer = (
    <>
      <CardHeader
        title="Subtrip Info"
        action={
          <IconButton>
            <Iconify icon="solar:pen-bold" />
          </IconButton>
        }
      />
      <Stack direction="row" sx={{ p: 3 }}>
        <Avatar src={avatar} sx={{ width: 48, height: 48, mr: 2 }} />

        <Stack spacing={0.5} alignItems="flex-start" sx={{ typography: 'body2' }}>
          <Typography variant="subtitle2">{customerId}</Typography>

          <Box>
            Status:{' '}
            <Box component="span" sx={{ color: 'text.secondary', ml: 0.25 }}>
              {subtripStatus}
            </Box>
          </Box>
          <Box>
            Trip No :{' '}
            <Box component="span" sx={{ color: 'text.secondary', ml: 0.25 }}>
              {tripId}
            </Box>
          </Box>

          <Button
            size="small"
            color="error"
            startIcon={<Iconify icon="mingcute:add-line" />}
            sx={{ mt: 1 }}
          >
            Add to Blacklist
          </Button>
        </Stack>
      </Stack>
    </>
  );

  const renderRoute = (
    <>
      <CardHeader
        title="Route"
        action={
          <IconButton>
            <Iconify icon="solar:pen-bold" />
          </IconButton>
        }
      />
      <Stack spacing={1.5} sx={{ p: 3, typography: 'body2' }}>
        <Stack direction="row" alignItems="center">
          <Box component="span" sx={{ color: 'text.secondary', width: 200, flexShrink: 0 }}>
            Route
          </Box>
          {routeName}
        </Stack>

        <Stack direction="row" alignItems="center">
          <Box component="span" sx={{ color: 'text.secondary', width: 200, flexShrink: 0 }}>
            Loading Point
          </Box>
          {loadingPoint}
        </Stack>
        <Stack direction="row" alignItems="center">
          <Box component="span" sx={{ color: 'text.secondary', width: 200, flexShrink: 0 }}>
            Unloading Point
          </Box>
          <Link underline="always" color="inherit">
            {unloadingPoint}
          </Link>
        </Stack>
        <Stack direction="row" alignItems="center">
          <Box component="span" sx={{ color: 'text.secondary', width: 200, flexShrink: 0 }}>
            Start KM
          </Box>
          {startKm}
        </Stack>
        <Stack direction="row" alignItems="center">
          <Box component="span" sx={{ color: 'text.secondary', width: 200, flexShrink: 0 }}>
            End KM
          </Box>
          {endKm}
        </Stack>
      </Stack>
    </>
  );

  const renderMaterial = (
    <>
      <CardHeader
        title="Material"
        action={
          <IconButton>
            <Iconify icon="solar:pen-bold" />
          </IconButton>
        }
      />
      <Stack spacing={1.5} sx={{ p: 3, typography: 'body2' }}>
        <Stack direction="row" alignItems="center">
          <Box component="span" sx={{ color: 'text.secondary', width: 200, flexShrink: 0 }}>
            Material
          </Box>
          {materialType}
        </Stack>
        <Stack direction="row" alignItems="center">
          <Box component="span" sx={{ color: 'text.secondary', width: 200, flexShrink: 0 }}>
            Grade
          </Box>
          {grade}
        </Stack>
        <Stack direction="row" alignItems="center">
          <Box component="span" sx={{ color: 'text.secondary', width: 200, flexShrink: 0 }}>
            Quantity
          </Box>
          {quantity}
        </Stack>
        <Stack direction="row" alignItems="center">
          <Box component="span" sx={{ color: 'text.secondary', width: 200, flexShrink: 0 }}>
            Rate
          </Box>
          {rate}
          <Iconify icon="ph:currency-inr-thin" width={18} sx={{ ml: 0.5 }} />
        </Stack>
        <Stack direction="row" alignItems="center">
          <Box component="span" sx={{ color: 'text.secondary', width: 200, flexShrink: 0 }}>
            TDS
          </Box>
          {tds}
          <Iconify icon="ph:currency-inr-thin" width={18} sx={{ ml: 0.5 }} />
        </Stack>
        <Stack direction="row" alignItems="center">
          <Box component="span" sx={{ color: 'text.secondary', width: 200, flexShrink: 0 }}>
            Shipment
          </Box>
          # {shipmentNo}
        </Stack>
        <Stack direction="row" alignItems="center">
          <Box component="span" sx={{ color: 'text.secondary', width: 200, flexShrink: 0 }}>
            Invoice
          </Box>
          {invoiceNo}
        </Stack>
        <Stack direction="row" alignItems="center">
          <Box component="span" sx={{ color: 'text.secondary', width: 200, flexShrink: 0 }}>
            Eway-Bill
          </Box>
          {ewayBill}
        </Stack>
        <Stack direction="row" alignItems="center">
          <Box component="span" sx={{ color: 'text.secondary', width: 200, flexShrink: 0 }}>
            Eway-Bill Expiry
          </Box>
          {fDate(ewayExpiryDate)}
        </Stack>
      </Stack>
    </>
  );

  const renderPayment = (
    <>
      <CardHeader
        title="Weight"
        action={
          <IconButton>
            <Iconify icon="solar:pen-bold" />
          </IconButton>
        }
      />
      <Stack spacing={1.5} sx={{ p: 3, typography: 'body2' }}>
        <Stack direction="row" alignItems="center">
          <Box component="span" sx={{ color: 'text.secondary', width: 200, flexShrink: 0 }}>
            Loading Weight
          </Box>
          {loadingWeight}
        </Stack>
        <Stack direction="row" alignItems="center">
          <Box component="span" sx={{ color: 'text.secondary', width: 200, flexShrink: 0 }}>
            UnLoading Weight
          </Box>
          {loadingWeight}
        </Stack>
      </Stack>
    </>
  );

  return (
    <Card>
      {renderCustomer}

      <Divider sx={{ borderStyle: 'dashed' }} />

      {renderRoute}

      <Divider sx={{ borderStyle: 'dashed' }} />

      {renderMaterial}

      <Divider sx={{ borderStyle: 'dashed' }} />

      {renderPayment}
    </Card>
  );
}
