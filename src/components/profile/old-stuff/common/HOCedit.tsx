import React, { ReactComponentElement, useState, useEffect } from 'react';
import { HOCComponentProps, ProfileComponentProps } from '@type/profile/types';
import useStateAndRef from '@hooks/useStateAndRef';

export default (WrappedComponent: React.FC<ProfileComponentProps>) => {
  const hocComponent = ({
    edit,
    originalValue,
    saveRequest,
  }: HOCComponentProps) => {
    const [value, setValue, valueRef] = useStateAndRef(originalValue || '');

    useEffect(() => {
      saveRequest(valueRef);
    }, []);

    useEffect(() => {
      if (originalValue) {
        setValue(originalValue);
      }
    }, [originalValue]);

    useEffect(() => {
      if (!edit) {
        setValue(originalValue);
      }
    }, [edit]);

    return (
      <WrappedComponent
        edit={edit}
        value={value}
        onEdit={(newVal: string) => {
          setValue(newVal);
        }}
      />
    );
  };

  return hocComponent;
};
