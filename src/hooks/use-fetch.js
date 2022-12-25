import { useCallback, useState } from 'react';

// what we need from the useFetch custom hook:
// 1) It should manage 'LOADING' state
// 2) It should manage 'ERROR' state
// 3) It should give us a way of triggering HTTP request.
const useFetch = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // to avoid excessive dependencies we pass them as arguments here:
  const sendRequest = useCallback(async (requestConfig, applyData) => {
    const {
      url = '',
      method = 'GET',
      headers = {},
      body = null,
    } = requestConfig;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(url, {
        method,
        headers,
        body,
      });

      if (!response.ok) {
        throw new Error('Something went wrong');
      }

      const data = await response.json();
      applyData(data);
    } catch (err) {
      setError(err.message);
    }

    setIsLoading(false);
  }, []);

  return {
    sendRequest,
    isLoading,
    error,
  };
};

export default useFetch;
