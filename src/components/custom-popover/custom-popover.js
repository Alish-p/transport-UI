/* eslint-disable react/prop-types */
// @mui
import { menuItemClasses } from '@mui/material/MenuItem';
import Popover, { PopoverOrigin } from '@mui/material/Popover';
//
import { getPosition } from './utils';
import { StyledArrow } from './styles';

// ----------------------------------------------------------------------

export default function CustomPopover({
  open,
  children,
  arrow = 'top-right',
  hiddenArrow,
  sx,
  ...other
}) {
  const { style, anchorOrigin, transformOrigin } = getPosition(arrow);

  return (
    <Popover
      open={Boolean(open)}
      anchorEl={open}
      anchorOrigin={anchorOrigin}
      transformOrigin={transformOrigin}
      PaperProps={{
        sx: {
          width: 'auto',
          overflow: 'inherit',
          p: 1,
          ...style,
          [`& .${menuItemClasses.root}`]: {
            '& svg': {
              mr: 2,
              flexShrink: 1,
            },
          },
          ...sx,
        },
      }}
      {...other}
    >
      {!hiddenArrow && <StyledArrow arrow={arrow} />}

      {children}
    </Popover>
  );
}
