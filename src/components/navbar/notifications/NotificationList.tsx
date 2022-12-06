import { Box, List } from '@mui/material';
import { useAppSelector } from '../../../app/hooks';
import NotificationItem from './NotificationItem';

export default function NotificationList() {
  
  const notifications = useAppSelector(state => state.notifications.list);

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