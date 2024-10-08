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

// ----------------------------------------------------------------------

DriverCard.propTypes = {
  driver: PropTypes.object.isRequired,
};

export default function DriverCard({ driver }) {
  const {
    driverName,
    driverLicenceNo,
    driverPresentAddress,
    driverCellNo,
    aadharNo,
    guarantorName,
    guarantorCellNo,
    experience,
    dob,
    permanentAddress,
  } = driver;

  const renderHeader = (
    <>
      <CardHeader
        title="Driver Details"
        action={
          <IconButton>
            <Iconify icon="solar:pen-bold" />
          </IconButton>
        }
      />
      <Stack direction="row" sx={{ p: 3 }}>
        <Avatar src="/assets/avatar-25.webp" sx={{ width: 100, height: 100, mr: 2 }} />

        <Stack spacing={0.5} alignItems="flex-start" sx={{ typography: 'body2' }}>
          <Typography variant="subtitle2">{driverName}</Typography>

          <Box>
            License:{' '}
            <Box component="span" sx={{ color: 'text.secondary', ml: 0.25 }}>
              {driverLicenceNo}
            </Box>
          </Box>
          <Box>
            <Box component="span" sx={{ color: 'text.secondary', ml: 0.25 }}>
              +91 {driverCellNo}
            </Box>
          </Box>

          <Button
            size="small"
            color="success"
            startIcon={<Iconify icon="prime:whatsapp" />}
            sx={{ mt: 1 }}
          >
            Whatsapp
          </Button>
        </Stack>
      </Stack>
    </>
  );

  const renderInfo = (
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
            Adhar No
          </Box>
          {aadharNo}
        </Stack>
        <Stack direction="row" alignItems="center">
          <Box component="span" sx={{ color: 'text.secondary', width: 200, flexShrink: 0 }}>
            Years of Experience
          </Box>
          {experience}
        </Stack>
        <Stack direction="row" alignItems="center">
          <Box component="span" sx={{ color: 'text.secondary', width: 200, flexShrink: 0 }}>
            Date Of Birth
          </Box>
          {fDate(dob)}
        </Stack>

        <Stack direction="row" alignItems="center">
          <Box component="span" sx={{ color: 'text.secondary', width: 200, flexShrink: 0 }}>
            Guarantor
          </Box>
          {guarantorName}
        </Stack>
        <Stack direction="row" alignItems="center">
          <Box component="span" sx={{ color: 'text.secondary', width: 200, flexShrink: 0 }}>
            Guarantor No
          </Box>
          <Link underline="always" color="inherit">
            {guarantorCellNo}
          </Link>
        </Stack>
        <Stack direction="row" alignItems="center">
          <Box component="span" sx={{ color: 'text.secondary', width: 200, flexShrink: 0 }}>
            Current Address
          </Box>
          {driverPresentAddress}
        </Stack>
        <Stack direction="row" alignItems="center">
          <Box component="span" sx={{ color: 'text.secondary', width: 200, flexShrink: 0 }}>
            Permanent Address
          </Box>
          {permanentAddress}
        </Stack>
      </Stack>
    </>
  );

  return (
    <Card>
      {renderHeader}

      <Divider sx={{ borderStyle: 'dashed' }} />

      {renderInfo}

      <Divider sx={{ borderStyle: 'dashed' }} />
    </Card>
  );
}
