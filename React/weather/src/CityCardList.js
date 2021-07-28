import CityCard from "./CityCard";
import { useCitiesContext } from "./contexts/CityContext";

export default function CityCardList(props) {
  const { cities, removeCity } = useCitiesContext();
  return (
    <div className="city-card-panel">
      <h2>City List</h2>
      <ul className="city-card-list">
        {cities.map((city) => (
          <CityCard 
            key={city.id} 
            city={city} 
            removeCity={removeCity} 
          />
        ))}
      </ul>
    </div>
  );
}
