import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Account } from '../../models/Account';
import { Transaction } from '../../models/Transaction';

export interface AccountState {
    currentAccount: Account;
    userAccounts: Account[];
    accountTransactions: Transaction[];
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
        accountType: '',
        creationDate: ""
    },
    userAccounts: [],
    accountTransactions: []
    
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
        },
        setAccountTransactions: (state, action: PayloadAction<Transaction[]>) => {
            state.accountTransactions = [...action.payload];
        }
    }
})

export const { setCurrentAccount, setUserAccounts, setAccountTransactions } = accountSlice.actions;
export const selectCurrentAccount = (state: RootState) => state.account.currentAccount;
export const getUserAccounts = (state: RootState) => state.account.userAccounts;
export const getAccountTransactions = (state: RootState) => state.account.accountTransactions;

export default accountSlice.reducer;