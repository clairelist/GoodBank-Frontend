import bankingClient, { bankingApiResponse } from './bankingClient';
import { Notification } from '../../models/Notification';

const baseURL = '/notification';

export const apiGetUserNotifications = async (userId: number): Promise<bankingApiResponse> => {
  const response = await bankingClient.get<Notification[]>(`${baseURL}/${userId}`);
  return { 
    status: response.status, 
    payload: response.data 
  };
};

export const apiDismissUserNotification = async (userId: number, notificationId: string): Promise<bankingApiResponse> => {
  const response = await bankingClient.patch<Notification[]>(`${baseURL}/dismiss/${userId}/${notificationId}`);
  return { 
    status: response.status, 
    payload: response.data 
  };
};