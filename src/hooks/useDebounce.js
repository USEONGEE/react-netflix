import { useEffect, useState } from "react";


export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState("");

  useEffect(() => {
    const hanlder = setTimeout(() => {
      setDebouncedValue(value)
    },delay);
  
    return () => {
      clearTimeout(hanlder);
    }
  }, [value, delay])

  return debouncedValue;
}