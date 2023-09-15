import { useState } from 'react';

type Dispatch<A> = (value: A) => void;
type SetStateAction<S> = S | ((prevState: S) => S);

export const useStateWithSideEffects = <T>(
  initialValue: T,
  sideEffects: (newValue: T) => void
): [T, Dispatch<SetStateAction<T>>] => {
  const [state, setStateOnly] = useState<T>(initialValue);

  type ISetState = Dispatch<SetStateAction<T>>;

  const setState: ISetState = (argument: SetStateAction<T>) => {
    if (typeof argument === 'function') {
      setStateOnly((prevState) => {
        // @ts-ignore
        const newState = argument(prevState);
        sideEffects(newState);
        return newState;
      });
    } else {
      setStateOnly(argument);
      sideEffects(argument);
    }
  };

  // setState(true);

  return [state, setState];
};
