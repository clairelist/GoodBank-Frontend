import { Box, List } from '@mui/material';
import { useAppSelector } from '../../../app/hooks';
import NotificationItem from './NotificationItem';

export default function NotificationList(props: {setOpen: (nextOpen: boolean) => void}) {
  
  const notifications = useAppSelector(state => state.notifications.list);

  if (!notifications) return <>loading...</>;

  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <nav aria-label="notifications">
        <List>
          {notifications.map((n) => (
            <NotificationItem key={n.id} notification={n} setOpen={props.setOpen} />
          ))}
        </List>
      </nav>
    </Box>
  );
}