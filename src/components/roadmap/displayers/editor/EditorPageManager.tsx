import React from 'react';
import { useStore } from '@nanostores/react';
import { rightWrapper } from '@components/roadmap/displayers/Wrappers';
import editorDisplayManager from '@store/roadmap-refactor/display/editor/editor-display-manager';
import EditorNavbarPagination from '@components/roadmap/displayers/editor/EditorNavbar';
import Attachments from '@components/roadmap/displayers/editor/pages/Attachments';
import Components from '@components/roadmap/displayers/editor/pages/Components';
import Actions from '@components/roadmap/displayers/editor/pages/Actions';
import Properties from '@components/roadmap/displayers/editor/pages/Properties';
import Nodes from '@components/roadmap/displayers/editor/pages/Nodes';

const EditorPageManager = () => {
  const { page } = useStore(editorDisplayManager);

  const pagesMapperJSON = {
    attachments: <Attachments />,
    components: <Components />,
    actions: <Actions />,
    properties: <Properties />,
    nodes: <Nodes />,
  };
  const selectedPage = pagesMapperJSON[page];

  return (
    <div className='h-full w-full flex flex-col'>
      <EditorNavbarPagination
        field='page'
        storeTemporary={editorDisplayManager}
      />
      <div className='mt-5 flex-grow'>{selectedPage}</div>
    </div>
  );
};

export default rightWrapper(EditorPageManager);
