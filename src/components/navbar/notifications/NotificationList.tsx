import { Box, List } from '@mui/material';
import { useEffect} from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { apiGetUserNotifications } from '../../../remote/banking-api/notification.api';
import NotificationItem from './NotificationItem';
import { setUserNotifications } from '../../../features/notification/notificationSlice';

export default function NotificationList() {

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
  }, [user]);

  if (!notifications) return <>loading...</>;

  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <nav aria-label="notifications">
        <List>
          {notifications.map((n) => (
            <NotificationItem notification={n} />
          ))}
        </List>
      </nav>
    </Box>
  );
}
