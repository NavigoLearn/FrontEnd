import react from 'react';
import dropdown from '@assets/dropdown.svg';
import dropclose from '@assets/cross.svg';

const NavMenu = ({
  handleClick,
  click,
}: {
  handleClick: () => void;
  click: boolean;
}) => {
  return (
    <div
      className='flex mr-6 w-fit h-fit'
      onClick={handleClick}
      onKeyDown={handleClick}
      role='presentation'
    >
      <img
        src={click ? dropclose : dropdown}
        alt='dropdown'
        className='w-6 h-6'
      />
    </div>
  );
};

export default NavMenu;
