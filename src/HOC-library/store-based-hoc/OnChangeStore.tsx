import React from 'react';
import { WritableAtom } from 'nanostores';
import { HashMap } from '@type/roadmap/stores/roadmap';

interface HOCConfigProps<T> {
  storeTemporary: WritableAtom<HashMap<T>>;
  field: string;
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
    ...props
  }: HOCConfigProps<R> & ExcludeProvidedProps<R, T>) => {
    function onChange(value: R) {
      const modifiedStore = { ...storeTemporary.get() };
      modifiedStore[field] = value;
      storeTemporary.set(modifiedStore);
    }

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
