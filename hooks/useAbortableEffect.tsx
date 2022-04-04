import { useEffect, useState } from 'react';

type Effect = (mounted: boolean) => (() => void) | void;

const useAbortableEffect = (effect: Effect, deps?: any[]): void => {
  const [mounted, setMounted] = useState(true);
  useEffect(
    () => {
      const result = effect(mounted);
      return () => {
        setMounted(false);
        if (typeof result === 'function') {
          result();
        }
      };
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    deps ? [...deps] : undefined
  );
};

export default useAbortableEffect;
