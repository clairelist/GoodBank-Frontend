import {
  Notification,
  NotificationCreationRequest,
  NotificationType,
} from '../../models/Notification';
import { apiSaveNotification } from '../../remote/banking-api/notification.api';

export const createNotification = async (
  forUserId: number,
  type: NotificationType,
  referenceId: number | undefined,
  message: string
) => {
  const request: NotificationCreationRequest = {
    userId: forUserId,
    type: type,
    referencesId: referenceId,
    body: message,
  };

  const result = await apiSaveNotification(request);
  return result;
};

export const createWarningNotification = async (
  forUserId: number,
  message: string
) => {
  const request: NotificationCreationRequest = {
    userId: forUserId,
    type: NotificationType.WARNING,
    referencesId: undefined,
    body: message,
  };

  const result = await apiSaveNotification(request);
  return result;
};

export const countUnseen = (notifs: Notification[]) => {
  let count = 0;
  notifs.forEach((n) => {
    count += n.seen ? 0 : 1;
  });
  return count;
};
