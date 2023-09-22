import React from 'react';
import LoggedButtonsM from './LoggedButtonsM';
import AnonymusButtonsM from './AnonymousButtonsM';

const ButtonsManagerM = ({ isLogged }: { isLogged: boolean }) => {
  return (
    <div className='flex flex-col ml-6 gap-4 mt-12'>
      {isLogged ? <LoggedButtonsM /> : <AnonymusButtonsM />}
    </div>
  );
};

export default ButtonsManagerM;
