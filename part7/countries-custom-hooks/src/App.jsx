import { useState } from 'react';

import Country from './components/Country';

import useField from './hooks/useField';
import useCountry from './hooks/useCountry';

const App = () => {
  const nameInput = useField('text');
  const [countryName, setCountryName] = useState('');
  const country = useCountry(countryName);

  const fetch = (e) => {
    e.preventDefault();
    setCountryName(nameInput.value);
  };

  return (
    <div>
      <form onSubmit={fetch}>
        <input
          type={nameInput.type}
          value={nameInput.value}
          onChange={nameInput.onChange}
        />
        <button type="submit">Search</button>
      </form>

      <Country country={country} />
    </div>
  );
};

export default App;
