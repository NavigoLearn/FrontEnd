import React from 'react';
import attachmentPageStatus from '@store/roadmap-refactor/display/editor/attachment-page-status';
import { useStore } from '@nanostores/react';
import { rightWrapper } from '@components/roadmap/displayers/Wrappers';
import editorDisplayManager from '@store/roadmap-refactor/display/editor/editor-display-manager';
import EditorNavbarPagination from '@components/roadmap/displayers/editor/EditorNavbar';
import TabAttachment from '@components/roadmap/displayers/editor/pages/TabAttachment';
import Components from '@components/roadmap/displayers/editor/pages/Components';
import Actions from '@components/roadmap/displayers/editor/pages/Actions';
import Properties from '@components/roadmap/displayers/editor/pages/Properties';
import Nodes from '@components/roadmap/displayers/editor/pages/Nodes';

const EditorPageManager = () => {
  const { page } = useStore(editorDisplayManager);

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

  return (
    <div className='h-full w-full flex flex-col'>
      <EditorNavbarPagination
        storeTemporary={editorDisplayManager}
        field='page'
        defaultValue='components'
      />
      <div className='mt-5 flex-grow overflow-y-auto px-7'>
        <div className='h-full '>{selectedPage}</div>
      </div>
    </div>
  );
};

export default rightWrapper(EditorPageManager);
