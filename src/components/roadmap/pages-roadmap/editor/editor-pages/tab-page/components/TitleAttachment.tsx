import React from 'react';
import { triggerRerenderEditor } from '@store/roadmap-refactor/elements-editing/editor-selected-data';
import { tailwindTransitionClass } from '@src/UI-library/tailwind-utils';
import { IAttachmentTabTitleProperties } from '@type/roadmap/node/tab-types';
import { useStore } from '@nanostores/react';
import attachmentPageStatus from '@store/roadmap-refactor/display/editor/attachment-page-status';

type ITitleComponentProps = {
  value: string;
  onChange: <T extends keyof IAttachmentTabTitleProperties>(
    field: T,
    value: IAttachmentTabTitleProperties[T]
  ) => void;
};

const TitleAttachmentView = ({ value, onChange }: ITitleComponentProps) => {
  return (
    <div className='text-3xl text-black font-medium font-kanit-text px-9'>
      {value || 'No title yet.'}
    </div>
  );
};

const TitleAttachmentEdit = ({ value, onChange }: ITitleComponentProps) => {
  return (
    <div className='flex flex-col gap-1 w-full outline-2 outline-black'>
      <h1 className='font-roboto-text text-placeholder'>Title</h1>
      <input
        className={`flex-grow mt-2 h-14 resize-none outline-none border-2 border-gray-400 rounded-lg text-darkBlue text-lg pl-4 font-medium focus:border-black ${tailwindTransitionClass}`}
        value={value}
        placeholder='Give an expressive title'
        onChange={(event) => {
          onChange('titleText', event.target.value);
          triggerRerenderEditor();
        }}
      />
    </div>
  );
};

const TitleAttachment = ({ value, onChange }: ITitleComponentProps) => {
  const { status } = useStore(attachmentPageStatus);
  const { isEditing } = status;
  return (
    <div>
      {isEditing && <TitleAttachmentEdit value={value} onChange={onChange} />}
      {!isEditing && <TitleAttachmentView value={value} onChange={onChange} />}
    </div>
  );
};

export default TitleAttachment;
