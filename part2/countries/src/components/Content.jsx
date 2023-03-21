import CountryList from "./CountryList";
import SingleCountry from "./SingleCountry";

const Content = ({
	filteredCountries: countries,
	query,
	setQuery,
}) => {
	// Don't show any content if user hasn't entered a query yet
	if (!query) return null;

	if (countries.length > 10) {
		return <p>Too many matches, please be more specific.</p>
	}

	if (countries.length > 1 && countries.length <= 10) {
		return <CountryList countries={countries} setQuery={setQuery} />;
	}

	if (countries.length === 1) {
		return <SingleCountry country={countries[0]} />;
	}
};

export default Content;
