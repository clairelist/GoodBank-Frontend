import { UserUpdateRequest } from '../../models/user';
import bankingClient, { bankingApiResponse } from './bankingClient';

const baseURL = '/user'

export const apiUpdate = async (
    user: UserUpdateRequest,
    token: string
): Promise<bankingApiResponse> => {
    const response = await bankingClient.patch<any>(
    `${baseURL}/profile`,
    user,
    {
      headers: { 'authorization': token },
      withCredentials: true
    })
    return { status: response.status, headers: response.headers, payload: response.data };
};