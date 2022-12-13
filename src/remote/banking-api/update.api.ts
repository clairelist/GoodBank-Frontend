import { UserUpdateRequest } from '../../models/user';
import bankingClient, { BankingApiResponse } from './bankingClient';

const baseURL = '/user'

export const apiUpdate = async (
    user: UserUpdateRequest,
    token: string
): Promise<BankingApiResponse> => {
    const response = await bankingClient.patch<any>(
    `${baseURL}/profile`,
    user,
    {
      headers: { 'authorization': token },
      withCredentials: true
    })
    return { status: response.status, headers: response.headers, payload: response.data };
};