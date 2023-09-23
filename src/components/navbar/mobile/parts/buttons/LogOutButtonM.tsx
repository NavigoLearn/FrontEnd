import react from 'react';
import navlogoutsvg from '@src/assets/navlogout.svg';
import { handleLogout } from '@src/components/auth/old/socialAuth';

const LogOutButtonM = () => {
  return (
    <div className='flex flex-row bottom-6 fixed'>
      <button
        type='button'
        onClick={handleLogout}
        className='text-white flex gap-2 items-center text-center text-[4vw] font-roboto-text font-normal'
      >
        <img src={navlogoutsvg.src} alt='logout' className='w-[4vw] h-[4vw]' />
        Log Out
      </button>
    </div>
  );
};

export default LogOutButtonM;
