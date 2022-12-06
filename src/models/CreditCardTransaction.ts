export class CreditCardTransaction {
    id: number;
    amount: number;
    description: string;
    type: string;
    creditCardId: number;
    accountId: number;

    constructor(
    _id: number,
    _amount: number,
    _description: string,
    _type: string,
    _creditCardId: number,
    _accountId: number
        ) {
            this.id = _id;
            this.amount = _amount;
            this.description = _description;
            this.type = _type;
            this.creditCardId = _creditCardId;
            this.accountId = _accountId;
        }    
}

