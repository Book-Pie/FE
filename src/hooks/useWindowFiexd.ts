import { useEffect } from "react";

const useWindowFiexd = (isFxied: boolean) => {
  useEffect(() => {
    if (isFxied) {
      document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`;
    }

    return () => {
      if (isFxied) {
        const scrollY = document.body.style.top;
        document.body.style.cssText = "";
        window.scrollTo(0, parseInt(scrollY, 10) * -1);
      }
    };
  }, [isFxied]);
};

export default useWindowFiexd;
