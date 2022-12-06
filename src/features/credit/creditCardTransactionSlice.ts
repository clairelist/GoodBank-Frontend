import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { CreditCardTransaction } from "../../models/CreditCardTransaction";

export interface CreditCardTransactionState {
    currentCreditCardTransaction: CreditCardTransaction;
    creditCardTransactions: CreditCardTransaction[];
}

const initialState: CreditCardTransactionState = {
    currentCreditCardTransaction: {
        id: 0,
        amount: 0,
        description: "",
        type: "",
        creditCardId: 0,
        accountId: 0,
    },
    creditCardTransactions: []
};

export const creditCardTransactionSlice = createSlice({
    name: `creditCardTransaction`,
    initialState,
    reducers: {
        // set payload to curent state
        setCurrentCreditCardTransaction: (state, action: PayloadAction<CreditCardTransaction>) => {
            state.currentCreditCardTransaction = action.payload;
        },
        setUserCreditCardTransactions: (state, action: PayloadAction<CreditCardTransaction[]>) => {
            state.creditCardTransactions = [...action.payload];
        }
    }
})

export const {setCurrentCreditCardTransaction, setUserCreditCardTransactions} = creditCardTransactionSlice.actions;
export const selectCurrentCreditCardTransaction = (state: RootState) => state.creditCardTransaction.currentCreditCardTransaction;
export const retrieveUserCreditCardTransactions = (state: RootState) => state.creditCardTransaction.creditCardTransactions;
export default creditCardTransactionSlice.reducer;