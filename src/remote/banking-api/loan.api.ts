import { Loan } from '../../models/Loan';
import bankingClient, { bankingApiResponse } from './bankingClient';

const baseURL = '/loan';

export const apiCreateLoan = async (
//   account: number,
  userId: number,
  reason: string,
  amount: number
): Promise<bankingApiResponse> => {
  const response = await bankingClient.post<Loan>(
    `${baseURL}`,
    { userId, reason, amount },
    {
      headers: { 'Current-User': userId },
      withCredentials: true,
    }
  );
  return { status: response.status, payload: response.data };
};
