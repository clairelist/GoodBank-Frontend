import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Account } from '../../models/Account';
import { User } from '../../models/user';

export interface UserState {
  user: User | undefined;
  accounts: Account[] | undefined;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: UserState = {
  user: undefined,
  accounts: undefined,
  status: 'idle',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    signIn: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    // Use the PayloadAction type to declare the contents of `action.payload`
    },
    logout: (state) => {
      state.user = undefined;
    }
  }
});

// we have to fix this at some point.

export const { signIn, logout } = userSlice.actions;
export const selectUser = (state: RootState) => state.user.user;
export default userSlice.reducer;