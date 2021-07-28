import { createContext, useContext, useState } from "react";
import { useEffect } from "react";
import { ApiBaseUrl, FetchConfig } from "./Contstants";

const CityContext = createContext();

export function useCitiesContext() {
  return useContext(CityContext);
}

export function CityProvider({ children }) {
  const [cities, setCities] = useState([]);
  const EveryFiveMinutes = 60 * 1000 * 5;

  const addCity = (newCity) => {
    setCities((prevCities) => [...prevCities, newCity]);
  };

  const removeCity = (idToRemove) => {
    setCities((prevCities) => prevCities.filter((c) => c.id !== idToRemove));
  };

  const getParams = (city) => {
    return new URLSearchParams({
      q: city.name,
      id: city.id,
      units: "metric",
    }).toString();
  };

  useEffect(() => {
    const id = setInterval(async () => {
      console.log('updating values...');
      const pendingRequests = cities.map((c) => {
        // useFetch(`${ApiBaseUrl}/weather?${getParams(c)}`);
        const url = `${ApiBaseUrl}/weather?${getParams(c)}`;
        // console.log(url);
        return fetch(url, FetchConfig);
      });
      const resolvedRequests = await Promise.all(pendingRequests);
      const results = await Promise.all(resolvedRequests.map(r => r.json()));
      console.log(results);

      setCities(results);

    }, EveryFiveMinutes);

    // clear timer on cleanup
    return () => clearInterval(id);
  }, [cities, EveryFiveMinutes]);

  return (
    <CityContext.Provider value={{ cities, addCity, removeCity }}>
      {children}
    </CityContext.Provider>
  );
}
