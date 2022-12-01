import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { Account } from '../../models/Account';
import { User } from '../../models/user';
import { apiLogin } from '../../remote/banking-api/auth.api';
import { useNavigate } from 'react-router-dom';

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

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
// export const incrementAsync = createAsyncThunk(
//   'counter/fetchCount',
//   async (amount: number) => {
//     const response = await fetchCount(amount);
//     // The value we return becomes the `fulfilled` action payload
//     return response.data;
//   }
// );

// export const signInAsync = createAsyncThunk(
//   'user/signIn',
//   async (formData: { email: FormDataEntryValue | null; password: any; navigate: Function }) => {
//     const response = await apiLogin(
//       `${formData.email}`,
//       `${formData.password}`
//     );
//     if (response.status >= 200 && response.status < 300) {
//       // setUser(response.payload);
      
//       return response.payload;
//     }
//   }
// );



export const userSlice = createSlice({
  name: 'user',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    signIn: (state, action: PayloadAction<User>) => {
      
      state.user = action.payload;
    
    // Use the PayloadAction type to declare the contents of `action.payload`
    
  }
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(signInAsync.pending, (state) => {
  //       state.status = 'loading';
  //     })
  //     .addCase(signInAsync.fulfilled, (state, action) => {

  //       state.status = 'idle';
  //       state.user = action.payload;

  //     })
  //     .addCase(signInAsync.rejected, (state) => {
  //       state.status = 'failed';
  //     });
  // },
}});

//TODO we have to fix this at some point.

export const { signIn } = userSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`

export const selectUser = (state: RootState) => state.user.user;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.

// export const incrementIfOdd =
//   (amount: number): AppThunk =>
//   (dispatch, getState) => {
//     const currentValue = selectCount(getState());
//     if (currentValue % 2 === 1) {
//       dispatch(incrementByAmount(amount));
//     }
//   };

export default userSlice.reducer;
