import PropTypes from 'prop-types';
import {
  Dialog,
  Button,
  DialogTitle,
  DialogActions,
  DialogContent,
  IconButton,
} from '@mui/material';

import Iconify from '../iconify/Iconify';

// import { Icon } from '@iconify/react';
// import arrowDownFill from '@iconify/icons-eva/arrow-circle-down-fill';
// import Iconify from '../iconify';

ConfirmDialog.propTypes = {
  open: PropTypes.bool,
  title: PropTypes.node,
  action: PropTypes.node,
  content: PropTypes.node,
  onClose: PropTypes.func,
};

export default function ConfirmDialog({ title, content, action, open, onClose, ...other }) {
  return (
    <Dialog fullWidth maxWidth="lg" open={open} onClose={onClose} {...other}>
      <DialogTitle
        sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 2 }}
      >
        {title}
        <IconButton onClick={onClose}>
          <Iconify icon="eva:close-outline" width={30} sx={{ marginLeft: 'auto' }} />
        </IconButton>
      </DialogTitle>

      {content && (
        <DialogContent sx={{ typography: 'body2', marginTop: '5px' }}>{content}</DialogContent>
      )}

      <DialogActions>
        {action}
        {/* Removed Cancel Button */}
      </DialogActions>
    </Dialog>
  );
}
