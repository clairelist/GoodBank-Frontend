export class Account {
  id: number;
  name: string;
  balance: number;
  accountType: string;
  creationDate: any;

  constructor(
    _id: number,
    _name: string,
    _balance: number,
    _accountType: string,
    _creationDate: any
  ) {
    this.id = _id;
    this.name = _name;
    this.balance = _balance;
    this.accountType = _accountType;
    this.creationDate = _creationDate;
  }
}
