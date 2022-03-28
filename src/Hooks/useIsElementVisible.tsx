import { useEffect, useState } from "react";

export function useIsElementVisible(
  elm: React.RefObject<HTMLElement | Element>
): boolean {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.01 }
    );

    if (elm.current) {
      observer.observe(elm.current);
    }
    return () => {
      observer.unobserve(elm.current);
    };
  });

  return isVisible;
}
