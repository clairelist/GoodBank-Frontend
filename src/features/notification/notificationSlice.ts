import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Notification } from '../../models/Notification';

export interface NotificationsState {
  list: Notification[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: NotificationsState = {
  list: [],
  status: 'idle',
};


export const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  
  reducers: {
    setUserNotifications: (state, action: PayloadAction<Notification[]>) => {
      state.list = action.payload;
    },
  },
});

export const { setUserNotifications } = notificationSlice.actions;

export const selectNotification = (state: RootState) => state.notifications.list;

export default notificationSlice.reducer;