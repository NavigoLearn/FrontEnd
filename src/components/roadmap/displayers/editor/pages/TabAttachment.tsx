import React from 'react';
import HOCOnChange from '@src/HOC-library/store-based-hoc/OnChangeStore';
import { componentMapper } from '@components/roadmap/displayers/editor/components/attachment/logic';
import { useStore } from '@nanostores/react';
import editorSelectedData from '@store/roadmap-refactor/elements-editing/editor-selected-data';
import { getAttachmentByIndex } from '@src/typescript/roadmap_ref/node/core/data-get/attachments';
import { IAttachmentTabComponentTypes } from '@type/roadmap/node/tab-types';
import { IAttachmentPageStatus } from '@store/roadmap-refactor/display/editor/attachment-page-status';
import button from '@components/roadmap/tabs/utils/Button';
import { getNodeByIdRoadmapSelector } from '@store/roadmap-refactor/roadmap-data/roadmap-selector';

type IMapper = {
  [key in IAttachmentTabComponentTypes]: React.ReactNode;
};

type ITabAttachmentProps = {
  onChange: (value: IAttachmentPageStatus) => void;
  value: IAttachmentPageStatus;
};

type IEditButtonProps = {
  onChange: () => void;
};

const EditButton = ({ onChange }: IEditButtonProps) => {
  return (
    <button
      type='button'
      className='px-10 py-2 bg-blue-600 text-white rounded-lg text-lg font-medium'
      onClick={() => {
        onChange();
      }}
    >
      Edit
    </button>
  );
};

type IPreviewButtonProps = {
  onChange: () => void;
};

const PreviewButton = ({ onChange }: IPreviewButtonProps) => {
  return (
    <button
      type='button'
      className='px-10 py-2 bg-blue-600 text-white rounded-lg text-lg font-medium'
      onClick={() => {
        onChange();
      }}
    >
      Preview
    </button>
  );
};

const TabAttachment = ({ onChange, value }: ITabAttachmentProps) => {
  const { selectedNodeId } = useStore(editorSelectedData);
  const node = getNodeByIdRoadmapSelector(selectedNodeId);
  const attachment = getAttachmentByIndex(node, 0);
  const { isEditing } = value;

  return (
    <div>
      {attachment.components.map((component, index) => {
        return (
          // eslint-disable-next-line react/no-array-index-key
          <div key={index} className='my-4'>
            {componentMapper(component)}
          </div>
        );
      })}
      <div className='absolute bottom-8 w-full border-2 border-black'>
        {!isEditing && (
          <EditButton onChange={() => onChange({ isEditing: true })} />
        )}
        {isEditing && (
          <PreviewButton
            onChange={() => {
              onChange({ isEditing: false });
            }}
          />
        )}
      </div>
    </div>
  );
};

export default HOCOnChange(TabAttachment);
