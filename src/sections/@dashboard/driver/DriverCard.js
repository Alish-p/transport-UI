import PropTypes from 'prop-types';
import { alpha, styled } from '@mui/material/styles';
import { Box, Card, Avatar, Divider, Typography, Stack } from '@mui/material';
import Image from '../../../components/image';
import SvgColor from '../../../components/svg-color';
import _mock from '../../../_mock';

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

DriverCard.propTypes = {
  driver: PropTypes.object.isRequired,
};

export default function DriverCard({ driver }) {
  const {
    driverName,
    images = [],
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
          alt={driverName}
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
        {driverName}
      </Typography>

      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        {driverLicenceNo}
      </Typography>

      <Stack direction="row" alignItems="center" justifyContent="center" sx={{ mt: 1, mb: 3 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          +91 {driverCellNo}
        </Typography>
      </Stack>

      <Divider sx={{ borderStyle: 'dashed' }} />

      <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" sx={{ py: 3 }}>
        <div>
          <Typography variant="caption" component="div" sx={{ mb: 0.75, color: 'text.disabled' }}>
            Aadhar No
          </Typography>
          <Typography variant="subtitle1">{aadharNo}</Typography>
        </div>
        <div>
          <Typography variant="caption" component="div" sx={{ mb: 0.75, color: 'text.disabled' }}>
            Guarantor
          </Typography>
          <Typography variant="subtitle1">{guarantorName}</Typography>
        </div>
        <div>
          <Typography variant="caption" component="div" sx={{ mb: 0.75, color: 'text.disabled' }}>
            Experience
          </Typography>
          <Typography variant="subtitle1">{experience} years</Typography>
        </div>
        <div>
          <Typography variant="caption" component="div" sx={{ mb: 0.75, color: 'text.disabled' }}>
            DOB
          </Typography>
          <Typography variant="subtitle1">{new Date(dob).toLocaleDateString()}</Typography>
        </div>

        {/* <div>
          <Typography variant="caption" component="div" sx={{ mb: 0.75, color: 'text.disabled' }}>
            Permanent Address
          </Typography>
          <Typography variant="subtitle1">{permanentAddress}</Typography>
        </div> */}
      </Box>

      <Divider sx={{ borderStyle: 'dashed' }} />

      <div>
        <Typography
          variant="caption"
          component="div"
          sx={{ mb: 0.75, py: 2, color: 'text.disabled' }}
        >
          Address
        </Typography>
        <Typography variant="subtitle1">{driverPresentAddress}</Typography>
      </div>
    </Card>
  );
}
