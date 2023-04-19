import { useEffect, useState } from "react";
import { getData } from "../server/common";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [callback, setCallback] = useState(false);
  const recall = () => {
    setCallback(!callback);
  };
  useEffect(() => {
    setLoading(true);
    getData(url)
      .then((res) => {
        setData(res.data.data);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [url, callback]);
  return { data, loading, error, recall };
};

export default useFetch;
