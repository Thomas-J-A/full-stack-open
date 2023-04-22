import {
  useState,
  forwardRef,
  useImperativeHandle,
} from 'react';
import PropTypes from 'prop-types';

import Button from '../UI/Button/Button';

const Toggleable = forwardRef(({ buttonLabel, children }, ref) => {
  const [isVisible, setIsVisible] = useState(false);

  const hideWhenVisible = { display: isVisible ? 'none' : '' };
  const showWhenVisible = { display: isVisible ? '' : 'none' };

  const toggleVisibility = () => {
    setIsVisible((prev) => !prev);
  };

  useImperativeHandle(ref, () => ({ toggleVisibility }));

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button text={buttonLabel} handleClick={toggleVisibility} />
      </div>
      <div style={showWhenVisible}>
        {children}
        <Button text="Cancel" handleClick={toggleVisibility} />
      </div>
    </div>
  );
});

Toggleable.displayName = 'Toggleable';

Toggleable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

export default Toggleable;
