import { useEffect, useRef } from "react";

const useDebounce = () => {
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    debounceRef.current = null;
  }, []);
  return debounceRef;
};

export default useDebounce;
