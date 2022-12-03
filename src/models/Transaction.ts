import { Account } from "./Account";

export class Transaction {
  id: number;
  amount: number;
  account: Account | undefined;
  description: string;
  type: string;
  toAccount: number | undefined;

  constructor(
    _id: number,
    _amount: number,
    _account: Account | undefined,
    _description: string,
    _type: string,
    _toAccount: number | undefined
  ) {
    this.id = _id;
    this.amount = _amount;
    this.account = _account;
    this.description = _description;
    this.type = _type;
    this.toAccount= _toAccount;
  }
}
