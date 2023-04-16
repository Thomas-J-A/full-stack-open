import PropTypes from 'prop-types';

import './error.css';

const Error = ({ message }) => (
  <div className="error">
    {message}
  </div>
);

Error.propTypes = {
  message: PropTypes.string.isRequired,
};

export default Error;
