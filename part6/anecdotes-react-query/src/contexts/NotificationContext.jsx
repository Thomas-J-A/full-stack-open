import { useReducer, useContext, createContext } from 'react';

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SHOW_NOTIFICATION':
      const { payload } = action;
      const formattedMsg = payload.msg.length > 20
        ? `${payload.msg.substring(0, 20)}...`
        : payload.msg;

      if (payload.context === 'vote') {
        return `You upvoted "${formattedMsg}"`;
      }

      // context === 'create'
      return `You added "${formattedMsg}"`;
    case 'HIDE_NOTIFICATION':
      return null;
    default:
      return state;
  }
};

const NotificationContext = createContext();

export const NotificationContextProvider = ({ children }) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer, null,
  );

  return (
    <NotificationContext.Provider value={ [notification, notificationDispatch] }>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationValue = () => {
  const valueAndDispatch = useContext(NotificationContext);
  return valueAndDispatch[0];
};

export const useNotificationDispatch = () => {
  const valueAndDispatch = useContext(NotificationContext);
  return valueAndDispatch[1];
};

export default NotificationContext;
