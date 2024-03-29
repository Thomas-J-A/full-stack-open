import { useState } from 'react';

const useField = (type = 'text') => {
  const [value, setValue] = useState('');

  const onChange = (e) => {
    setValue(e.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

export default useField;
