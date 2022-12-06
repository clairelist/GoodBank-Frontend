import {
  Notification,
  NotificationCreationRequest,
  NotificationType,
} from '../../models/Notification';
import { apiSaveNotification } from '../../remote/banking-api/notification.api';

export const createWarningNotification = async (
  forUserId: number,
  message: string
) => {
  const newNotification: NotificationCreationRequest = {
    userId: forUserId,
    type: NotificationType.WARNING,
    referencesId: undefined,
    body: message,
  };

  const result = await apiSaveNotification(newNotification);
  return result;
};

export const createActivitytNotification = async (
  forUserId: number,
  accountId: number,
  message: string
) => {
  const newNotification: NotificationCreationRequest = {
    userId: forUserId,
    type: NotificationType.ACTIVITY,
    referencesId: accountId,
    body: message,
  };

  const result = await apiSaveNotification(newNotification);
  return result;
};

export const countUnseen = (notifs: Notification[]) => {
  let count = 0;
  notifs.forEach((n) => {
    count += n.seen ? 0 : 1;
  });
  return count;
};