import React from 'react';
import {
  mutateNodeColor,
  mutateNodeCoordX,
  mutateNodeCoordY,
  mutateNodeHeight,
  mutateNodeOpacity,
  mutateNodeWidth,
} from '@src/typescript/roadmap_ref/node/core/data-mutation/mutate';
import PropertyEditorNumber from '@components/roadmap/displayers/editor/components/PropertyEditorNumber';
import { useStore } from '@nanostores/react';
import editorSelectedData, {
  triggerRerenderEditor,
} from '@store/roadmap-refactor/elements-editing/editor-selected-data';
import VariantsComponent from '@components/roadmap/displayers/editor/components/VariantsComponent';
import ButtonOutsideGray from '@components/roadmap/displayers/editor/components/builder/ButtonOutsideGray';
import ButtonInsideGeneric from '@components/roadmap/displayers/editor/components/builder/ButtonInsideGeneric';
import { nodeFactoryClassicBoilerplate } from '@src/typescript/roadmap_ref/node/core/factories/templates/classic';
import { NodeFactoryResourceBoilerplate } from '@src/typescript/roadmap_ref/node/core/factories/templates/resource';
import { getNodeByIdRoadmapEdit } from '@store/roadmap-refactor/roadmap-data/roadmap-edit';
import { triggerNodeRerender } from '@store/roadmap-refactor/render/rerender-triggers';

const Properties = () => {
  const { selectedNodeId } = useStore(editorSelectedData);
  const node = getNodeByIdRoadmapEdit(selectedNodeId);
  const { data } = node;

  function checkInvalidInput(value: string) {
    const newValue = parseInt(value, 10);
    if (typeof newValue !== 'number' || Number.isNaN(newValue)) return true;
    return false;
  }

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex flex-col gap-2'>
        <PropertyEditorNumber
          name='Width'
          value={data.width}
          onChange={(value) => {
            const newValue = parseInt(value, 10);
            if (checkInvalidInput(value)) return;
            // adjust for old value to keep the same center in the same place even after resizing
            const oldWidth = data.width;
            mutateNodeCoordX(node, data.coords.x + (oldWidth - newValue) / 2);
            mutateNodeWidth(node, newValue);
            triggerRerenderEditor();
            triggerNodeRerender(node.id);
          }}
        />
        <PropertyEditorNumber
          name='Height'
          value={data.height}
          onChange={(value) => {
            const newValue = parseInt(value, 10);
            if (checkInvalidInput(value)) return;
            const oldHeight = data.height;
            mutateNodeCoordY(node, data.coords.y + (oldHeight - newValue) / 2);

            mutateNodeHeight(node, newValue);
            triggerRerenderEditor();
            triggerNodeRerender(node.id);
          }}
        />
        <PropertyEditorNumber
          name='Opacity'
          value={data.opacity}
          onChange={(value) => {
            const newValue = parseInt(value, 10);
            if (checkInvalidInput(value)) return;
            mutateNodeOpacity(node, newValue);
            triggerRerenderEditor();
          }}
        />
      </div>
      <div className='flex'>
        <h4 className='text-secondary text-base'>Color Variants</h4>
        <VariantsComponent
          variants={[
            {
              name: 'primary',
              color: '#000000',
              callback: () => {
                mutateNodeColor(node, 'default');
              },
            },
            {
              name: 'tertiary',
              color: '#0051ff',
              callback: () => {
                mutateNodeColor(node, 'version2');
              },
            },
            {
              name: 'secondary',
              color: '#ff0000',
              callback: () => {
                mutateNodeColor(node, 'default');
              },
            },
          ]}
        />
      </div>
      <ButtonOutsideGray>
        <ButtonInsideGeneric
          name='Basic Template'
          icon='/editor/addCircle.svg'
          onClick={() => {
            Object.assign(node, nodeFactoryClassicBoilerplate());
          }}
        />
      </ButtonOutsideGray>
      <div className='text-center opacity-70 '>
        Basic template, contains only a title and a basic tab with preamde
        classic size
      </div>
      <ButtonOutsideGray>
        <ButtonInsideGeneric
          name='Resource Template'
          icon='/editor/addCircle.svg'
          onClick={() => {
            Object.assign(node, NodeFactoryResourceBoilerplate());
          }}
        />
      </ButtonOutsideGray>
      <div className='text-center opacity-70 '>
        Resource template, contains only a title along with 2 basic nested nodes
      </div>
    </div>
  );
};

export default Properties;
