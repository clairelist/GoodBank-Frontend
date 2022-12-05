import bankingClient, { bankingApiResponse } from './bankingClient';

const baseURL = '/profile'

export const apiUpdate = async (
    email: string,
    firstName: string,
    lastName: string,
    address: string,
    city: string,
    state: string,
    zip: number
): Promise<bankingApiResponse> => {
    const response = await bankingClient.patch<any>(`${baseURL}/update`, {
    withCredentials: true,
    });
    return { status: response.status, headers: response.headers, payload: response.data };
};