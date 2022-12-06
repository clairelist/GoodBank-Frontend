import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Notification } from '../../models/Notification';

export interface NotificationsState {
  list: Notification[];
  ticker: NodeJS.Timer | undefined;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: NotificationsState = {
  list: [],
  ticker: undefined,
  status: 'idle',
};


export const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  
  reducers: {
    setUserNotifications: (state, action: PayloadAction<Notification[]>) => {
      state.list = action.payload;
    },
    setNotificationTimer: (state, action: PayloadAction<NodeJS.Timer | undefined>) => {
      clearInterval(state.ticker);
      state.ticker = action.payload;
    }
  },
});

export const { setUserNotifications, setNotificationTimer } = notificationSlice.actions;

export const selectNotification = (state: RootState) => state.notifications.list;
export const selectTicker = (state: RootState) => state.notifications.ticker;

export default notificationSlice.reducer;
