import bankingClient, { bankingApiResponse } from './bankingClient';

const baseURL = '/user'

export const apiUpdate = async (
    id: number,
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
    `${baseURL}/profile`,
    {
      id,
      email,
      firstName,
      lastName,
      address,
      city,
      state,
      zip
    },
    {
      headers: { 'authorization': token },
      withCredentials: true
    })
    return { status: response.status, headers: response.headers, payload: response.data };
};