import React, { useRef } from 'react';
import attachmentPageStatus from '@store/roadmap-refactor/display/editor/attachment-page-status';
import { useStore } from '@nanostores/react';
import { rightWrapper } from '@components/roadmap/displayers/Wrappers';
import editorDisplayManager from '@store/roadmap-refactor/display/editor/editor-display-manager';
import EditorNavbarPagination from '@components/roadmap/displayers/editor/EditorNavbar';
import TabAttachment from '@components/roadmap/displayers/editor/pages/TabAttachmentEditor';
import Components from '@components/roadmap/displayers/editor/pages/Components';
import Actions from '@components/roadmap/displayers/editor/pages/Actions';
import Properties from '@components/roadmap/displayers/editor/pages/Properties';
import Nodes from '@components/roadmap/displayers/editor/pages/Nodes';
import { useClickOutside } from '@hooks/useClickOutside';
import { closeEditorProtocol } from '@src/to-be-organized/nodeview/actions-manager';
import { usePressEsc } from '@hooks/usePressEsc';

const EditorPageManager = () => {
  const { page } = useStore(editorDisplayManager);
  const divRef = useRef(null);

  const pagesMapperJSON = {
    attachments: (
      <TabAttachment
        defaultValue={{ isEditing: false }}
        field='status'
        storeTemporary={attachmentPageStatus}
      />
    ),
    components: <Components />,
    actions: <Actions />,
    properties: <Properties />,
    nodes: <Nodes />,
  };

  const selectedPage = pagesMapperJSON[page];
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
        <div className='h-full'>{selectedPage}</div>
      </div>
    </div>
  );
};

export default rightWrapper(EditorPageManager);
