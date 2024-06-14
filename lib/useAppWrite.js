import { useEffect, useState } from "react";
import { Alert } from "react-native";

function useAppWrite(fn) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchData() {
    setIsLoading(true);

    try {
      const response = await fn();

      setData(response);
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => fetchData();

  return { data, setData, isLoading, refetch };
}

export default useAppWrite;
