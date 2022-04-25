import { useState, useEffect, useCallback } from 'react';

const useAbortableState = <T,>(initialValue: T): [T, (value: T) => void] => {
  const [value, setValue] = useState(initialValue);
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    return () => {
      setMounted(false);
    };
  }, []);

  const setNewValue = useCallback((newValue: any) => {
    if (mounted) {
      setValue(newValue);
    } else console.log("Unmounted so didn't update");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [value, setNewValue];
};

export default useAbortableState;
