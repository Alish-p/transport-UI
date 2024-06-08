import PropTypes from 'prop-types';
// @mui
import { alpha, styled } from '@mui/material/styles';
import { Box, Card, Avatar, Divider, Typography, Stack, IconButton, Grid } from '@mui/material';
// utils
import { fShortenNumber } from '../../../../utils/formatNumber';
// _mock
import { _socials } from '../../../../_mock/arrays';
// components
import Image from '../../../../components/image';
import Iconify from '../../../../components/iconify';
import SvgColor from '../../../../components/svg-color';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

LRInfo.propTypes = {
  user: PropTypes.object,
};

export default function LRInfo({ user }) {
  // const { name, cover, role, follower, totalPosts, avatarUrl, following } = user;

  return (
    <Card sx={{ p: 3 }}>
      <Typography variant="h4" textAlign="start" sx={{ my: 1 }}>
        Subtrip Info
      </Typography>

      <Stack sx={{ my: 2 }}>
        <Grid container spacing={2} sx={{ mb: 1 }}>
          <Grid item spacing={2} md={6}>
            <Typography variant="body" sx={{ color: 'text.secondary' }}>
              Route{' '}
            </Typography>{' '}
          </Grid>
          <Grid item spacing={2} md={6}>
            <Typography variant="caption">Mudhol- Pune</Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mb: 1 }}>
          <Grid item spacing={2} md={6}>
            <Typography variant="body" sx={{ color: 'text.secondary' }}>
              Loading Point{' '}
            </Typography>{' '}
          </Grid>
          <Grid item spacing={2} md={6}>
            <Typography variant="caption">Mudhol</Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mb: 1 }}>
          <Grid item spacing={2} md={6}>
            <Typography variant="body" sx={{ color: 'text.secondary' }}>
              UnLoading Point{' '}
            </Typography>{' '}
          </Grid>
          <Grid item spacing={2} md={6}>
            <Typography variant="caption">Pune</Typography>
          </Grid>
        </Grid>
      </Stack>

      <Divider sx={{ borderStyle: 'dashed' }} />

      <Stack sx={{ my: 2 }}>
        <Grid container spacing={2} sx={{ mb: 1 }}>
          <Grid item spacing={2} md={6}>
            <Typography variant="body" sx={{ color: 'text.secondary' }}>
              Shipment{' '}
            </Typography>{' '}
          </Grid>
          <Grid item spacing={2} md={6}>
            <Typography variant="caption">1238381</Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mb: 1 }}>
          <Grid item spacing={2} md={6}>
            <Typography variant="body" sx={{ color: 'text.secondary' }}>
              Invoice No{' '}
            </Typography>{' '}
          </Grid>
          <Grid item spacing={2} md={6}>
            <Typography variant="caption">INV123</Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mb: 1 }}>
          <Grid item spacing={2} md={6}>
            <Typography variant="body" sx={{ color: 'text.secondary' }}>
              Eway-Bill{' '}
            </Typography>{' '}
          </Grid>
          <Grid item spacing={2} md={6}>
            <Typography variant="caption">12343674523</Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mb: 1 }}>
          <Grid item spacing={2} md={6}>
            <Typography variant="body" sx={{ color: 'text.secondary' }}>
              Eway-Expiry{' '}
            </Typography>
          </Grid>
          <Grid item spacing={2} md={6}>
            <Typography variant="caption">12 June , 2024</Typography>
          </Grid>
        </Grid>
      </Stack>
    </Card>
  );
}
