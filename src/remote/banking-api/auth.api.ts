import bankingClient, { BankingApiResponse } from './bankingClient';

const baseURL = '/auth';

export const apiLogin = async (
  email: string,
  password: string,
): Promise<BankingApiResponse> => {
  const response = await bankingClient.post<any>(`${baseURL}/login`, {
    email: email,
    password: password,
  });
  return { status: response.status, headers: response.headers, payload: response.data };
};

export const apiLoginToken = async (
  token: string
): Promise<BankingApiResponse> => {
  const response = await bankingClient.post<any>(`${baseURL}/token-login`, { token });
  return { status: response.status, headers: response.headers, payload: response.data };
};

export const apiLogout = async (): Promise<BankingApiResponse> => {
  const response = await bankingClient.post<any>(`${baseURL}/logout`);
  sessionStorage.clear();
  return { status: response.status, headers: response.headers, payload: response.data };
};

export const apiRegister = async (
  email: string,
  password: string,
  firstName: string,
  lastName: string
): Promise<BankingApiResponse> => {
  const response = await bankingClient.post<any>(`${baseURL}/register`, {
    email: email,
    password: password,
    firstName: firstName,
    lastName: lastName
  });
  return { status: response.status, headers: response.headers, payload: response.data };
};