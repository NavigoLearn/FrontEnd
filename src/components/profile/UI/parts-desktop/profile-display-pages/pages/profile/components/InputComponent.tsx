import React from 'react';

type IInputComponentProps = {
  label: string;
  value: string;
  editable: boolean;
  callback: (value: string) => void;
};
const InputComponent = ({
  label,
  value,
  editable,
  callback,
}: IInputComponentProps) => {
  return (
    <div className='relative'>
      <input
        className={`font-roboto-text font-medium text-md text-darkBlue w-80 monitor:w-96 h-10 monitor:h-12 rounded-md border-[1.5px] border-placeholderBlack px-3 py-5 ${
          !editable
            ? 'pointer-events-none text-placeholder'
            : 'pointer-events-auto'
        }`}
        value={value}
        placeholder={label}
        onChange={(e) => {
          callback(e.target.value);
        }}
      />
      <span className='px-3  bg-white absolute -top-3 left-5 text-placeholder text-sm font-roboto-text'>
        {label}
      </span>
    </div>
  );
};

export default InputComponent;
