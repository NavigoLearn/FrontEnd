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
import { triggerRerenderEditor } from '@store/roadmap-refactor/elements-editing/store-editor-selected-data';
import { NodeClass } from '@src/typescript/roadmap_ref/node/core/core';
import { roadmapSelector } from '@store/roadmap-refactor/roadmap-data/roadmap-selector';
import { triggerNodeRerender } from '@store/roadmap-refactor/render/rerender-triggers-nodes';
import { useTriggerRerender } from '@hooks/useTriggerRerender';
import { subscribeToHub } from '@store/roadmap-refactor/subscribers/function-subscribers';
import TrashIcon from '@src/UI-library/svg-components/trash/TrashIcon';
import { deleteProtocolNodeFromRoadmap } from '@src/typescript/roadmap_ref/roadmap-data/protocols/delete';
import DraggableInput from '@src/UI-library/DraggableInput';
import TrashIconCustomizable from '@src/UI-library/svg-components/trash/TrashIconCustomizable';
import {
  MAXIMUM_NODE_HEIGHT,
  MAXIMUM_NODE_WIDTH,
  MINIMUM_NODE_HEIGHT,
  MINIMUM_NODE_WIDTH,
} from '@src/typescript/roadmap_ref/node/core/factories/params/default-params.ts';

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
      <div className='flex flex-row gap-1'>
        <DraggableInput
          name='X'
          value={data.coords.x}
          bounds={undefined}
          onChange={(value) => {
            const newValue = parseInt(value, 10);
            mutateNodeCoordX(node, newValue);
            triggerNodeRerender(node.id);
            triggerRerenderEditor();
          }}
          sensitivity={2}
        />
        <DraggableInput
          name='Y'
          value={data.coords.y}
          bounds={undefined}
          onChange={(value) => {
            const newValue = parseInt(value, 10);
            if (checkInvalidInput(value)) return;
            mutateNodeCoordY(node, newValue);
            triggerNodeRerender(node.id);
            triggerRerenderEditor();
          }}
          sensitivity={2}
        />
        <div className='border-l-[2px] border-rgb(0,0,0,0.6) mx-1' />
        <DraggableInput
          name='W'
          value={data.width}
          bounds={{
            min: MINIMUM_NODE_WIDTH,
            max: MAXIMUM_NODE_WIDTH,
          }}
          onChange={(value) => {
            const newValue = parseInt(value, 10);
            if (checkInvalidInput(value)) return;
            mutateNodeWidth(node, newValue);
            triggerNodeRerender(node.id);
            triggerRerenderEditor();
          }}
          sensitivity={2}
        />
        <DraggableInput
          name='H'
          value={data.height}
          bounds={{
            min: MINIMUM_NODE_HEIGHT,
            max: MAXIMUM_NODE_HEIGHT,
          }}
          onChange={(value) => {
            const newValue = parseInt(value, 10);
            if (checkInvalidInput(value)) return;
            mutateNodeHeight(node, newValue);
            triggerNodeRerender(node.id);
            triggerRerenderEditor();
          }}
          sensitivity={2}
        />
      </div>
      <div className='flex' />
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
  const nodeNumber = parentNode.subNodeIds.indexOf(id) + 1;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div>
      <div className='flex gap-10 items-center'>
        <section>
          {!nameChange ? (
            <span
              onDoubleClick={() => {
                setNameChange(true);
              }}
              className='text-placeholder font-roboto-text text-md'
            >
              {`Subnode ${nodeNumber}`}
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
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className='mt-5'
          onClick={() => {
            deleteProtocolNodeFromRoadmap(node);
            triggerNodeRerender(parentNode.id);
            triggerRerenderEditor();
          }}
        >
          <TrashIconCustomizable
            sizeIcon={53}
            sizeContainer={53}
            hovered={isHovered}
          />
        </button>
        {/* <button */}
        {/*  type='button' */}
        {/*  className=' w-20 h-10 bg-blue-400 text-white rounded-lg mt-7' */}
        {/*  onClick={() => {}} */}
        {/* > */}
        {/*  Edit */}
        {/* </button> */}
      </div>
    </div>
  );
};

export default NodeComponent;
