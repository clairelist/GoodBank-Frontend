import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { Notification } from '../../../models/Notification';

interface INotificationItemProps {
  notification: Notification;
}

export default function NotificationItem(props: INotificationItemProps) {
  const { notification } = props;

  return (
    <ListItem disablePadding>
      <ListItemButton>
        <ListItemText primary={notification.body} />
      </ListItemButton>
    </ListItem>
  );
}
