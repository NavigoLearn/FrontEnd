import React from 'react';
import attachmentPageStatus from '@store/roadmap-refactor/display/editor/attachment-page-status';
import { triggerRerenderEditor } from '@store/roadmap-refactor/elements-editing/editor-selected-data';
import { tailwindTransitionClass } from '@src/UI-library/tailwind-utils';
import { IAttachmentTabDescriptionProperties } from '@type/roadmap/node/tab-types';
import { useStore } from '@nanostores/react';

type ITitleComponentProps = {
  value: string;
  onChange: <T extends keyof IAttachmentTabDescriptionProperties>(
    field: T,
    value: IAttachmentTabDescriptionProperties[T]
  ) => void;
};

const DescriptionAttachment = ({ value, onChange }: ITitleComponentProps) => {
  const { status } = useStore(attachmentPageStatus);
  const { isEditing } = status;

  return (
    <div className='flex gap-2 w-full '>
      <textarea
        className={`flex-grow h-40 resize-none outline-none border-2 border-gray-400 rounded-lg text-darkBlue text-lg pl-4 font-medium focus:border-black ${tailwindTransitionClass}`}
        value={value}
        onChange={(event) => {
          onChange('descriptionText', event.target.value);
          triggerRerenderEditor();
        }}
      />
    </div>
  );
};

export default DescriptionAttachment;
