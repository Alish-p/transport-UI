import PropTypes from 'prop-types';
import { alpha, styled } from '@mui/material/styles';
import { Box, Card, Avatar, Divider, Typography, Stack } from '@mui/material';
import Image from '../../../components/image';
import SvgColor from '../../../components/svg-color';
import _mock from '../../../_mock';

const avatarUrl = _mock.image.avatar(1);
const cover = _mock.image.cover(1);

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

VehicleCard.propTypes = {
  vehicle: PropTypes.object.isRequired,
};

export default function VehicleCard({ vehicle }) {
  const {
    vehicleNo,
    vehicleType,
    modelType,
    vehicleCompany,
    noOfTyres,
    chasisNo,
    engineNo,
    manufacturingYear,
    loadingCapacity,
    engineType,
    fuelTankCapacity,
    fromDate,
    toDate,
  } = vehicle;

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
          alt={vehicleNo}
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
        {vehicleNo}
      </Typography>

      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        {vehicleCompany}
      </Typography>

      <Stack direction="row" alignItems="center" justifyContent="center" sx={{ mt: 1, mb: 3 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {modelType}
        </Typography>
      </Stack>

      <Divider sx={{ borderStyle: 'dashed' }} />

      <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" sx={{ py: 3 }}>
        <div>
          <Typography variant="caption" component="div" sx={{ mb: 0.75, color: 'text.disabled' }}>
            Vehicle Type
          </Typography>
          <Typography variant="subtitle1">{vehicleType}</Typography>
        </div>
        <div>
          <Typography variant="caption" component="div" sx={{ mb: 0.75, color: 'text.disabled' }}>
            No of Tyres
          </Typography>
          <Typography variant="subtitle1">{noOfTyres}</Typography>
        </div>
        <div>
          <Typography variant="caption" component="div" sx={{ mb: 0.75, color: 'text.disabled' }}>
            Chasis No
          </Typography>
          <Typography variant="subtitle1">{chasisNo}</Typography>
        </div>
        <div>
          <Typography variant="caption" component="div" sx={{ mb: 0.75, color: 'text.disabled' }}>
            Engine No
          </Typography>
          <Typography variant="subtitle1">{engineNo}</Typography>
        </div>
        <div>
          <Typography variant="caption" component="div" sx={{ mb: 0.75, color: 'text.disabled' }}>
            Manufacturing Year
          </Typography>
          <Typography variant="subtitle1">{manufacturingYear}</Typography>
        </div>
        <div>
          <Typography variant="caption" component="div" sx={{ mb: 0.75, color: 'text.disabled' }}>
            Loading Capacity
          </Typography>
          <Typography variant="subtitle1">{loadingCapacity} tons</Typography>
        </div>
        <div>
          <Typography variant="caption" component="div" sx={{ mb: 0.75, color: 'text.disabled' }}>
            Engine Type
          </Typography>
          <Typography variant="subtitle1">{engineType}</Typography>
        </div>
        <div>
          <Typography variant="caption" component="div" sx={{ mb: 0.75, color: 'text.disabled' }}>
            Fuel Tank Capacity
          </Typography>
          <Typography variant="subtitle1">{fuelTankCapacity} liters</Typography>
        </div>
      </Box>

      <Divider sx={{ borderStyle: 'dashed' }} />

      <div>
        <Typography
          variant="caption"
          component="div"
          sx={{ mb: 0.75, py: 2, color: 'text.disabled' }}
        >
          From Date
        </Typography>
        <Typography variant="subtitle1">{new Date(fromDate).toLocaleDateString()}</Typography>
      </div>

      <div>
        <Typography
          variant="caption"
          component="div"
          sx={{ mb: 0.75, py: 2, color: 'text.disabled' }}
        >
          To Date
        </Typography>
        <Typography variant="subtitle1">{new Date(toDate).toLocaleDateString()}</Typography>
      </div>
    </Card>
  );
}
