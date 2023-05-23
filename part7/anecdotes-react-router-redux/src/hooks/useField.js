import { useState } from 'react';

const useField = (type = 'text') => {
  const [value, setValue] = useState('');

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const reset = () => setValue('');

  return {
    type,
    value,
    onChange,
    reset,
  };
};

export default useField;
