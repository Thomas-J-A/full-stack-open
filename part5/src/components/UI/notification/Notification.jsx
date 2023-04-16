import PropTypes from 'prop-types';

import './notification.css';

const Notification = ({ message }) => (
  <div className="notification">
    {message}
  </div>
);

Notification.propTypes = {
  message: PropTypes.string.isRequired,
};

export default Notification;
