import { createSlice } from '@reduxjs/toolkit';

const initialState = null;

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification: (state, { payload }) => {
      const formattedMsg =
        payload.msg.length > 20
          ? `${payload.msg.substring(0, 20)}...`
          : payload.msg;

      return payload.success
        ? `Blog added: "${formattedMsg}"`
        : `Error: ${formattedMsg}`;
    },
    hideNotification: () => null,
  },
});

export const { showNotification, hideNotification } = notificationSlice.actions;

export const showNotificationAsync =
  ({ success, msg }, timeInS = 5) =>
  (dispatch) => {
    const timeInMs = timeInS * 1000;

    dispatch(showNotification({ success, msg }));

    setTimeout(() => dispatch(hideNotification()), timeInMs);
  };

export const selectNotification = (state) => state.notification;

export default notificationSlice.reducer;
