import PropTypes from 'prop-types';

import * as S from './Error.styled';

const Error = ({ message }) => <S.Error>{message}</S.Error>;

Error.propTypes = {
  message: PropTypes.string.isRequired,
};

export default Error;
