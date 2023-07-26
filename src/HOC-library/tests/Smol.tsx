import React from 'react';
import onChangeStoreAutomatic from '@src/HOC-library/store-based-hoc/OnChangeStoreAutomatic';

type ProvidedProps = {
  onChange: (value: string) => void;
  value: string;
};
const Smol = ({ onChange, value }: ProvidedProps) => {
  return <div />;
};

export default onChangeStoreAutomatic(Smol);
