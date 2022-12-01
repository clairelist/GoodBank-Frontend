import { idText } from "typescript";
import { CreditCard } from "../../models/CreditCard";
import bankingClient, { bankingApiResponse } from './bankingClient';

const baseURL = '/credit-card';

export const apiGetCreditCards = async (
    id: number
): Promise<bankingApiResponse> => {
    const response = await bankingClient.get<any>(`${baseURL}/${id}`, {
        withCredentials: true,
    });
    return { status: response.status, payload: response.data };
};