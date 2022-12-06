import bankingClient, { bankingApiResponse } from './bankingClient';
import { Notification, NotificationCreationRequest } from '../../models/Notification';

const baseURL = '/notification';

export const apiSaveNotification = async (
  notification: NotificationCreationRequest
): Promise<bankingApiResponse> => {
  const response = await bankingClient.post<Notification>(baseURL, notification);

  return {
    status: response.status,
    headers: response.headers,
    payload: response.data
  }
}

export const apiGetUserNotifications = async (
  userId: number
): Promise<bankingApiResponse> => {
  const response = await bankingClient.get<Notification[]>(
    `${baseURL}/${userId}`
  );
  return {
    status: response.status,
    headers: response.headers, 
    payload: response.data,
  };
};

export const apiDismissUserNotification = async (
  userId: number,
  notificationId: string
): Promise<bankingApiResponse> => {
  const response = await bankingClient.patch<Notification[]>(
    `${baseURL}/dismiss/${userId}/${notificationId}`
  );
  return {
    status: response.status,
    headers: response.headers, 
    payload: response.data,
  };
};

export const apiSetNotificationsAsSeen = async (
  ids: string[]
): Promise<bankingApiResponse> => {
  const response = await bankingClient.patch<Notification[]>(
    `${baseURL}/seen`,
    ids
  );
  return {
    status: response.status,
    headers: response.headers, 
    payload: response.data,
  };
};
