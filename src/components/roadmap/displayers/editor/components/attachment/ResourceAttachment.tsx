import React from 'react';
import { IAttachmentTabLinkProperties } from '@src/types/roadmap/node/tab-types';
import attachmentPageStatus from '@src/store/roadmap-refactor/display/editor/attachment-page-status';
import { useStore } from '@nanostores/react';
import { triggerRerenderEditor } from '@src/store/roadmap-refactor/elements-editing/editor-selected-data';
import { tailwindTransitionClass } from '@src/UI-library/tailwind-utils';
import addCircle from '@src/assets/add-circle.svg';
import { a } from '@src/types/user/typecheckers';

type IResourceAttachmentProps = {
  value: string;
  onChange: <T extends keyof IAttachmentTabLinkProperties>(
    field: T,
    value: IAttachmentTabLinkProperties[T]
  ) => void;
};

const ResourceAttachmentView = ({
  value,
  onChange,
}: IResourceAttachmentProps) => {
  return (
    <div>
      <h1 className='text-gray-400 font-roboto-text'>Resources</h1>
      <div className='flex gap-2 w-full font-roboto-text text-darkBlue text-lg'>
        {value ? <a href={value}>{value}</a> : 'No resources yet'}
      </div>
    </div>
  );
};

const ResourceAttachmentEdit = ({
  value,
  onChange,
}: IResourceAttachmentProps) => {
  return (
    <div className='flex gap-1 w-full relative flex-col'>
      <div className='flex justify-between px-4 absolute w-full mt-3'>
        <h1 className='text-darkBlue font-roboto-text'>Resources</h1>
        <button type='button'>
          <img src={addCircle} alt='addingResources' className='h-7 w-7' />
        </button>
      </div>
      <textarea
        className={`flex-grow h-40 pt-10 resize-none outline-none border-2 border-gray-400 rounded-lg text-darkBlue text-lg pl-4 font-medium focus:border-black ${tailwindTransitionClass}`}
        placeholder='Give an expressive description'
        value={value}
        onChange={(event) => {
          onChange('linkURL', event.target.value);
          triggerRerenderEditor();
        }}
      />
    </div>
  );
};

const ResourceAttachment = ({ value, onChange }: IResourceAttachmentProps) => {
  const { status } = useStore(attachmentPageStatus);
  const { isEditing } = status;

  return (
    <div>
      {isEditing && (
        <ResourceAttachmentEdit value={value} onChange={onChange} />
      )}
      {!isEditing && (
        <ResourceAttachmentView value={value} onChange={onChange} />
      )}
    </div>
  );
};

export default ResourceAttachment;
