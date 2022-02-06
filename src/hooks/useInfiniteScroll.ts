import { useCallback, useRef, useState } from "react";

const useInfiniteScroll = (pageCount: number, defaultCount = 1) => {
  const [count, setCount] = useState(defaultCount);
  const observerRef = useRef<IntersectionObserver>();
  const throttlingRef = useRef<NodeJS.Timeout | null>();

  const handleObserver = useCallback(
    (node: HTMLDivElement) => {
      if (node === null) return;
      // 기존에 생성했던 인스턴스가 있다면 기존에 감시하던 타겟을 감시를 정지한다.
      if (observerRef.current) observerRef.current.disconnect();

      const observerCallback = ([entry]: IntersectionObserverEntry[], observer: IntersectionObserver) => {
        const { target } = entry;

        if (pageCount !== count) {
          if (entry.isIntersecting) {
            if (throttlingRef.current) return;

            throttlingRef.current = setTimeout(() => {
              throttlingRef.current = null;

              setCount(prev => prev + 1);
            }, 1000);
            observer.unobserve(target);
          }
        } else {
          observer.unobserve(target);
        }
      };

      observerRef.current = new IntersectionObserver(observerCallback, {
        root: null,
        rootMargin: "0px",
        threshold: 0.2,
      });

      // 파라미터로 넘어온 요소를 감시하도록 등록한다.
      observerRef.current.observe(node);
    },
    [pageCount, count],
  );

  return {
    observerRef,
    handleObserver,
    count,
    setCount,
  };
};

export default useInfiniteScroll;
