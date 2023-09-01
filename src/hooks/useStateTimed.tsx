import React, { useState, useEffect } from 'react';

export function useStateTimed(
  initialValue: boolean,
  variable: number,
  resetVariableCallback?: () => void
): [boolean, React.Dispatch<React.SetStateAction<boolean>>] {
  const [state, setState] = useState(initialValue);
  const [trigger, setTrigger] = useState(false);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  function setStateProperly(value: boolean) {
    setTrigger((prev) => {
      return !prev;
    });
    setState(value);
  }

  useEffect(() => {
    if (timer) {
      clearTimeout(timer);
    }

    if (state === true) {
      setTimer(
        setTimeout(() => {
          setState(false);
          if (resetVariableCallback) {
            resetVariableCallback();
          }
        }, variable)
      );
    }
  }, [state, variable, trigger]);

  return [state, setStateProperly];
}
