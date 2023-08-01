import React from 'react';
import attachmentPageStatus from '@store/roadmap-refactor/display/editor/attachment-page-status';
import { triggerRerenderEditor } from '@store/roadmap-refactor/elements-editing/editor-selected-data';
import { tailwindTransitionClass } from '@src/UI-library/tailwind-utils';
import { IAttachmentTabDescriptionProperties } from '@type/roadmap/node/tab-types';
import { useStore } from '@nanostores/react';

type IDescriptionComponentProps = {
  value: string;
  onChange: <T extends keyof IAttachmentTabDescriptionProperties>(
    field: T,
    value: IAttachmentTabDescriptionProperties[T]
  ) => void;
};

const DescriptionAttachmentEdit = ({
  value,
  onChange,
}: IDescriptionComponentProps) => {
  const { status } = useStore(attachmentPageStatus);
  const { isEditing } = status;

  return (
    <div className='flex gap-1 w-full flex-col'>
      <h1 className='text-darkBlue font-roboto-text'>Description</h1>
      <textarea
        className={`flex-grow h-40 resize-none outline-none border-2 border-gray-400 rounded-lg text-darkBlue text-lg pl-4 font-medium focus:border-black ${tailwindTransitionClass}`}
        placeholder='Give an expressive description'
        value={value}
        onChange={(event) => {
          onChange('descriptionText', event.target.value);
          triggerRerenderEditor();
        }}
      />
    </div>
  );
};
const DescriptionAttachmentView = ({
  value,
  onChange,
}: IDescriptionComponentProps) => {
  const { status } = useStore(attachmentPageStatus);
  const { isEditing } = status;

  return (
    <div>
      <h1 className='text-gray-400 font-roboto-text'>Description</h1>
      <div className='flex gap-2 w-full font-roboto-text text-darkBlue text-lg'>
        {value || 'No description yet'}
      </div>
    </div>
  );
};
const DescriptionAttachment = ({
  value,
  onChange,
}: IDescriptionComponentProps) => {
  const { status } = useStore(attachmentPageStatus);
  const { isEditing } = status;

  return (
    <div className='flex gap-2 w-full '>
      {isEditing && (
        <DescriptionAttachmentEdit value={value} onChange={onChange} />
      )}
      {!isEditing && (
        <DescriptionAttachmentView value={value} onChange={onChange} />
      )}
    </div>
  );
};

export default DescriptionAttachment;
