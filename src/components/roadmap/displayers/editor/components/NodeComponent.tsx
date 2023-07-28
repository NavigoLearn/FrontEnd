import React, { useState } from 'react';
import HOCOnChangeAutomatic from '@src/HOC-library/store-based-hoc/OnChangeStoreAutomatic';
import {
  mutateNodeCoordX,
  mutateNodeCoordY,
  mutateNodeHeight,
  mutateNodeName,
  mutateNodeWidth,
} from '@src/typescript/roadmap_ref/node/core/data-mutation/mutate';
import { useStore } from '@nanostores/react';
import roadmapPlaceholder from '@store/roadmap-refactor/roadmap-data/roadmap-placeholder';
import { deleteNestedNodeWithId } from '@src/typescript/roadmap_ref/node/core/data-mutation/delete';
import { triggerRerenderEditor } from '@store/roadmap-refactor/elements-editing/editor-selected-data';
import PropertyEditorNumber from '@components/roadmap/displayers/editor/components/PropertyEditorNumber';
import { NodeClass } from '@src/typescript/roadmap_ref/node/core/core';

type INodeProperties = {
  node: NodeClass;
};

const NodeProperties = ({ node }: INodeProperties) => {
  const { data } = node;
  function checkInvalidInput(value: string) {
    const newValue = parseInt(value, 10);
    if (typeof newValue !== 'number' || Number.isNaN(newValue)) return true;
    return false;
  }
  return (
    <div className=''>
      <div className='flex'>
        <PropertyEditorNumber
          name='H'
          value={data.height}
          onChange={(value) => {
            const newValue = parseInt(value, 10);
            if (checkInvalidInput(value)) return;
            mutateNodeHeight(node, newValue);
            triggerRerenderEditor();
          }}
        />
        <PropertyEditorNumber
          name='W'
          value={data.width}
          onChange={(value) => {
            const newValue = parseInt(value, 10);
            if (checkInvalidInput(value)) return;
            mutateNodeWidth(node, newValue);
            triggerRerenderEditor();
          }}
        />
      </div>
      <div className='flex'>
        <PropertyEditorNumber
          name='X'
          value={data.coords.x}
          onChange={(value) => {
            const newValue = parseInt(value, 10);
            if (checkInvalidInput(value)) return;
            mutateNodeCoordX(node, newValue);
            triggerRerenderEditor();
          }}
        />
        <PropertyEditorNumber
          name='Y'
          value={data.coords.y}
          onChange={(value) => {
            const newValue = parseInt(value, 10);
            if (checkInvalidInput(value)) return;
            mutateNodeCoordY(node, newValue);
            triggerRerenderEditor();
          }}
        />
      </div>
    </div>
  );
};

type INameChangeComponent = {
  onChange: (value: string) => void;
  value: string;
  onSave: (value: string) => void;
};
const NameChangeComponent = HOCOnChangeAutomatic(
  ({ onChange, value, onSave }: INameChangeComponent) => {
    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        onSave(value);
      }
    };
    return (
      <input
        onKeyDown={handleKeyPress}
        className='w-32 outline-black outline-2'
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
        }}
      />
    );
  }
);

const NodeComponent = ({
  parentNestId,
  id,
}: {
  parentNestId: string;
  id: string;
}) => {
  const { nodes } = useStore(roadmapPlaceholder);
  const node = nodes[id];
  const parentNode = nodes[parentNestId];
  const [nameChange, setNameChange] = useState(false);

  return (
    <div>
      <div className='flex gap-10 items-center'>
        <section>
          {!nameChange ? (
            <span
              onDoubleClick={() => {
                console.log('double click');
                setNameChange(true);
              }}
              className=''
            >
              {node.name}
            </span>
          ) : (
            <NameChangeComponent
              defaultValue={node.name}
              onSave={(newName: string) => {
                mutateNodeName(node, newName);
                setNameChange(false);
              }}
            />
          )}
          <NodeProperties node={node} />
        </section>
        <button
          type='button'
          className=' w-8 h-8 mx-4 mb-2'
          onClick={() => {
            deleteNestedNodeWithId(parentNode, id);
            triggerRerenderEditor();
          }}
        >
          <img
            src='/editor/deleteBin.svg'
            alt='Delete button for title component'
            className='w-full h-full'
          />
        </button>

        <button
          type='button'
          className=' w-20 h-10 bg-blue-400 text-white rounded-lg'
          onClick={() => {
            console.log('change editor to this node');
          }}
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default NodeComponent;
