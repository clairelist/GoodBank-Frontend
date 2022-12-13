import {
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { Notification } from '../../../models/Notification';
import CloseIcon from '@mui/icons-material/Close';
import { apiDismissUserNotification } from '../../../remote/banking-api/notification.api';
import { setUserNotifications } from '../../../features/notification/notificationSlice';

interface INotificationItemProps {
  notification: Notification;
  setOpen: (nextOpen: boolean) => void;
}

export default function NotificationItem(props: INotificationItemProps) {
  const { notification, setOpen } = props;
  const user = useAppSelector(state => state.user.user);
  const dispatch = useAppDispatch();

  const dismissNotification = async () => {
    if (user) {
      const result = await apiDismissUserNotification(user.id, notification.id);
      dispatch(setUserNotifications(result.payload));
      if (result.payload.length <= 0) setOpen(false);
    }
  }

  let convertedTime = undefined;
  if (notification.time){
    convertedTime = new Date(notification.time).toLocaleTimeString('en-US');
  }

  return (
    <>
      <ListItem>
        <ListItemButton sx={{maxWidth: 58}} onClick={dismissNotification}>
          <CloseIcon />
        </ListItemButton>
        <ListItemButton>
          <ListItemText primary={notification.body} />
        </ListItemButton>
      </ListItem>
      {convertedTime ?
      <ListItem>
        <Typography sx={{fontSize: 12, textAlign: 'center'}}>{convertedTime}</Typography>
      </ListItem> : ''}
    </>
  );
}