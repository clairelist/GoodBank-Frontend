import bankingClient, { bankingApiResponse } from './bankingClient';
import { User } from '../../models/user';
import State  from '../../components/profile/Profile';

const baseURL = '/profile'

export const apiUpdate = async (
    email: string,
    firstName: string,
    lastName: string,
    address: string,
    city: string,
    state: string,
    zip: number,
    token: string
): Promise<bankingApiResponse> => {
    const response = await bankingClient.patch<any>(
    `${baseURL}/update`,
    {
      email,
      firstName,
      lastName,
      address,
      city,
      state,
      zip,
      headers: { 'authorization': token },
      withCredentials: true,
    });
    return { status: response.status, headers: response.headers, payload: response.data };
};