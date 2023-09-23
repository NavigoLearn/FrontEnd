import React from 'react';
import LoggedButtonsM from './LoggedButtonsM';
import AnonymusButtonsM from './AnonymousButtonsM';
import LogOutButtonM from './LogOutButtonM';

const ButtonsManagerM = ({ isLogged }: { isLogged: boolean }) => {
  return (
    <div className='flex flex-col ml-4 gap-4'>
      {isLogged ? (
        <div>
          <LoggedButtonsM />
          <LogOutButtonM />
        </div>
      ) : (
        <AnonymusButtonsM />
      )}
    </div>
  );
};

export default ButtonsManagerM;
