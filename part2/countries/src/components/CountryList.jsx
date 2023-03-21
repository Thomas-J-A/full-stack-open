import Button from './Button';

const CountryList = ({ countries, setQuery }) => {
  return (
    <ul>
      {countries.map((c) => (
        <li key={c.cca2}>
          {c.name.common}
          <Button handleClick={() => setQuery(c.name.common)} text='Show' />
        </li>
      ))}
    </ul>
  );
};

export default CountryList;
