import { Badge, IconButton, Popover, Tooltip } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationList from './NotificationList';
import { useState, MouseEvent, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { apiGetUserNotifications } from '../../../remote/banking-api/notification.api';
import { setUserNotifications } from '../../../features/notification/notificationSlice';

export default function NotificationToggle() {
  const [open, setOpen] = useState(false);
  const [notifCount, setNotifCount] = useState(0);
  const [anchorElement, setAnchorElement] = useState<HTMLButtonElement | null>(null);


  const user = useAppSelector(state => state.user.user);
  const notifications = useAppSelector(state => state.notifications.list);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchNotifs = async () => {
      if (user) {
        const result = await apiGetUserNotifications(user.id);
        dispatch(setUserNotifications(result.payload));
      }
    };
    fetchNotifs();
    setNotifCount(notifications.length);
  }, [user]);

  function handleClick(event: MouseEvent<HTMLButtonElement>){
    setOpen(!open);
    setAnchorElement(event.currentTarget);
    setNotifCount(0);
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
          <Badge badgeContent={notifCount} color="primary">
            <NotificationsIcon />
          </Badge>
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
