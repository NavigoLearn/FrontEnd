import React from 'react';
import TabAttachmentView from '@components/roadmap/displayers/tab-attachment/TabAttachmentView';
import { AnimatePresence } from 'framer-motion';
import { useStore } from '@nanostores/react';
import displayStore from '@store/roadmap-refactor/display/display-manager';
import EditorPageManager from '@components/roadmap/displayers/editor/EditorPageManager';

const DisplayManager = () => {
  const { type } = useStore(displayStore);

  const transition = {
    duration: 0.5,
    ease: [0.43, 0.13, 0.23, 0.96], // Custom easing curve
  };

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
