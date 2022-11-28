import bankingClient, { bankingApiResponse } from './bankingClient';

const baseURL = '/auth';

export const apiLogin = async (
  email: string,
  password: string
): Promise<bankingApiResponse> => {
  const response = await bankingClient.post<any>(`${baseURL}/login`, {
    email: email,
    password: password,
  });
  return { status: response.status, payload: response.data };
};

export const apiLogout = async (): Promise<bankingApiResponse> => {
  const response = await bankingClient.post<any>(`${baseURL}/logout`);
  return { status: response.status, payload: response.data };
};

export const apiRegister = async (
  email: string,
  password: string
): Promise<bankingApiResponse> => {
  const response = await bankingClient.post<any>(`${baseURL}/register`, {
    email: email,
    password: password,
  });
  return { status: response.status, payload: response.data };
};