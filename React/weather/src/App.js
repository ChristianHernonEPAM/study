import AddCityForm from "./AddCityForm";
import CityCardList from "./CityCardList";
import { CityProvider } from "./contexts/CityContext";
import "./App.css";

export default function App() {
  return (
    <CityProvider>
      <div className="city-overview">
        <h2>Multi-Weather App</h2>
        <AddCityForm />
      </div>
      <CityCardList />
    </CityProvider>
  );
}
