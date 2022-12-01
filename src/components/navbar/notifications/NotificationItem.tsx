import {
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { Notification } from '../../../models/Notification';
import CloseIcon from '@mui/icons-material/Close';
import { apiDismissUserNotification } from '../../../remote/banking-api/notification.api';
import { setUserNotifications } from '../../../features/notification/notificationSlice';

interface INotificationItemProps {
  notification: Notification;
}

export default function NotificationItem(props: INotificationItemProps) {
  const { notification } = props;
  const user = useAppSelector(state => state.user.user);
  const notifications = useAppSelector(state => state.notifications.list);
  const dispatch = useAppDispatch();

  const dismissNotification = async () => {
    if (user) {
      const result = await apiDismissUserNotification(user.id, notification.id);
      dispatch(setUserNotifications(result.payload))
    }
  }

  return (
    <ListItem>
      <ListItemButton 
      sx={{maxWidth: 58}}
      onClick={dismissNotification}
      >
        <CloseIcon />
      </ListItemButton>
      <ListItemButton>
        <ListItemText primary={notification.body} />
      </ListItemButton>
    </ListItem>
  );
}
