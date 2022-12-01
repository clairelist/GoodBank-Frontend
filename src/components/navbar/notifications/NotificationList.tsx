import { Box, List } from '@mui/material';
import { useEffect, useContext, useState } from 'react';
import { UserContext } from '../../../context/user.context';
import { Notification } from '../../../models/Notification';
import { apiGetUserNotifications } from '../../../remote/banking-api/notification.api';
import NotificationItem from './NotificationItem';

export default function NotificationList() {
  const { user } = useContext(UserContext);
  const [notifications, setNotifications] = useState<
    Notification[] | undefined
  >();

  useEffect(() => {
    const fetchNotifs = async () => {
      if (user) {
        const result = await apiGetUserNotifications(user.id);
        setNotifications(result.payload);
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
