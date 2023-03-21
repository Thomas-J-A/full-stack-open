import { useState, useEffect } from 'react';
import axios from 'axios';

import Error from './Error';
import SingleCountryInfo from './SingleCountryInfo';
import CapitalWeather from './CapitalWeather';

const SingleCountry = ({ country }) => {
	const [lat, setLat] = useState(country.latlng[0]);
	const [lon, setLon] = useState(country.latlng[1]);
	const [weatherData, setWeatherData] = useState(null);
	const [errorMsg, setErrorMsg] = useState(null);
	
	const apiKey = import.meta.env.VITE_API_KEY;
	const url = (
		`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
	);

	useEffect(() => {
		axios
			.get(url)
			.then((res) => setWeatherData(res.data))
			.catch((err) => {
				setErrorMsg('Weather data currently unavailable.');
			});
	}, [country]);

	const languageList = (
		<ul>
			{Object.values(country.languages).map((lang) => (
				<li key={lang}>{lang}</li>
			))}
		</ul>
	);

	return (
		<div>
			<h1>{country.name.common}</h1>
			<SingleCountryInfo country={country} />
			<p>Languages:</p>
			{languageList}
			<img className="countryFlag" src={country.flags.png} alt={country.flags.alt} />
      {errorMsg && <Error message={errorMsg} />}
			{weatherData && <CapitalWeather capital={country.capital[0]} weatherData={weatherData} />}
		</div>
	);
};

export default SingleCountry;
