import React from 'react';
import { triggerRerenderEditor } from '@store/roadmap-refactor/elements-editing/editor-selected-data';
import { tailwindTransitionClass } from '@src/UI-library/tailwind-utils';
import { IAttachmentTabTitleProperties } from '@type/roadmap/node/tab-types';
import { useStore } from '@nanostores/react';
import attachmentPageStatus from '@store/roadmap-refactor/display/editor/attachment-page-status';
import TextInputStandard from '../../properties-page/TextInputStandard';

type ITitleComponentProps = {
  value: string;
  onChange: <T extends keyof IAttachmentTabTitleProperties>(
    field: T,
    value: IAttachmentTabTitleProperties[T]
  ) => void;
};

const TitleAttachmentView = ({ value, onChange }: ITitleComponentProps) => {
  return (
    <div className='text-3xl text-black font-medium font-kanit-text px-9 break-words'>
      {value || 'No title yet.'}
    </div>
  );
};

const TitleAttachmentEdit = ({ value, onChange }: ITitleComponentProps) => {
  const handleChange = (newValue) => {
    if (onChange) {
      onChange('titleText', newValue);
      triggerRerenderEditor();
    }
  };

  return (
    <TextInputStandard
      label='Title'
      value={value}
      onChange={(newValue) => handleChange(newValue)}
      placeholder='Give an expressive title'
      h='56px'
      w='100%'
    />
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
