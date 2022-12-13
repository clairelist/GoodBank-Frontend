import { Notification, NotificationCreationRequest } from '../../models/Notification';
import bankingClient, { BankingApiResponse } from './bankingClient';

const baseURL = '/notification';

export const apiSaveNotification = async (
  notification: NotificationCreationRequest
): Promise<BankingApiResponse> => {
  const response = await bankingClient.post<Notification>(baseURL, notification);

  return {
    status: response.status,
    headers: response.headers,
    payload: response.data
  }
}

export const apiGetUserNotifications = async (
  userId: number
): Promise<BankingApiResponse> => {
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
): Promise<BankingApiResponse> => {
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
): Promise<BankingApiResponse> => {
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