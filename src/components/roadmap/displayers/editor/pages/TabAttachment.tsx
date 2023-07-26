import React from 'react';
import { componentMapper } from '@components/roadmap/displayers/editor/components/attachment/logic';
import { useStore } from '@nanostores/react';
import editorSelectedData from '@store/roadmap-refactor/elements-editing/editor-selected-data';
import { getAttachmentByIndex } from '@src/typescript/roadmap_ref/node/core/data-get/attachments';
import { IAttachmentTabComponentTypes } from '@type/roadmap/node/tab-types';

type IMapper = {
  [key in IAttachmentTabComponentTypes]: React.ReactNode;
};
const TabAttachment = () => {
  const { node, selectedNodeId } = useStore(editorSelectedData);
  const attachment = getAttachmentByIndex(node, 0);

  console.log(attachment);

  return (
    <div>
      {attachment.components.map((component) => {
        return componentMapper(component);
      })}
      <div>
        <div />
      </div>
    </div>
  );
};

export default TabAttachment;
