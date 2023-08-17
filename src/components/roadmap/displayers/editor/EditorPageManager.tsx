import React, { useRef } from 'react';
import attachmentPageStatus from '@store/roadmap-refactor/display/editor/attachment-page-status';
import { useStore } from '@nanostores/react';
import { rightWrapper } from '@components/roadmap/displayers/Wrappers';
import editorDisplayManager, {
  IEditorDisplayPageType,
} from '@store/roadmap-refactor/display/editor/editor-display-manager';
import EditorNavbarPagination from '@components/roadmap/displayers/editor/EditorNavbar';
import TabAttachment from '@components/roadmap/displayers/editor/pages/TabAttachmentEditor';
import Components from '@components/roadmap/displayers/editor/pages/Components';
import Actions from '@components/roadmap/displayers/editor/pages/Actions';
import Properties from '@components/roadmap/displayers/editor/pages/Properties';
import Nodes from '@components/roadmap/displayers/editor/pages/Nodes';
import { AnimatePresence, motion } from 'framer-motion';

const pagesMapperJSON = {
  attachments: (
    <TabAttachment
      defaultValue={{ isEditing: true }}
      field='status'
      storeTemporary={attachmentPageStatus}
    />
  ),
  components: <Components />,
  actions: <Actions />,
  properties: <Properties />,
  nodes: <Nodes />,
};

const SelectedPage = ({ page }: { page: IEditorDisplayPageType }) => {
  return (
    <motion.div
      key={page}
      initial={{ opacity: 0, x: '5%', y: 0 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{
        duration: 0.25,
        ease: [0.43, 0.13, 0.23, 0.96], // Custom easing curve
      }}
      className=' relative w-full h-full'
    >
      {pagesMapperJSON[page]}
    </motion.div>
  );
};

const EditorPageManager = () => {
  const { page } = useStore(editorDisplayManager);
  const divRef = useRef(null);

  const isAttachmentsPage = page === 'attachments'; // Check if selected page is "attachments"

  return (
    <div ref={divRef} className='h-full w-full flex flex-col '>
      <EditorNavbarPagination
        storeTemporary={editorDisplayManager}
        field='page'
        defaultValue='components'
      />
      <div
        className={`mt-5 flex-grow overflow-y-auto ${
          isAttachmentsPage ? 'px-0' : 'px-7'
        }`}
      >
        <AnimatePresence>
          <SelectedPage page={page} />
        </AnimatePresence>
      </div>
    </div>
  );
};

export default rightWrapper(EditorPageManager);
