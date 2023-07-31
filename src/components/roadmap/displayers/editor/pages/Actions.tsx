import React from 'react';
import editorSelectedData from '@store/roadmap-refactor/elements-editing/editor-selected-data';
import { useStore } from '@nanostores/react';
import {
  appendConnectionRoadmapSelector,
  appendNodeRoadmapSelector,
  appendRootNodeId,
  getNodeByIdRoadmapSelector,
} from '@store/roadmap-refactor/roadmap-data/roadmap-selector';
import { nodeFactoryClassic } from '@src/typescript/roadmap_ref/node/core/factories/templates/classic';
import { injectParentData } from '@src/typescript/roadmap_ref/node/core/factories/injectors/inject';
import {
  appendChildNodeId,
  appendConnectionNode,
} from '@src/typescript/roadmap_ref/node/core/data-mutation/append';
import { factoryConnectionBasic } from '@src/typescript/roadmap_ref/node/connections/factories';
import { triggerChunkRerender } from '@store/roadmap-refactor/render/rendered-chunks';
import { applyRoadmapDraggability } from '@src/typescript/roadmap_ref/dragging/misc';
import { setDisplayPageType } from '@store/roadmap-refactor/display/display-manager';

const Actions = () => {
  const { selectedNodeId } = useStore(editorSelectedData);
  const node = getNodeByIdRoadmapSelector(selectedNodeId);

  return (
    <div className='flex flex-col gap-10'>
      <button
        type='button'
        onClick={() => {
          const newNode = nodeFactoryClassic(500, 200, 200, 200);
          injectParentData(newNode, node.id);
          appendChildNodeId(node, newNode.id);

          const connection = factoryConnectionBasic(node.id, newNode.id);
          appendConnectionNode(node, connection.id);
          appendConnectionNode(newNode, connection.id);

          appendNodeRoadmapSelector(newNode);
          appendRootNodeId(newNode.id);
          appendConnectionRoadmapSelector(connection);

          triggerChunkRerender();
          applyRoadmapDraggability();
          setDisplayPageType('closed');
        }}
      >
        Add node
      </button>
      <button
        type='button'
        onClick={() => {
          // classic delete
          console.log('delete node');
          // delete from other nodes
          // delete from connections and take down connections
          // delete all subchildren/ rereoute them to the other nodes
          // delete from chunks
        }}
      >
        Delete this node
      </button>
    </div>
  );
};

export default Actions;
