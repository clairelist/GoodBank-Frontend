
export class LoanDetails {
  // account: number;
  id: number;
  reason: string;
  initialAmount: number;
  balance: number;
  creationDate: Date;


    constructor(
      // _account: number,
      _id: number,
      _reason: string,
      _initialAmount: number,
      _balance: number,
      _creationDate: Date,
    ) {
      // this.account = _account;
      this.id = _id;
      this.reason = _reason;
      this.initialAmount = _initialAmount;
      this.balance = _balance;
      this.creationDate = _creationDate;
    }
  }