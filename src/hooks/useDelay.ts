import { useCallback } from "react";

const useDelay = (delayTime: number) => {
  const delay = useCallback(
    (time?: number) => {
      return new Promise(res => {
        setTimeout(res, time ?? delayTime);
      });
    },
    [delayTime],
  );
  return delay;
};

export default useDelay;
