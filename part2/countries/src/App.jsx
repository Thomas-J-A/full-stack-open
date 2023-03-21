import { useState, useEffect } from 'react';
import axios from 'axios';

import Filter from './components/Filter';
import Content from './components/Content';
import Error from './components/Error';

import './index.css';

const App = () => {
  const [query, setQuery] = useState('');
  const [allCountries, setAllCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);

  // Fetch country data
  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then((res) => {
        setAllCountries(res.data);
      })
      .catch((err) => {
        setErrorMsg('Country data currently unavailable.');
      });
  }, []);

  useEffect(() => {
    if (query) {
      const filteredCountries = allCountries.filter((c) => (
        c.name.common.toLowerCase().includes(query.toLowerCase())
      ));
      
      setFilteredCountries(filteredCountries);
    } 
  }, [query]);

  // Control search input
  const handleChangeQuery = (e) => setQuery(e.target.value);

  // Display an error message if request to Countries API fails
  if (errorMsg) return <Error message={errorMsg} />;

  // Ensure users can't search for a country
  // when that data hasn't been loaded
  if (allCountries.length === 0) return null;

  return (
    <div>
      <Filter query={query} handleChangeQuery={handleChangeQuery} />
      <Content 
        filteredCountries={filteredCountries}
        query={query}
        setQuery={setQuery}
      />
    </div>
  );
};

export default App;
