import { useState, useEffect } from 'react';

import axios from 'axios';

const baseUrl = 'https://restcountries.com/v3.1/';

const useCountry = (name) => {
  const [country, setCountry] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await axios.get(`${baseUrl}/name/${name}?fullText=true`);

        const obj = {
          data: { ...res.data[0] },
          found: true,
        };

        setCountry(obj);
      } catch (err) {
        console.log(err);
        setCountry({ data: null, found: false });
      }
    };

    if (name) {
      fetchDetails();
    }
  }, [name]);

  return country;
};

export default useCountry;
