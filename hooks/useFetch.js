import { useState, useEffect } from "react";

export default function useFetch(url, method = "GET") {
  const [data, setData] = useState(null);

  useEffect(async () => {
    const res = await fetch(url);
    const receivedData = await res.json();
    setData(receivedData);
  }, []);

  return data;
}
