import React from 'react';

type ITextareaComponentProps = {
  label: string;
  value: string;
  editable: boolean;
  callback: (value: string) => void;
};
const TextareaComponent = ({
  label,
  value,
  editable,
  callback,
}: ITextareaComponentProps) => {
  return (
    <div className='relative'>
      <textarea
        className={`font-roboto-text h-36 resize-none text-md text-darkBlue w-full lg:w-80 monitor:w-96 rounded-md border-[1.5px] border-placeholderBlack px-3 py-2 ${
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

export default TextareaComponent;
