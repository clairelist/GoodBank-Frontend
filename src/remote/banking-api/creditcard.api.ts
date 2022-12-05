import bankingClient, { bankingApiResponse } from './bankingClient';

const baseURL = '/credit-card';

export const apiGetCreditCards = async (
    id: number,
    token: string
): Promise<bankingApiResponse> => {
    const response = await bankingClient.get<any>(`${baseURL}/${id}`, {
        headers: { 'authorization': token },
        withCredentials: true,
    });
    return { status: response.status, headers: response.headers, payload: response.data };
};