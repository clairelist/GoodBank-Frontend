import { Badge, IconButton, Popover, Tooltip } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationList from './NotificationList';
import { useState, MouseEvent, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { apiGetUserNotifications, apiSetNotificationsAsSeen } from '../../../remote/banking-api/notification.api';
import { setUserNotifications } from '../../../features/notification/notificationSlice';
import { Notification } from '../../../models/Notification';

export default function NotificationToggle() {
  const [open, setOpen] = useState(false);
  const [anchorElement, setAnchorElement] = useState<HTMLButtonElement | null>(null);
  const [seenCount, setSeenCount] = useState(0);

  const user = useAppSelector(state => state.user.user);
  const notifications = useAppSelector(state => state.notifications.list);
  const dispatch = useAppDispatch();
  
  const countUnseen = (notifs: Notification[]) => {
    let count = 0;
    notifs.forEach(n => {
      count += n.seen ? 0 : 1;
    })
    return count;
  }
  
  const fetchNotifs = async () => {
    if (user) {
      const result = await apiGetUserNotifications(user.id);
      dispatch(setUserNotifications(result.payload));
    }
  };

  useEffect(() => {
    fetchNotifs();
  }, [user]);

  useEffect(() => {
    setSeenCount(countUnseen(notifications));
  }, [notifications]);

  async function handleClick(event: MouseEvent<HTMLButtonElement>){
    setOpen(!open);
    setAnchorElement(event.currentTarget);

    if (seenCount > 0) {
      // marking notifs as seen if it hasn't already been done
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
