import React from 'react';
import TabAttachmentView from '@components/roadmap/displayers/tab-attachment/TabAttachmentView';
import { AnimatePresence } from 'framer-motion';
import { useStore } from '@nanostores/react';
import displayStore from '@store/roadmap-refactor/display/display-manager';
import EditorPageManager from '@components/roadmap/displayers/editor/EditorPageManager';

const DisplayManager = () => {
  const { type } = useStore(displayStore);

  console.log(type);

  return (
    <AnimatePresence>
      {type === 'editor' && <EditorPageManager />}
      {type === 'tab' && <TabAttachmentView />}
      {type === 'issues' && <div />}
      {type === 'about' && <div />}
    </AnimatePresence>
  );
};

export default DisplayManager;
