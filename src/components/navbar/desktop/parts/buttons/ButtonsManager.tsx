import React from 'react';
import LoggedButtons from '@components/navbar/desktop/parts/buttons/LoggedButtons';
import AnonymusButtons from '@components/navbar/desktop/parts/buttons/AnonymusButtons';

type IButtonsManagerProps = {
  isLogged: boolean;
};
const ButtonsManager = ({ isLogged }: IButtonsManagerProps) => {
  return <div>{isLogged ? <LoggedButtons /> : <AnonymusButtons />}</div>;
};

export default ButtonsManager;
