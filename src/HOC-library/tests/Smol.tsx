import React from 'react';
import onChangeStore from '@src/HOC-library/store-based-hoc/OnChangeStore';

type ProvidedProps = {
  onChange: (value: string) => void;
  value: string;
};
const Title = ({ onChange, value }: ProvidedProps) => {
  return <div />;
};

export default onChangeStore(Title);
