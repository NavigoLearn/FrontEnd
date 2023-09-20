import React from 'react';
import { PROFILE_NAME_MAX_LENGTH } from '@src/typescript/roadmap_ref/node/components/text/text-params';

type IInputComponentProps = {
  label: string;
  value: string;
  editable: boolean;
  callback: (value: string) => void;
  hasLimit?: boolean;
};

const InputComponent = ({
  label,
  value,
  editable,
  callback,
  hasLimit,
}: IInputComponentProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value;

    if (hasLimit && inputValue.length > PROFILE_NAME_MAX_LENGTH) {
      inputValue = inputValue.slice(0, PROFILE_NAME_MAX_LENGTH);
    }

    callback(inputValue);
  };

  return (
    <div className='relative'>
      <input
        className={`font-roboto-text text-md text-darkBlue w-full lg:w-80 monitor:w-96 h-10 monitor:h-12 rounded-md border-[1.5px] border-placeholderBlack px-3 py-5 ${
          !editable
            ? 'pointer-events-none text-placeholder'
            : 'pointer-events-auto'
        }`}
        value={value}
        placeholder={label}
        onChange={handleChange}
      />
      <span className='px-3  bg-white absolute -top-3 left-5 text-placeholder text-sm font-roboto-text'>
        {label}
      </span>
    </div>
  );
};

InputComponent.defaultProps = {
  hasLimit: false,
};

export default InputComponent;
