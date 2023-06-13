import PropTypes from 'prop-types';

import * as S from './Button.styled';

const Button = ({ text, handleClick }) => (
  <S.Button type="button" onClick={handleClick}>
    {text}
  </S.Button>
);

Button.propTypes = {
  text: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default Button;
