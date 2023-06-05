import { useSelector } from 'react-redux';

import { selectNotification } from '../../../redux/notificationSlice';

import './Notification.css';

const Notification = () => {
  const notificationMsg = useSelector(selectNotification);

  if (!notificationMsg) {
    return null;
  }

  return <div className="notification">{notificationMsg}</div>;
};

export default Notification;
