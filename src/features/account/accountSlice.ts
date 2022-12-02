import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { Account } from '../../models/Account';

export interface AccountState {
    currentAccount: Account;
    userAccounts: Account[];
    /*id: number;
    name: string;
    balance: number;
    description: string;
    creationDate: any;
    accountType: string;
    user? */    
}

const initialState: AccountState = {
    currentAccount: {
        id: 0,
        name: "",
        balance: 0,
        accountType:'',
        creationDate: ""
    },
    userAccounts: []
    
};

export const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        setCurrentAccount: (state, action: PayloadAction<Account>) => {
            state.currentAccount = action.payload;
        },
        setUserAccounts: (state, action: PayloadAction<Account[]>) => {
            state.userAccounts = [...action.payload];
        }
    }
})

export const { setCurrentAccount, setUserAccounts } = accountSlice.actions;
export const selectCurrentAccount = (state: RootState) => state.account.currentAccount;
export const getUserAccounts = (state: RootState) => state.account.userAccounts;

export default accountSlice.reducer;