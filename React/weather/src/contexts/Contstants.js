const APIKEY = process.env.REACT_APP_APIKEY;

// https://rapidapi.com/community/api/open-weather-map/
export const HeaderParameters = {
  "x-rapidapi-key": APIKEY,
  "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
};
export const FetchConfig = {
  method: "GET",
  headers: HeaderParameters,
};
export const ApiBaseUrl = "https://community-open-weather-map.p.rapidapi.com";
export const IconBaseUrl = "http://openweathermap.org/img/wn/";
