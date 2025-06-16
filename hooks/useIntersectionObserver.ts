import { useEffect, useRef } from "react";

interface IntersectionObserverProps {
  root?: null | HTMLElement;
  rootMargin?: string;
  threshold?: number[] | number;
  onIntersect: IntersectionObserverCallback;
  isLoading: boolean;
}
export default function useIntersectionObserver({
  root = null,
  onIntersect,
  threshold = [0.8],
  rootMargin = "0px 0px",
  isLoading,
}: IntersectionObserverProps) {
  const entries = useRef<HTMLDivElement[] | []>([]);

  useEffect(() => {
    if (!entries || isLoading) {
      return undefined;
    }
    const observer: IntersectionObserver = new IntersectionObserver(onIntersect, {
      root,
      rootMargin,
      threshold,
    });
    entries.current?.forEach((target) => {
      observer.observe(target);
    });

    return () => {
      observer.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entries, isLoading]);

  return entries;
}
