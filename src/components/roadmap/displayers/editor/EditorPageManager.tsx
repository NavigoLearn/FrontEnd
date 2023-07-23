import React, { useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { rightWrapper } from '@components/roadmap/displayers/Wrappers';
import editorDisplayManager from '@store/roadmap-refactor/display/editor/editor-display-manager';
import EditorNavbarPagination from '@components/roadmap/displayers/editor/EditorNavbar';
import Attachments from '@components/roadmap/displayers/editor/pages/Attachments';
import Components from '@components/roadmap/displayers/editor/pages/Components';
import Actions from '@components/roadmap/displayers/editor/pages/Actions';
import Properties from '@components/roadmap/displayers/editor/pages/Properties';
import Nodes from '@components/roadmap/displayers/editor/pages/Nodes';
import { NodeFactoryClassicBoilerplate } from '@typescript/roadmap_ref/node/core/factories/templates/classic';
import { appendNode } from '@store/roadmap-refactor/roadmap-data/roadmap-placeholder';
import { nestedNodeFactory } from '@typescript/roadmap_ref/node/core/factories/templates/nested';
import { setSelectedNode } from '@store/roadmap-refactor/elements-editing/editor-selected-data';
import { appendNestedNode } from '@typescript/roadmap_ref/node/core/data-mutation/append';
import { useTriggerRerender } from '@hooks/useTriggerRerender';

const EditorPageManager = () => {
  const { page } = useStore(editorDisplayManager);
  const rerender = useTriggerRerender();

  useEffect(() => {
    // generates boilerplate for the placeholder to display in sleected page
    const node = NodeFactoryClassicBoilerplate();
    appendNode(node);
    const subNode1 = nestedNodeFactory(node.data.id);
    const subNode2 = nestedNodeFactory(node.data.id);
    const subNode3 = nestedNodeFactory(node.data.id);
    appendNestedNode(node, subNode1.data.id);
    appendNestedNode(node, subNode2.data.id);
    appendNestedNode(node, subNode3.data.id);
    appendNode(subNode1);
    appendNode(subNode2);
    appendNode(subNode3);
    setSelectedNode(node);
  }, []);

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
