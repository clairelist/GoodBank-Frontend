import { Account } from "./Account";

export interface Transfer {
amount: number;
account: Account;
type: string;
toAccountId: number;
}

