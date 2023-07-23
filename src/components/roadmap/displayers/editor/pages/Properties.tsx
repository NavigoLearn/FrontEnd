import React from 'react';
import PropertyEditorNumber from '@components/roadmap/displayers/editor/components/PropertyEditorNumber';
import { useStore } from '@nanostores/react';
import editorSelectedData, {
  triggerRerenderEditor,
} from '@store/roadmap-refactor/elements-editing/editor-selected-data';
import {
  mutateNodeColor,
  mutateNodeHeight,
  mutateNodeOpacity,
  mutateNodeWidth,
} from '@typescript/roadmap_ref/node/core/data-mutation/mutate';
import VariantsComponent from '@components/roadmap/displayers/editor/components/VariantsComponent';
import ButtonOutsideGray from '@components/roadmap/displayers/editor/components/builder/ButtonOutsideGray';
import ButtonInsideGeneric from '@components/roadmap/displayers/editor/components/builder/ButtonInsideGeneric';

const Properties = () => {
  const { node, selectedNodeId } = useStore(editorSelectedData);
  const { properties } = node;

  function checkInvalidInput(value: string) {
    const newValue = parseInt(value, 10);
    if (typeof newValue !== 'number' || Number.isNaN(newValue)) return true;
    return false;
  }

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex flex-col gap-0'>
        <PropertyEditorNumber
          name='Width'
          value={properties.width}
          onChange={(value) => {
            const newValue = parseInt(value, 10);
            if (checkInvalidInput(value)) return;
            mutateNodeWidth(node, newValue);
            triggerRerenderEditor();
          }}
        />
        <PropertyEditorNumber
          name='Height'
          value={properties.height}
          onChange={(value) => {
            const newValue = parseInt(value, 10);
            if (checkInvalidInput(value)) return;
            mutateNodeHeight(node, newValue);
            triggerRerenderEditor();
          }}
        />
        <PropertyEditorNumber
          name='Opacity'
          value={properties.opacity}
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
          icon='/editor/addCircle'
          onClick={() => {
            console.log('add basic template');
          }}
        />
      </ButtonOutsideGray>
    </div>
  );
};

export default Properties;
