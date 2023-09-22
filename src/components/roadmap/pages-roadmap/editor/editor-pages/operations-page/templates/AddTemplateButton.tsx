import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { addTemplateFromNode } from '@src/typescript/roadmap_ref/node/templates-system/template-protocols';
import { getSelectedNodeId } from '@store/roadmap-refactor/elements-editing/store-editor-selected-data';
import { getNodeByIdRoadmapSelector } from '@src/typescript/roadmap_ref/roadmap-data/services/get';
import { triggerRerenderOperations } from '@components/roadmap/pages-roadmap/editor/editor-pages/operations-page/stores/operations-store';
import addCircle from '@assets/editor/addCircle.svg';

const AddTemplateButton = () => {
  const [hovered, setHovered] = useState(false);
  const nodeId = getSelectedNodeId();

  return (
    <section className='flex relative'>
      <button
        onClick={() => {
          const node = getNodeByIdRoadmapSelector(nodeId);
          addTemplateFromNode(node);
          triggerRerenderOperations();
        }}
        onMouseOver={() => {
          setHovered(true);
        }}
        onMouseOut={() => {
          setHovered(false);
        }}
        type='button'
        className='flex items-center gap-2'
      >
        <div className='text-darkBlue font-medium text-md font-roboto-text'>
          Add as template
        </div>
        <img
          className='w-7 h-7'
          alt='add button for template'
          src={addCircle.src}
        />
      </button>
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, x: '25%' }}
            animate={{ opacity: 1, x: 5 }}
            exit={{ opacity: 0, x: '25%' }}
            className='absolute text-darkBlue font-roboto-text text-xs left-[calc(100%+10px)] w-40 text-opacity-30 '
          >
            Adds the currently selected node as a template
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default AddTemplateButton;
