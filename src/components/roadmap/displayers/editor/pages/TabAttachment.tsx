import React from 'react';
import HOCOnChange from '@src/HOC-library/store-based-hoc/OnChangeStore';
import { componentMapper } from '@components/roadmap/displayers/editor/components/attachment/logic';
import { useStore } from '@nanostores/react';
import editorSelectedData from '@store/roadmap-refactor/elements-editing/editor-selected-data';
import { getAttachmentByIndex } from '@src/typescript/roadmap_ref/node/core/data-get/attachments';
import { IAttachmentTabComponentTypes } from '@type/roadmap/node/tab-types';
import { IAttachmentPageStatus } from '@store/roadmap-refactor/display/editor/attachment-page-status';

type IMapper = {
  [key in IAttachmentTabComponentTypes]: React.ReactNode;
};

type ITabAttachmentProps = {
  onChange: (value: IAttachmentPageStatus) => void;
  value: IAttachmentPageStatus;
};

const TabAttachment = ({ onChange, value }: ITabAttachmentProps) => {
  const { node, selectedNodeId } = useStore(editorSelectedData);
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
      <div />
    </div>
  );
};

export default HOCOnChange(TabAttachment);
