import React from 'react';
import PropertyEditorNumber from '@components/roadmap/displayers/editor/components/PropertyEditorNumber';
import { useStore } from '@nanostores/react';
import editorSelectedData, {
  triggerRerenderEditor,
} from '@store/roadmap-refactor/elements-editing/editor-selected-data';
import {
  mutateNodeHeight,
  mutateNodeOpacity,
  mutateNodeWidth,
} from '@typescript/roadmap_ref/node/core/data-mutation/mutate';

const Properties = () => {
  const { node, selectedNodeId } = useStore(editorSelectedData);
  const { properties } = node;

  return (
    <div>
      <PropertyEditorNumber
        name='Width'
        value={properties.width}
        onChange={(value) => {
          const newValue = parseInt(value, 10);
          mutateNodeWidth(node, newValue);
          triggerRerenderEditor();
        }}
      />
      <PropertyEditorNumber
        name='Height'
        value={properties.height}
        onChange={(value) => {
          const newValue = parseInt(value, 10);
          mutateNodeHeight(node, newValue);
          triggerRerenderEditor();
        }}
      />
      <PropertyEditorNumber
        name='Opacity'
        value={properties.opacity}
        onChange={(value) => {
          const newValue = parseInt(value, 10);
          mutateNodeOpacity(node, newValue);
          triggerRerenderEditor();
        }}
      />
    </div>
  );
};

export default Properties;
