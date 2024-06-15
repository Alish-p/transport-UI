import PropTypes from 'prop-types';
import { alpha, styled } from '@mui/material/styles';
import { Box, Card, Avatar, Divider, Typography, Stack, Grid } from '@mui/material';
import Image from '../../../../components/image';
import SvgColor from '../../../../components/svg-color';
import _mock from '../../../../_mock';
import { fDate } from '../../../../utils/formatTime';
import Label from '../../../../components/label';

const avatarUrl = _mock.image.avatar(0);
const cover = _mock.image.cover(0);
// ----------------------------------------------------------------------

const StyledOverlay = styled('div')(({ theme }) => ({
  top: 0,
  left: 0,
  zIndex: 8,
  width: '100%',
  height: '100%',
  position: 'absolute',
  backgroundColor: alpha(theme.palette.grey[900], 0.64),
}));

// ----------------------------------------------------------------------

LRInfoCard.propTypes = {
  subtrip: PropTypes.object.isRequired,
};

export default function LRInfoCard({ subtrip }) {
  return (
    <Card sx={{ textAlign: 'center' }}>
      <Box sx={{ position: 'relative' }}>
        <SvgColor
          src="/assets/shape_avatar.svg"
          sx={{
            width: 144,
            height: 62,
            zIndex: 10,
            left: 0,
            right: 0,
            bottom: -26,
            mx: 'auto',
            position: 'absolute',
            color: 'background.paper',
          }}
        />

        <Avatar
          alt="driverName"
          src={avatarUrl}
          sx={{
            width: 64,
            height: 64,
            zIndex: 11,
            left: 0,
            right: 0,
            bottom: -32,
            mx: 'auto',
            position: 'absolute',
          }}
        />

        <StyledOverlay />

        <Image src={cover} alt={cover} ratio="16/9" />
      </Box>

      <Typography variant="subtitle1" sx={{ mt: 6, mb: 0.5 }}>
        Subtrip Information
      </Typography>

      <Label color="primary">{subtripStatus}</Label>

      <Divider sx={{ borderStyle: 'dashed', my: 2 }} />

      {/* <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" sx={{ py: 3 }} alignItems="center"> */}
      <Stack sx={{ my: 2 }} alignItems="center">
        <Grid container spacing={2} sx={{ mb: 1 }}>
          <Grid item spacing={2} xs={6}>
            <Typography variant="body" sx={{ color: 'text.secondary' }}>
              Route{' '}
            </Typography>{' '}
          </Grid>
          <Grid item spacing={2} xs={6}>
            <Typography variant="caption">{routeName}</Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mb: 1 }}>
          <Grid item spacing={2} xs={6}>
            <Typography variant="body" sx={{ color: 'text.secondary' }}>
              Loading Point{' '}
            </Typography>{' '}
          </Grid>
          <Grid item spacing={2} xs={6}>
            <Typography variant="caption">{loadingPoint}</Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mb: 1 }}>
          <Grid item spacing={2} xs={6}>
            <Typography variant="body" sx={{ color: 'text.secondary' }}>
              UnLoading Point{' '}
            </Typography>{' '}
          </Grid>
          <Grid item spacing={2} xs={6}>
            <Typography variant="caption">{unloadingPoint}</Typography>
          </Grid>
        </Grid>
      </Stack>

      <Divider sx={{ borderStyle: 'dashed' }} />

      <Stack sx={{ my: 2 }}>
        <Grid container spacing={2} sx={{ mb: 1 }}>
          <Grid item spacing={2} xs={6}>
            <Typography variant="body" sx={{ color: 'text.secondary' }}>
              Material{' '}
            </Typography>{' '}
          </Grid>
          <Grid item spacing={2} xs={6}>
            <Typography variant="caption">{`${materialType} (${quantity} Bags)`}</Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mb: 1 }}>
          <Grid item spacing={2} xs={6}>
            <Typography variant="body" sx={{ color: 'text.secondary' }}>
              Shipment{' '}
            </Typography>{' '}
          </Grid>
          <Grid item spacing={2} xs={6}>
            <Typography variant="caption">{shipmentNo}</Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mb: 1 }}>
          <Grid item spacing={2} xs={6}>
            <Typography variant="body" sx={{ color: 'text.secondary' }}>
              Invoice No{' '}
            </Typography>{' '}
          </Grid>
          <Grid item spacing={2} xs={6}>
            <Typography variant="caption">{invoiceNo}</Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mb: 1 }}>
          <Grid item spacing={2} xs={6}>
            <Typography variant="body" sx={{ color: 'text.secondary' }}>
              Eway-Bill{' '}
            </Typography>{' '}
          </Grid>
          <Grid item spacing={2} xs={6}>
            <Typography variant="caption">{ewayBill}</Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mb: 1 }}>
          <Grid item spacing={2} xs={6}>
            <Typography variant="body" sx={{ color: 'text.secondary' }}>
              Eway-Expiry{' '}
            </Typography>
          </Grid>
          <Grid item spacing={2} xs={6}>
            <Typography variant="caption">{fDate(ewayExpiryDate)}</Typography>
          </Grid>
        </Grid>
      </Stack>
      {/* </Box> */}
      <Divider sx={{ borderStyle: 'dashed' }} />

      <Stack sx={{ my: 2 }}>
        <Grid container spacing={2} sx={{ mb: 1 }}>
          <Grid item spacing={2} xs={6}>
            <Typography variant="body" sx={{ color: 'text.secondary' }}>
              Start Date{' '}
            </Typography>{' '}
          </Grid>
          <Grid item spacing={2} xs={6}>
            <Typography variant="caption">{fDate(startDate)}</Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mb: 1 }}>
          <Grid item spacing={2} xs={6}>
            <Typography variant="body" sx={{ color: 'text.secondary' }}>
              End Date{' '}
            </Typography>{' '}
          </Grid>
          <Grid item spacing={2} xs={6}>
            <Typography variant="caption">{endDate ? fDate(endDate) : '-'}</Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mb: 1 }}>
          <Grid item spacing={2} xs={6}>
            <Typography variant="body" sx={{ color: 'text.secondary' }}>
              Eway-Bill{' '}
            </Typography>{' '}
          </Grid>
          <Grid item spacing={2} xs={6}>
            <Typography variant="caption">{ewayBill}</Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mb: 1 }}>
          <Grid item spacing={2} xs={6}>
            <Typography variant="body" sx={{ color: 'text.secondary' }}>
              Eway-Expiry{' '}
            </Typography>
          </Grid>
          <Grid item spacing={2} xs={6}>
            <Typography variant="caption">{fDate(ewayExpiryDate)}</Typography>
          </Grid>
        </Grid>
      </Stack>
      {/* </Box> */}

      <Divider sx={{ borderStyle: 'dashed' }} />

      <div>
        <Typography
          variant="caption"
          component="div"
          sx={{ mb: 0.75, py: 2, color: 'text.disabled' }}
        >
          Address
        </Typography>
        <Typography variant="subtitle1">driverPresentAddress</Typography>
      </div>
    </Card>
  );
}
