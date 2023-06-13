import { useSelector } from 'react-redux';

import { selectNotification } from '../../../redux/features/notifications/notificationSlice';

import * as S from './Notification.styled';

const Notification = () => {
  const notificationMsg = useSelector(selectNotification);

  if (!notificationMsg) {
    return null;
  }

  return <S.Notification>{notificationMsg}</S.Notification>;
};

export default Notification;
