import { useCallback } from "react";

const useDelay = (delayTime: number) => {
  const delay = useCallback(() => {
    return new Promise(res => {
      setTimeout(res, delayTime);
    });
  }, [delayTime]);
  return delay;
};

export default useDelay;
