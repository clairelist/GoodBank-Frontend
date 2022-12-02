export class Loan {
  userId: number;
  reason: string;
  amount: number;

    constructor(
      _userId: number,
      _reason: string,
      _amount: number
    ) {
      this.userId = _userId;
      this.reason = _reason;
      this.amount = _amount;
    }
  }
