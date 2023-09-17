import React from 'react';

type IProfileButtonProps = {
  selected: boolean;
  name: string;
  callback: () => void;
};
const ProfileButtonM = ({ name, selected, callback }: IProfileButtonProps) => {
  const styleSelected =
    'border-b-2 border-black text-black font-medium text-md ';
  const styleNotSelected =
    'text-secondary font-regular text-md border-b-2 border-b-background ';
  const style = selected ? styleSelected : styleNotSelected;
  const commonStyle = 'focus:outline-none py-2 w-24 text-center';

  return (
    <div>
      <button
        className={`${style} ${commonStyle}`}
        type='button'
        onClick={() => {
          callback();
        }}
      >
        {name}
      </button>
    </div>
  );
};

export default ProfileButtonM;
