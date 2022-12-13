import { CreditCard } from '../../models/CreditCard';
import { CreditCardTransaction } from '../../models/CreditCardTransaction';
import bankingClient, { BankingApiResponse } from './bankingClient';

const baseURL = '/credit-card';

export const apiGetCreditCards = async (
    id: number,
    token: string
): Promise<BankingApiResponse> => {
    const response = await bankingClient.get<any>(`${baseURL}/${id}`, {
        headers: { 'authorization': token },
        withCredentials: true,
    });
    return { status: response.status, headers: response.headers, payload: response.data };
};

//we need an id, and a cctransaction, tokens soontm
export const apiMakeCreditCardPayment = async (
    creditCardTransaction: CreditCardTransaction,
    userId: number,
    token: string,
): Promise<BankingApiResponse> => {
    const response = await bankingClient.post<number>(
        `${baseURL}/${userId}/payment`,
        creditCardTransaction, 
        {
            //fix token
        headers: { 'authorization': 'token'},
        withCredentials: true,
        }
    );
    return { status: response.status, headers: response.headers, payload: response.data };
};

export const apiCreateCCApplication = async (
    initialAmount: number,
    token: string
): Promise<BankingApiResponse> => {
    const response = await bankingClient.post<CreditCard>(
        `${baseURL}/credit-card-application`,
        { initialAmount },
        {
            headers: { 'authorization': returntoken },
            withCredentials: true
        }
    );
    return {status: response.status, headers: response.headers, payload: response.data as CreditCard}
};

export const apiGetCreditCardTransactions = async (
    token: string,
    cardId: number
): Promise<BankingApiResponse> => {
    const response = await bankingClient.get<CreditCardTransaction[]>(
        `${baseURL}/${cardId}/transactions`,
        {
            headers: { 'authorization': token },
            withCredentials: true
        }
    );
    return {status: response.status, headers: response.headers, payload: response.data}
};
export const apiGetPendingCreditCards = async (
    token: string
): Promise<BankingApiResponse> => {
    const response = await bankingClient.get<CreditCard[]>(`${baseURL}/get-pending`, {
        headers: { 'authorization': token },
        withCredentials: true,
    });
    return { status: response.status, headers: response.headers, payload: response.data as CreditCard[] };
};

export const apiUpdateCreditCardStatus = async (
    status: string,
    id: number,
    token: string
): Promise<BankingApiResponse> => {
    const response = await bankingClient.put<any>(`${baseURL}/update-status`, 
    {id, status},
    {
        headers: { 'authorization': token },
        withCredentials: true,
    });
    return { status: response.status, headers: response.headers, payload: response.data };
};

