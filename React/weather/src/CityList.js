import { useContext } from "react";
import { WeatherContext } from "./App";

export default function CityList(props) {
  const context = useContext(WeatherContext);
  if (context?.cities.length === 0) return null;
  return (
    <table className="city-list" border="1" cellPadding="5px" cellSpacing="1px">
      <thead>
        <tr>
          <th>City</th>
          <th>Temperature</th>
          <th>Feels Like</th>
          <th>Humidity</th>
        </tr>
      </thead>
      <tbody>
        {context.cities.map((city) => (
          <tr key={city.id}>
            <td>{city.name}, {city.sys.country}</td>
            <td>{city.main.temp}&deg;C</td>
            <td>{city.main.feels_like}&deg;C</td>
            <td>{city.main.humidity}%</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
