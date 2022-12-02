import { IconButton, Popover, Tooltip } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationList from './NotificationList';
import { useState, MouseEvent } from 'react';

export default function NotificationToggle() {
  const [open, setOpen] = useState(false);
  const [anchorElement, setAnchorElement] = useState<HTMLButtonElement | null>(null);

  function handleClick(event: MouseEvent<HTMLButtonElement>){
    setOpen(!open);
    setAnchorElement(event.currentTarget);
  }
  
  return (
    <>
      <Tooltip
        disableFocusListener
        disableTouchListener
        title={'Notifications'}
      >
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          color="inherit"
          onClick={handleClick}
        >
          <NotificationsIcon />
        </IconButton>
      </Tooltip>

      <Popover
        open={open}
        onClose={handleClick}
        anchorEl={anchorElement}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        
      >
        <NotificationList />
      </Popover>
    </>
  );
}
