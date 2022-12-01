import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { CreditCard } from "../../models/CreditCard";

export interface CreditState {
    currentCreditCard: CreditCard;
}

const initialState: CreditState = {
    currentCreditCard: {
        id: 0,
        cardNumber: 0,
        ccv: 0,
        expirationDate: "",
        totalLimit: 0,
        availableBalance: 0
    },
};

export const creditCardSlice = createSlice({
    name: 'creditCard',
    initialState,
    reducers: {
        setCurrentCreditCard: (state, action: PayloadAction<CreditCard>) => {
            state.currentCreditCard = action.payload;
        }
    }
})

export const {setCurrentCreditCard} = creditCardSlice.actions;
export const selectCurrentCreditCard = (state: RootState) => state.creditCard.currentCreditCard;

export default creditCardSlice.reducer;
