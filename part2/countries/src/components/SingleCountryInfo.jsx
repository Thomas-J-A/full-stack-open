const SingleCountryInfo = ({ country }) => (
	<table>
		<tbody>
			<tr>
				<th>Capital</th>
				<td>{country.capital[0]}</td>
			</tr>
			<tr>
				<th>Area</th>
				<td>{country.area}</td>
			</tr>
		</tbody>
	</table>
);

export default SingleCountryInfo;
