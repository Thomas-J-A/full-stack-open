import { useSelector } from 'react-redux';

import selectNotification from '../../../selectors/selectNotification';

import './Notification.css';

const Notification = () => {
  const notification = useSelector(selectNotification);

  if (!notification) {
    return null;
  }

  return (
    <div className="notification">
      {notification}
    </div>
  );   
};

export default Notification;
