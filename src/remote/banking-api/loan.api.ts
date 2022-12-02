import { Loan } from '../../models/Loan';
import { LoanDetails } from '../../models/LoanDetails';
import bankingClient, { bankingApiResponse } from './bankingClient';

const baseURL = '/loans';

export const apiCreateLoan = async (
  //   account: number,
  userId: number,
  reason: string,
  initialAmount: number
): Promise<bankingApiResponse> => {
  const response = await bankingClient.post<LoanDetails>(
    `${baseURL}/${userId}`,
    { reason, initialAmount },
    {
      headers: { 'Current-User': userId },
      withCredentials: true,
    }
  );
  return { status: response.status, payload: response.data as LoanDetails };
};

export const apiGetLoans = async (
//   account: number,
  userId: number,
): Promise<bankingApiResponse> => {
  const response = await bankingClient.get<LoanDetails[]>(
    `${baseURL}/${userId}`,
    {
      headers: { 'Current-User': userId },
      withCredentials: true,
    }
  );
  return { status: response.status, payload: response.data as LoanDetails[] };
};


