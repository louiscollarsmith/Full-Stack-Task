import { useEffect, useRef, useState } from "react";

const useCallApi = <ApiFunction extends (...args: any[]) => Promise<any>>(
  apiFunction: ApiFunction
) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Awaited<ReturnType<ApiFunction>>>();
  const [error, setError] = useState<unknown>();
  const [completedTimestamp, setCompletedTimestamp] = useState<Date>();

  const mountedRef = useRef<boolean>(true);

  useEffect(() => {
    mountedRef.current = true;

    return () => void (mountedRef.current = false);
  }, []);

  const callApi = async (...args: Parameters<ApiFunction>): Promise<void> => {
    try {
      setLoading(true);
      setData(undefined);
      setError(undefined);
      setCompletedTimestamp(undefined);

      const data = await apiFunction(...args);

      if (mountedRef.current) {
        setData(data);
        setCompletedTimestamp(new Date());
      }
    } catch (error) {
      if (mountedRef.current) {
        setError(error);
      }
    } finally {
      if (mountedRef.current) {
        setLoading(false);
      }
    }
  };

  return {
    loading,
    error,
    data,
    completedTimestamp,
    callApi,
  };
};

export { useCallApi };
