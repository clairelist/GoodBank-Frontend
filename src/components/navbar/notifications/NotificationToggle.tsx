import { Badge, IconButton, Popover, Tooltip } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationList from './NotificationList';
import { useState, MouseEvent, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { apiGetUserNotifications, apiSetNotificationsAsSeen } from '../../../remote/banking-api/notification.api';
import { setNotificationTimer, setUserNotifications } from '../../../features/notification/notificationSlice';
import { countUnseen } from '../../../features/notification/notificationUtils';

export default function NotificationToggle() {
  const [open, setOpen] = useState(false);
  const [anchorElement, setAnchorElement] = useState<HTMLButtonElement | null>(null);
  const [seenCount, setSeenCount] = useState(0);

  const user = useAppSelector(state => state.user.user);
  const notifications = useAppSelector(state => state.notifications.list);
  const dispatch = useAppDispatch();
  
  const fetchNotifs = async () => {
    if (user) {
      const result = await apiGetUserNotifications(user.id);
      dispatch(setUserNotifications(result.payload));
    }
  };

  // when user changes eg. login, fetch notifications
  // also start the notification check timer

  const NOTIFICATION_TIMER = 3000;
  useEffect(() => {
    fetchNotifs();
    dispatch(setNotificationTimer(setInterval(fetchNotifs, NOTIFICATION_TIMER)))
  }, [user]);

  // when notifications are updated, update the seen count
  useEffect(() => {
    setSeenCount(countUnseen(notifications));
  }, [notifications]);

  async function handleClick(event: MouseEvent<HTMLButtonElement>){
    //dont't open the notifications tab if there aren't any to see
    if (notifications.length < 1) {
      setOpen(false);
      setAnchorElement(null);
      return;
    }
    
    setOpen(!open);
    setAnchorElement(event.currentTarget);

    // marking notifs as seen if it hasn't already been done
    // then returning the updated notifications immediately
    if (!open && seenCount > 0) {
      const ids: string[] = notifications.map(n => n.id);
      const result = await apiSetNotificationsAsSeen(ids);
      dispatch(setUserNotifications(result.payload));
    }
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
          <Badge badgeContent={seenCount} color="primary">
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