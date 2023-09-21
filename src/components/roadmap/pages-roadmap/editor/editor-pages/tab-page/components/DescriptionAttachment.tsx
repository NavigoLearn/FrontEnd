import React from 'react';
import attachmentPageStatus from '@store/roadmap-refactor/display/editor/attachment-page-status';
import { triggerRerenderEditor } from '@store/roadmap-refactor/elements-editing/store-editor-selected-data';
import { type IAttachmentTabDescriptionProperties } from '@type/roadmap/node/tab-types';
import { useStore } from '@nanostores/react';
import TextareaStandardInput from '../../properties-page/TextareaStandardInput';

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
  const handleChange = (newValue) => {
    if (onChange) {
      onChange('descriptionText', newValue);
      triggerRerenderEditor();
    }
  };

  return (
    <div className='w-full'>
      <TextareaStandardInput
        label='Description'
        value={value}
        onChange={(newValue) => handleChange(newValue)}
        placeholder='Give an expressive description'
        h='160px'
        w='100%'
      />
    </div>
  );
};
export const DescriptionAttachmentView = ({
  value,
}: IDescriptionComponentProps) => {
  const { status } = useStore(attachmentPageStatus);
  const { isEditing } = status;

  return (
    <div className='w-full font-roboto-text text-secondary text-lg mt-3 mb-5 px-9 break-words whitespace-pre-line'>
      {value || 'No description yet'}
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
