import { CreditCardTransaction } from '../../models/CreditCardTransaction';
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

//we need an id, and a cctransaction, tokens soontm
export const apiMakeCreditCardPayment = async (
    creditCardTransaction: CreditCardTransaction,
    userId: number,
    //token: string,
): Promise<bankingApiResponse> => {
    const response = await bankingClient.post<CreditCardTransaction[]>(
        `${baseURL}/${userId}/payment`,
        creditCardTransaction, 
        {
            //fix token
        headers: { 'authorization': 'token'},
        withCredentials: true,
        }
    );
    return { status: response.status, payload: response.data as CreditCardTransaction[] };
};