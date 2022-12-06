import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import accountReducer from '../features/account/accountSlice';
import userReducer from '../features/user/userSlice';
import creditCardReducer from '../features/credit/creditCardSlice';
import creditCardTransactionReducer from '../features/credit/creditCardTransactionSlice';

export const store = configureStore({
  reducer: {
    account: accountReducer,
    user: userReducer,
    creditCard: creditCardReducer,
    creditCardTransaction: creditCardTransactionReducer
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
