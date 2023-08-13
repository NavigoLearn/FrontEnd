import React from 'react';
import TabAttachmentView from '@components/roadmap/displayers/tab-attachment/TabAttachmentView';
import { AnimatePresence, motion } from 'framer-motion';
import { useStore } from '@nanostores/react';
import displayStore from '@store/roadmap-refactor/display/display-manager';
import EditorPageManager from '@components/roadmap/displayers/editor/EditorPageManager';

const DisplayManager = () => {
  const { type } = useStore(displayStore);

  const transition = {
    duration: 0.5,
    ease: [0.43, 0.13, 0.23, 0.96], // Custom easing curve
  };

  function framerAnimationWrapper(children: JSX.Element) {
    return (
      <motion.div
        className=' h-full w-full top-0 pointer-events-none'
        initial={{ opacity: 0, x: '100%', y: 0 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        exit={{ opacity: 0, y: '100%' }}
        transition={transition}
      >
        {children}
      </motion.div>
    );
  }

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
