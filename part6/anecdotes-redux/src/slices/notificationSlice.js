import { createSlice } from '@reduxjs/toolkit';

const initialState = null;

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification: (state, { payload }) => {
      const formattedMsg = payload.msg.length > 20
        ? `${payload.msg.substring(0, 20)}...`
        : payload.msg;

      if (payload.context === 'vote') {
        return `You upvoted "${formattedMsg}"`;
      }
      
      // context === 'create'
      return `You added "${formattedMsg}"`;
    },
    hideNotification: () => null,
  },
});

export const { showNotification, hideNotification } = notificationSlice.actions;

export const showNotificationAsync = ({ context, msg }) => (dispatch) => {
  dispatch(showNotification({ context, msg }));

  setTimeout(() => dispatch(hideNotification()), 5000);
};

export default notificationSlice.reducer;
