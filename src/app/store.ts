import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import accountReducer from '../features/account/accountSlice';
import creditCardReducer from '../features/credit/creditCardSlice';
import creditCardTransactionReducer from '../features/credit/creditCardTransactionSlice';
import notificationReducer from '../features/notification/notificationSlice';
import userReducer from '../features/user/userSlice';

export const store = configureStore({
  reducer: {
    account: accountReducer,
    user: userReducer,
    creditCard: creditCardReducer,
    creditCardTransaction: creditCardTransactionReducer,
    notifications: notificationReducer,
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
