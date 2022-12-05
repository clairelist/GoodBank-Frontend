import { Account } from '../../models/Account';
import { Transaction } from '../../models/Transaction';
import bankingClient, { bankingApiResponse } from './bankingClient';

const baseURL = '/account';

export const apiGetAccounts = async (
  id: number
): Promise<bankingApiResponse> => {
  const response = await bankingClient.get<Account[]>(`${baseURL}/${id}`, {
    withCredentials: true,
  });
  return { status: response.status, payload: response.data as Account[] };
};

export const apiCreateAccount = async (
  account: Account,
  userId: string
): Promise<bankingApiResponse> => {
  let num = account.balance;
  account.balance = Math.round((num + Number.EPSILON) * 100) / 100;
  const response = await bankingClient.post<Account>(`${baseURL}`, account, {
    headers: { 'Current-User': userId },
    withCredentials: true,
  });
  return { status: response.status, payload: response.data };
};

export const apiGetTransactions = async (
  id: number,
  page: number
): Promise<bankingApiResponse> => {
  const response = await bankingClient.get<Transaction[]>(
    `${baseURL}/${id}/transaction/${page}`,
    { withCredentials: true }
  );
  response.data.forEach((transaction) => {
    let num = transaction.amount;
    transaction.amount = Math.round((num + Number.EPSILON) * 100) / 100;
  });
  return { status: response.status, payload: response.data };
};

export const apiGetTotalTransactionSize = async (id: number): Promise<bankingApiResponse> => {
  const response = await bankingClient.get<Transaction[]>(
    `${baseURL}/${id}/transactions`,
    { withCredentials: true });
    return { status: response.status, payload: response.data };
}

export const apiUpsertTransaction = async (
  id: number,
  transaction: Transaction
): Promise<bankingApiResponse> => {
  let num = transaction.amount;
  transaction.amount = Math.round((num + Number.EPSILON) * 100) / 100;
  const response = await bankingClient.post<any>(
    `${baseURL}/${id}/transaction`,
    transaction,
    { withCredentials: true }
  );
  return { status: response.status, payload: response.data };
};

export const apiTransferTransaction = async (
id: number,
transaction: Transaction
): Promise<bankingApiResponse> => {
  const response = await bankingClient.post<Transaction[]>(
  `${baseURL}/${id}/transfer`,
  transaction,
  { withCredentials: true }
    );
    response.data.forEach((transaction) => {
      let num = transaction.amount;
    transaction.amount = Math.round((num + Number.EPSILON) * 100) / 100;
    });
    return { status: response.status, payload: response.data };
};
