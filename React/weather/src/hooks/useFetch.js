import { useState, useEffect } from "react";
import { FetchConfig } from "../contexts/Contstants";

export default function useFetch(uri, options=FetchConfig) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!uri) return;

    const controller = new AbortController();
    const signal = controller.signal;
    const fetchData = async () => {
      // set loading to true before request begins
      setLoading(true);

      // begin request
      const result = await fetch(uri, { ...options, signal });

      // request resolved set loading to false
      setLoading(false);

      if (result.ok) {
        // result was a success, pass json data back
        const json = await result.json();
        setData(json);
      } else {
        // result had an error, return details
        setError({
          status: result.status,
          statusText: result.statusText,
        });
      }
    };

    fetchData();

    return () => controller.abort();
  }, [uri, options]);

  return { data, loading, error };
}
