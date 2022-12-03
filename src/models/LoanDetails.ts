
export class LoanDetails {
  userId: number;
  loanID: number;
  reason: string;
  initialAmount: number;
  balance: number;
  creationDate: Date;
  status: string;


    constructor(
      _userId: number,
      _loanID: number,
      _reason: string,
      _initialAmount: number,
      _balance: number,
      _creationDate: Date,
      _status: string
    ) {
      this.userId = _userId;
      this.loanID = _loanID;
      this.reason = _reason;
      this.initialAmount = _initialAmount;
      this.balance = _balance;
      this.creationDate = _creationDate;
      this.status = _status;
    }
  }