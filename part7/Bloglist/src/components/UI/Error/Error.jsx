import PropTypes from 'prop-types';

import './Error.css';

const Error = ({ message }) => <div className="error">{message}</div>;

Error.propTypes = {
  message: PropTypes.string.isRequired,
};

export default Error;
