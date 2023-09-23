import React from 'react';
import LoggedButtonsM from './LoggedButtonsM';
import AnonymusButtonsM from './AnonymousButtonsM';

const ButtonsManagerM = ({ isLogged }: { isLogged: boolean }) => {
  return (
    <div className='flex flex-col ml-4 gap-4'>
      {isLogged ? <LoggedButtonsM /> : <AnonymusButtonsM />}
    </div>
  );
};

export default ButtonsManagerM;
