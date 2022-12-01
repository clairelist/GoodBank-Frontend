import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import accountReducer from '../features/account/accountSlice';
import userReducer from '../features/user/userSlice';

export const store = configureStore({
  reducer: {
    account: accountReducer,
    user: userReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
