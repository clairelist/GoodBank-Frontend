import { Account } from '../../models/Account';
import { Transaction } from '../../models/Transaction';
import bankingClient, { bankingApiResponse } from './bankingClient';

const baseURL = '/account';

export const apiGetAccounts = async (
  id: number
): Promise<bankingApiResponse> => {
  const response = await bankingClient.get<any>(`${baseURL}/${id}`, {
    withCredentials: true,
  });
  let num = response.data.balance;
  response.data.balance = Math.round((num + Number.EPSILON) * 100) / 100;
  console.log(num)
  return { status: response.status, payload: response.data };
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
  id: number
): Promise<bankingApiResponse> => {
  const response = await bankingClient.get<Transaction[]>(
    `${baseURL}/${id}/transaction`,
    { withCredentials: true }
  );
  response.data.forEach((transaction) => {
    let num = transaction.amount;
    transaction.amount = Math.round((num + Number.EPSILON) * 100) / 100;
  });
  return { status: response.status, payload: response.data };
};

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
