import React, { useState } from 'react';
import { useStore } from '@nanostores/react';
import ActionsSystem from '@components/roadmap/pages-roadmap/editor/editor-pages/operations-page/actions/ActionsSystem';
import TemplatesSystem from '@components/roadmap/pages-roadmap/editor/editor-pages/operations-page/templates/TemplatesSystem';
import { operationsStore } from '@components/roadmap/pages-roadmap/editor/editor-pages/operations-page/stores/operations-store';
import { getNodeByIdRoadmapSelector } from '@src/typescript/roadmap_ref/roadmap-data/services/get';
import storeEditorSelectedData from '@store/roadmap-refactor/elements-editing/store-editor-selected-data';
import ActionsSubNode from '@components/roadmap/pages-roadmap/editor/editor-pages/operations-page/actions/ActionsSubNode';

const Operations = () => {
  const { dropdown } = useStore(operationsStore);
  const { selectedNodeId } = useStore(storeEditorSelectedData);
  const node = getNodeByIdRoadmapSelector(selectedNodeId);
  const isRoot = node.flags.renderedOnRoadmapFlag;

  return (
    <div className='flex flex-col gap-5 justify-start items-start pt-2 relative '>
      {isRoot && (
        <>
          <ActionsSystem />
          <TemplatesSystem />
        </>
      )}
      {!isRoot && <ActionsSubNode />}
      {dropdown !== 'none' && (
        <div className='absolute pointer-events-auto w-full h-full bg-white  opacity-50 z-10' />
      )}
    </div>
  );
};

export default Operations;
