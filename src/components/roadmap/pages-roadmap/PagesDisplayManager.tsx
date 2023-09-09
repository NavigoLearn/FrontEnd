import React from 'react';
import TabAttachmentView from '@components/roadmap/pages-roadmap/tab-attachment/TabAttachmentView';
import { AnimatePresence } from 'framer-motion';
import { useStore } from '@nanostores/react';
import displayStore from '@store/roadmap-refactor/display/display-manager';
import EditorPageManager from '@components/roadmap/pages-roadmap/editor/EditorPageManager';
import { NotificationProvider } from '../to-be-organized/notifications/NotificationLogic';

const PagesDisplayManager = () => {
  const { type } = useStore(displayStore);

  return (
    <NotificationProvider>
      <AnimatePresence>
        {type === 'editor' && <EditorPageManager />}
        {type === 'tab' && <TabAttachmentView />}
        {type === 'issues' && <div />}
        {type === 'about' && <div />}
      </AnimatePresence>
    </NotificationProvider>
  );
};

export default PagesDisplayManager;
