import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { CreditCard } from "../../models/CreditCard";

export interface CreditState {
    currentCreditCard: CreditCard;
    creditCards: CreditCard[]
}

const initialState: CreditState = {
    currentCreditCard: {
        id: 0,
        cardNumber: 0,
        ccv: 0,
        expirationDate: "",
        totalLimit: 0,
        availableBalance: 0,
        status: ""
    },
    creditCards: []
};

export const creditCardSlice = createSlice({
    name: 'creditCard',
    initialState,
    reducers: {
        setCurrentCreditCard: (state, action: PayloadAction<CreditCard>) => {
            state.currentCreditCard = action.payload;
        },
        setUserCreditCards: (state, action: PayloadAction<CreditCard[]>) => {
            state.creditCards = [...action.payload];
        }
    }
})

export const {setCurrentCreditCard, setUserCreditCards} = creditCardSlice.actions;
export const selectCurrentCreditCard = (state: RootState) => state.creditCard.currentCreditCard;
export const retrieveUserCreditCards = (state: RootState) => state.creditCard.creditCards;
export default creditCardSlice.reducer;