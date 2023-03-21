const CapitalWeather = ({ capital, weatherData }) => (
  <div>
    <h2>Weather in {capital}</h2>
    <table>
      <tbody>
        <tr>
          <th>Temperature</th>
          <td>{weatherData.main.temp} Celsius</td>
        </tr>
        <tr>
          <th>Wind</th>
          <td>{weatherData.wind.speed} m/s</td>
        </tr>
      </tbody>
    </table>
    <img src={`https://openweathermap.org/img/wn/${ weatherData.weather[0].icon }@2x.png`} alt="" />
  </div>
);

export default CapitalWeather;
