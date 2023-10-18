import { useState, useEffect } from 'react';

type UseFetchProps = {
  url: string;
};

type DataProps = {
  data?: object;
  isLoading?: boolean;
  error?: boolean;
  surveyData?: any
};

export function useFetch({ url }: UseFetchProps) {
  const [data, setData] = useState<DataProps>({});
  const [isLoading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  console.log(data);
  useEffect(() => {
    if (!url) return;

    setLoading(true);

    async function fetchData() {
      try {
        const response = await fetch(url);

        const data = await response.json();

        setData(data);
      } catch (err) {
        console.log(err);

        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [url]);
  return { isLoading, data, error };
}
