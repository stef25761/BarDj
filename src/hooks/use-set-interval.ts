import { useEffect, useRef } from 'react';

export const useSetInterval = (cb: () => void) => {
  const intervalRef = useRef<number>();

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      cb();
    }, 30000);

    return () => clearInterval(intervalRef.current);
  }, [cb]);
};
