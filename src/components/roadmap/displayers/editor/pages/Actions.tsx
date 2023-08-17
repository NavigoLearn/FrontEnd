import React from 'react';
import editorSelectedData from '@store/roadmap-refactor/elements-editing/editor-selected-data';
import { useStore } from '@nanostores/react';
import { getNodeByIdRoadmapSelector } from '@src/typescript/roadmap_ref/roadmap-data/services/get';
import { appendClassicNodeToRoadmap } from '@src/typescript/roadmap_ref/roadmap-data/protocols/append';
import {
  deleteProtocolNodeFromRoadmap,
  deleteProtocolNodeFromRoadmapRecursive,
} from '@src/typescript/roadmap_ref/roadmap-data/protocols/delete';
import { closeEditorProtocol } from '@src/to-be-organized/nodeview/actions-manager';
import { roadmapSelector } from '@store/roadmap-refactor/roadmap-data/roadmap-selector';
import { donsole } from '@src/typescript/roadmap_ref/utils';

const Actions = () => {
  const { selectedNodeId } = useStore(editorSelectedData);
  const node = getNodeByIdRoadmapSelector(selectedNodeId);

  return (
    <div className='flex flex-col gap-10'>
      <button
        type='button'
        onClick={() => {
          appendClassicNodeToRoadmap(node);
        }}
      >
        Add node
      </button>
      <button
        type='button'
        onClick={() => {
          deleteProtocolNodeFromRoadmap(node);
          closeEditorProtocol();
        }}
      >
        Delete this node
      </button>
      <button
        type='button'
        onClick={() => {
          deleteProtocolNodeFromRoadmapRecursive(node);
          donsole(roadmapSelector.get());
          closeEditorProtocol();
        }}
      >
        Delete this node + subtree
      </button>
    </div>
  );
};

export default Actions;
