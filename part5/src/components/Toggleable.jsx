import {
  useState,
  forwardRef,
  useImperativeHandle,
} from 'react';

import Button from './UI/button/Button';

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

export default Toggleable;
