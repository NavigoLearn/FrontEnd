import React, { useRef } from 'react';
import attachmentPageStatus from '@store/roadmap-refactor/display/editor/attachment-page-status';
import { useStore } from '@nanostores/react';
import { rightWrapper } from '@components/roadmap/pages-roadmap/Wrappers';
import editorDisplayManager, {
  type IEditorDisplayPageType,
} from '@store/roadmap-refactor/display/editor/editor-display-manager';
import EditorNavbarPagination from '@components/roadmap/pages-roadmap/editor/EditorNavbar';
import TabAttachment from '@components/roadmap/pages-roadmap/editor/editor-pages/tab-page/TabAttachmentEditor';
import Components from '@components/roadmap/pages-roadmap/editor/editor-pages/components-page/Components';
import Operations from '@components/roadmap/pages-roadmap/editor/editor-pages/operations-page/Operations';
import Properties from '@components/roadmap/pages-roadmap/editor/editor-pages/properties-page/Properties';
import SubNodesPage from '@components/roadmap/pages-roadmap/editor/editor-pages/nodes-page/SubNodesPage';
import { AnimatePresence, motion } from 'framer-motion';

const pagesMapperJSON: Record<IEditorDisplayPageType, React.ReactNode> = {
  attachment: (
    <TabAttachment
      defaultValue={{ isEditing: true }}
      field='status'
      storeTemporary={attachmentPageStatus}
    />
  ),
  components: <Components />,
  operations: <Operations />,
  properties: <Properties />,
  nodes: <SubNodesPage />,
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

  const isAttachmentsPage = page === 'attachment'; // Check if selected page is "attachment"

  return (
    <>
      <div className='h-28'>
        <EditorNavbarPagination
          storeTemporary={editorDisplayManager}
          field='page'
          defaultValue='components'
        />
      </div>
      <div ref={divRef} className='h-[calc(100%-112px)] w-full flex flex-col '>
        <div
          className={`mt-2   flex-grow overflow-y-auto overflow-x-hidden ${
            isAttachmentsPage ? 'px-0' : 'px-5'
          }`}
        >
          <AnimatePresence>
            <SelectedPage page={page} />
          </AnimatePresence>
        </div>
      </div>
    </>
  );
};

export default rightWrapper(EditorPageManager);
