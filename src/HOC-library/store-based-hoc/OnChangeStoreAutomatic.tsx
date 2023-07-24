import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { config } from '@src/HOC-library/config';
import { useTriggerRerender } from '@hooks/useTriggerRerender';

interface HOCConfigProps<T> {
  defaultValue: T;
  getValue?: () => T;
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

function HOCOnChangeAutomatic<R, T extends ProvidedProps<R>>(
  WrappedComponent: React.ComponentType<T>
) {
  const field = uuidv4();
  const EnhancedComponent = ({
    defaultValue,
    ...props
  }: HOCConfigProps<R> & ExcludeProvidedProps<R, T>) => {
    const storeTemporary = config.defaultStore;
    const rerender = useTriggerRerender();
    const [initialized, setInitialized] = useState(false);

    function onChange(value: R) {
      const modifiedStore = { ...storeTemporary.get() };
      modifiedStore[field] = value;
      storeTemporary.set(modifiedStore);
      rerender();
    }

    useEffect(() => {
      onChange(defaultValue);
      setInitialized(true);
    }, []);

    const newProps = {
      ...props,
      onChange,
      value: initialized ? storeTemporary.get()[field] : defaultValue,
    }; // adds onChange to all the other props of the WrappedComponent

    if (typeGuard<R, T>(newProps)) {
      return <WrappedComponent {...newProps} />;
    }
    return <div>error occured in HOC on change in store</div>;
  };
  EnhancedComponent.defaultProps = {
    getValue: () => config.defaultStore.get()[field],
  };
  return EnhancedComponent;
}

export default HOCOnChangeAutomatic;
