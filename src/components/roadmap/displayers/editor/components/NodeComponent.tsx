import React, { useEffect, useState } from 'react';
import HOCOnChangeAutomatic from '@src/HOC-library/store-based-hoc/OnChangeStoreAutomatic';
import {
  mutateNodeCoordX,
  mutateNodeCoordY,
  mutateNodeHeight,
  mutateNodeName,
  mutateNodeWidth,
} from '@src/typescript/roadmap_ref/node/core/data-mutation/mutate';
import { useStore } from '@nanostores/react';
import { triggerRerenderEditor } from '@store/roadmap-refactor/elements-editing/editor-selected-data';
import PropertyEditorNumber from '@components/roadmap/displayers/editor/components/PropertyEditorNumber';
import { NodeClass } from '@src/typescript/roadmap_ref/node/core/core';
import { roadmapSelector } from '@store/roadmap-refactor/roadmap-data/roadmap-selector';
import { triggerNodeRerender } from '@store/roadmap-refactor/render/rerender-triggers-nodes';
import { useTriggerRerender } from '@hooks/useTriggerRerender';
import { subscribeToHub } from '@store/roadmap-refactor/subscribers/function-subscribers';
import TrashIcon from '@src/UI-library/svg-anims';

type INodeProperties = {
  node: NodeClass;
};

const NodeProperties = ({ node }: INodeProperties) => {
  const { data } = node;
  const rerender = useTriggerRerender();
  useEffect(() => {
    subscribeToHub('mutateNodeCoordX', () => {
      rerender();
    });
    subscribeToHub('mutateNodeCoordY', () => {
      rerender();
    });
  }, []);

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
            triggerNodeRerender(node.id);
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
            triggerNodeRerender(node.id);
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
            triggerNodeRerender(node.id);
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
            triggerNodeRerender(node.id);
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
  const { nodes } = useStore(roadmapSelector);
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
            deleteProtocolNodeFromRoadmap(node);
            triggerNodeRerender(parentNode.id);
            triggerRerenderEditor();
          }}
        >
          <TrashIcon />
        </button>
        <button
          type='button'
          className=' w-20 h-10 bg-blue-400 text-white rounded-lg mt-7'
          onClick={() => {}}
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default NodeComponent;
