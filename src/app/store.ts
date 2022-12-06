import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import accountReducer from '../features/account/accountSlice';
import userReducer from '../features/user/userSlice';
import notificationReducer from '../features/notification/notificationSlice'
import creditCardReducer from '../features/credit/creditCardSlice';

export const store = configureStore({
  reducer: {
    account: accountReducer,
    user: userReducer,
    notifications: notificationReducer,
    creditCard: creditCardReducer
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