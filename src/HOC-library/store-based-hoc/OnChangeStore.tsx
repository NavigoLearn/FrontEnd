import React, { useEffect, useState } from 'react';
import { type WritableAtom } from 'nanostores';
import { type HashMap } from '@type/roadmap/misc';
import { useTriggerRerender } from '@hooks/useTriggerRerender';

interface HOCConfigProps<T> {
  storeTemporary: WritableAtom<HashMap<T>>;
  field: string;
  defaultValue: T;
}

interface ProvidedProps<T> {
  onChange: (value: T) => void;
  value: T;
}

type ExcludeProvidedProps<R, T> = Pick<
  T,
  Exclude<keyof T, keyof ProvidedProps<R>>
>;

function typeGuard<R, T extends ProvidedProps<R>>(props: any): props is T {
  return 'onChange' in props && 'value' in props;
}

function HOCOnChange<R, T extends ProvidedProps<R>>(
  WrappedComponent: React.ComponentType<T>
) {
  const EnhancedComponent = ({
    storeTemporary,
    field,
    defaultValue,
    ...props
  }: HOCConfigProps<R> & ExcludeProvidedProps<R, T>) => {
    const [initialized, setInitialized] = useState(false);
    const rerender = useTriggerRerender();

    function onChange(value: R) {
      const modifiedStore = { ...storeTemporary.get() };
      modifiedStore[field] = value;
      storeTemporary.set(modifiedStore);
      rerender();
    }

    useEffect(() => {
      if (!initialized) {
        onChange(defaultValue);
      }
    }, []);

    const newProps = {
      ...props,
      onChange,
      value: initialized ? storeTemporary.get()[field] : defaultValue,
    }; // adds onChange to all the other props of the WrappedComponent

    !initialized && onChange(defaultValue);
    !initialized && setInitialized(true);

    if (typeGuard<R, T>(newProps)) {
      return <WrappedComponent {...newProps} />;
    }
    return <div>error occured in HOC on change in store</div>;
  };
  return EnhancedComponent;
}

export default HOCOnChange;
