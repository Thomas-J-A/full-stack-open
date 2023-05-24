const Country = ({ country }) => {
  if (!country) {
    return null;
  }

  if (!country.found) {
    return (
      <div>
        Not found...
      </div>
    );
  }

  return (
    <div>
      <h3>{country.data.name.common}</h3>
      <p>{`Capital: ${country.data.capital[0]}`}</p>
      <p>{`Population: ${country.data.population}`}</p>
      <img src={country.data.flags.png} height="100" alt={country.data.flag.alt} />
    </div>
  );
};

export default Country;
