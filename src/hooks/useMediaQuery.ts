import { useState, useEffect } from 'react';

type IMediaQueryList = MediaQueryList;
type IMediaQueryListEvent = MediaQueryListEvent;

function useMediaQuery(query: string): boolean {
  const getInitial = () => {
    if (typeof window === 'undefined' || !window.matchMedia) return false;
    return window.matchMedia(query).matches;
  };

  const [matches, setMatches] = useState<boolean>(getInitial);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;

    const media: IMediaQueryList = window.matchMedia(query);
    setMatches(media.matches);

    // handler supports both modern Event and legacy MediaQueryList callback
    const handleChange = (e: IMediaQueryListEvent | IMediaQueryList) => {
      // 'matches' exists on both, but type narrowing for safety
      setMatches(('matches' in e) ? e.matches : media.matches);
    };

    // feature-detect proper listener API
    if (typeof media.addEventListener === 'function') {
      media.addEventListener('change', handleChange as EventListener);
    } else {
      // legacy browsers
      // @ts-expect-error legacy API
      media.addListener(handleChange as (mq: IMediaQueryList) => void);
    }

    return () => {
      if (typeof media.removeEventListener === 'function') {
        media.removeEventListener('change', handleChange as EventListener);
      } else {
        // @ts-expect-error legacy API
        media.removeListener(handleChange as (mq: IMediaQueryList) => void);
      }
    };
  }, [query]);

  return matches;
}

export default useMediaQuery;