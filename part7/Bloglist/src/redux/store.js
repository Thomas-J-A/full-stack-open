import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import notificationReducer from './notificationSlice';

const store = configureStore({
  reducer: {
    notification: notificationReducer,
  },
});

setupListeners(store.dispatch);

export default store;
