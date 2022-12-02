export class CreditCard {
    id: number;
    cardNumber: number;
    ccv: number;
    expirationDate: any;
    totalLimit: number;
    availableBalance: number;

constructor(
        _id: number,
        _cardNumber: number,
        _ccv: number,
        _expirationDate: any,
        _totalLimit: number,
        _availableBalance: number, 
    ){
        this.id = _id;
        this.cardNumber = _cardNumber;
        this.ccv = _ccv;
        this.expirationDate = _expirationDate;
        this.totalLimit = _totalLimit;
        this.availableBalance = _availableBalance;
    }
}