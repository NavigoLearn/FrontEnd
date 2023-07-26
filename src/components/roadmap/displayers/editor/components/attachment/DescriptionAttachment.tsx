import React from 'react';
import { tailwindTransitionClass } from '@src/UI-library/tailwind-utils';
import { IAttachmentTabDescriptionProperties } from '@type/roadmap/node/tab-types';

type ITitleComponentProps = {
  value: string;
  onChange: <T extends keyof IAttachmentTabDescriptionProperties>(
    field: T,
    value: IAttachmentTabDescriptionProperties[T]
  ) => void;
};

const DescriptionAttachment = ({ value, onChange }: ITitleComponentProps) => {
  return (
    <div className='flex gap-2 w-full outline-2 outline-black'>
      <input
        className={`flex-grow border-2 border-gray-400 h-16 rounded-lg text-darkBlue text-lg pl-4 font-medium focus:border-black ${tailwindTransitionClass}`}
        value={value}
        onChange={(event) => {
          // onChange(event.target.value);
        }}
      />
    </div>
  );
};

export default DescriptionAttachment;
