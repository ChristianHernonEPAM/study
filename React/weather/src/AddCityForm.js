import { useState, useEffect } from "react";
import { useCitiesContext } from "./contexts/CityContext";
import useFetch from "./hooks/useFetch";
import { ApiBaseUrl } from "./contexts/Contstants";

// TODO: COMMENT CODE

export default function AddCityForm(props) {
  const { addCity } = useCitiesContext();

  // init states
  const [name, setName] = useState("");
  const [results, setResults] = useState(null);
  const [shouldSearch, setShouldSearch] = useState(null);

  const search = () => setShouldSearch(name);
  const addToWatchList = (id) => {
    const cityToAdd = results.find((city) => city.id === id);
    addCity(cityToAdd);
    setName("");
    setResults(null);
  };
  const getParams = () => {
    const params = new URLSearchParams({
      q: shouldSearch,
      units: "metric",
    });
    return params.toString();
  };
  
  const { data, loading, error } = useFetch(
    shouldSearch ? `${ApiBaseUrl}/find?${getParams()}` : null
  );

  // update results whenever a call resovles
  useEffect(() => {
    if (error || loading) return;
    setResults(data?.list);
  }, [data, loading, error]);

  return (
    <div className="add-city-form">
      <div className="flex-row">
        <label>
          City:&nbsp;
          <input
            type="text"
            placeholder="Search for a city..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <button type="button" onClick={search}>
          Search
        </button>
      </div>
      <div className="results-list flex-column">
        {results?.length > 0 &&
          results.map((r) => (
            <p key={r.id} onClick={() => addToWatchList(r.id)}>
              {r.name}, {r.sys.country}
            </p>
          ))}
        {!results && <span>Search for a city and select a result!</span>}
      </div>
    </div>
  );
}
