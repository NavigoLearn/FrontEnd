import React from 'react';
import { rightWrapper } from '@components/roadmap/displayers/Wrappers';
import { useStore } from '@nanostores/react';
import { selectedTabNode } from '@store/roadmap-refactor/display/tab-attachment/selected-tab';
import { getNodeByIdRoadmapSelector } from '@store/roadmap-refactor/roadmap-data/roadmap-selector';

const TabAttachmentView = () => {
  const { nodeId } = useStore(selectedTabNode);
  const node = getNodeByIdRoadmapSelector(nodeId);
  const attachment = node.attachments[0]; // for the moment
  const { components } = attachment;

  return (
    <div className='w-full h-full flex-col'>
      <div />
    </div>
  );
};

export default rightWrapper(TabAttachmentView);
