import React, { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { config } from '@src/HOC-library/config';

interface HOCConfigProps<T> {
  callback: (value: T) => void;
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
  const field = uuidv4();
  const EnhancedComponent = ({
    defaultValue,
    callback,
    ...props
  }: HOCConfigProps<R> & ExcludeProvidedProps<R, T>) => {
    const storeTemporary = config.defaultStore;
    function onChange(value: R) {
      const modifiedStore = { ...storeTemporary.get() };
      modifiedStore[field] = value;
      callback(value);
      storeTemporary.set(modifiedStore);
    }

    useEffect(() => {
      onChange(defaultValue);
    }, []);

    const newProps = {
      ...props,
      onChange,
      value: storeTemporary.get()[field],
    }; // adds onChange to all the other props of the WrappedComponent

    if (typeGuard<R, T>(newProps)) {
      return <WrappedComponent {...newProps} />;
    }
    return <div>error occured in HOC on change in store</div>;
  };
  return EnhancedComponent;
}

export default HOCOnChange;
