import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';

export interface AccountState {
    id: number;
    name: string;
    balance: number;
    description: string;
    creationDate: any;
    accountType: string;
    /*user? */    
}

const initialState: AccountState = {
    id: 0,
    name: "",
    balance: 0,
    description: "",
    creationDate: "",
    accountType: "",
}

// export const accountSlice = createSlice({
//     name: 'account',
//     initialState,
//     reducers: {
//         createAccount: (state) => {
            
//         }
//     }
// })