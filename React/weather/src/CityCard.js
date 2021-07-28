import TemperatureBar from "./TemperatureBar";
import { IconBaseUrl } from "./contexts/Contstants";

export default function CityCard({ city, removeCity }) {
  const name = city.name;
  const country = city.sys.country;
  const { description, icon } = city.weather[0];
  const { feels_like, temp, temp_min, temp_max } = city.main;
  const iconUrl = `${IconBaseUrl}${icon}@2x.png`;

  return (
    <li className="city-card">
      <div className="flex-row card-header-bar">
        <p className="city-name">
          {name}, {country}
        </p>
        <button
          className="remove-city"
          type="button"
          onClick={() => removeCity(city.id)}
        >
          &times;
        </button>
      </div>
      <div className="flex-row card-desc-bar">
        <p className="current-weather">
          Currently it feels like
          <strong> {Math.round(feels_like)}&deg;C </strong>
          with <strong>{description}</strong>.
        </p>
        <img className="weather-icon" src={iconUrl} alt={description} />
      </div>
      <TemperatureBar temp={temp} temp_min={temp_min} temp_max={temp_max} />
    </li>
  );
}
