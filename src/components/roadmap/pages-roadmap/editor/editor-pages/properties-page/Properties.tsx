import React, { useEffect, useState } from 'react';
import {
  mutateNodeBackgroundOpacity,
  mutateNodeCoordX,
  mutateNodeCoordY,
  mutateNodeHeight,
  mutateNodeOnClickAction,
  mutateNodeWidth,
} from '@src/typescript/roadmap_ref/node/core/data-mutation/mutate';
import { useStore } from '@nanostores/react';
import storeEditorSelectedData, {
  triggerRerenderEditor,
} from '@store/roadmap-refactor/elements-editing/store-editor-selected-data';
import VariantsComponent from '@components/roadmap/pages-roadmap/editor/editor-pages/properties-page/VariantsComponent';
import { triggerNodeRerender } from '@store/roadmap-refactor/render/rerender-triggers-nodes';
import {
  getIsRootNode,
  getNodeByIdRoadmapSelector,
} from '@src/typescript/roadmap_ref/roadmap-data/services/get';
import { tailwindTransitionClass } from '@src/UI-library/tailwind-utils';
import DraggableInput from '@src/UI-library/DraggableInput';
import DropdownWhiteSelect from '@components/roadmap/pages-roadmap/editor/reusable-components/DropdownWhiteSelect';
import { mutateActionLink } from '@src/typescript/roadmap_ref/node/core/actions/mutate';
import { getColorThemeFromRoadmap } from '@components/roadmap/pages-roadmap/setup-screen/theme-controler';
import {
  MAXIMUM_NODE_HEIGHT,
  MINIMUM_NODE_HEIGHT,
  MINIMUM_NODE_WIDTH,
} from '@src/typescript/roadmap_ref/node/core/factories/params/default-params';
import addCircle from '@assets/editor/addCircle.svg';
import { triggerNodeConnectionsRerender } from '@src/to-be-organized/triggering-stuff-alert/trigger-connections';
import { subscribeToHub } from '@store/roadmap-refactor/subscribers/function-subscribers.ts';
import { useTriggerRerender } from '@hooks/useTriggerRerender.tsx';
import TextInputStandard from './TextInputStandard';

type IActionsDropdown = {
  action: string;
  possibleActions: string[];
  onSelect: (value: string) => void;
};

const ActionsDropdown = ({
  action,
  onSelect,
  possibleActions,
}: IActionsDropdown) => {
  const [dropdown, setDropdown] = useState(false);
  return (
    <div
      className={` flex-grow border-2 border-violet-600 border-opacity-50 focus:border-opacity-100 rounded-lg h-10 px-3 ${tailwindTransitionClass}`}
    >
      <button
        type='button'
        className='flex justify-between items-center w-full h-full'
        onClick={() => {
          setDropdown((prev) => !prev);
        }}
      >
        <span>{action}</span>
        <div className='h-6 w-6'>
          <img
            src={addCircle.src}
            className='w-full h-full'
            alt='Dropdown for selecting actions'
          />
        </div>
      </button>

      <div
        className={` pointer-events-none translate-y-16 opacity-0 w-full rounded-lg bg-white px-2 
         ${
           dropdown && 'pointer-events-auto translate-y-5 opacity-100'
         } border-2 border-violet-600 ${tailwindTransitionClass} `}
      >
        {possibleActions.map((actionName) => {
          return (
            <button
              type='button'
              onClick={() => {
                onSelect(actionName);
                setDropdown(false);
              }}
              key={actionName}
              className={` h-10 my-1 text-darkBlue w-full text-lg flex justify-center items-center hover:text-white hover:bg-violet-600 rounded-lg ${tailwindTransitionClass}`}
            >
              {actionName}
            </button>
          );
        })}
      </div>
    </div>
  );
};

const Properties = () => {
  const { selectedNodeId } = useStore(storeEditorSelectedData);
  const node = getNodeByIdRoadmapSelector(selectedNodeId);
  const { data } = node;
  const rerender = useTriggerRerender();

  function checkInvalidInput(value: string) {
    const newValue = parseInt(value, 10);
    if (
      typeof newValue !== 'number' ||
      newValue > 3000 ||
      Number.isNaN(newValue)
    )
      return true;
    return false;
  }

  useEffect(() => {
    subscribeToHub('mutateNodeCoordX', rerender);
    subscribeToHub('mutateNodeCoordY', rerender);
    subscribeToHub('mutateNodeWidth', rerender);
    subscribeToHub('mutateNodeHeight', rerender);
  }, []);

  const { actions } = node;
  const { possibleActions } = actions;
  const possibleActionsArray = possibleActions;
  const [selectedSize, setSelectedSize] = useState('big');
  return (
    <div className='flex flex-col'>
      <div className='flex flex-col'>
        <div className='flex text-placeholder font-roboto-text'>
          Position & Size
        </div>
        <div className='flex flex-row gap-2 mt-1'>
          <DraggableInput
            name='X'
            value={data.coords.x}
            bounds={undefined}
            onChange={(value) => {
              const newValue = parseInt(value, 10);
              mutateNodeCoordX(node, newValue);
              triggerRerenderEditor();
              triggerNodeRerender(node.id);
              triggerNodeConnectionsRerender(node.id);
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
              triggerRerenderEditor();
              triggerNodeRerender(node.id);
              triggerNodeConnectionsRerender(node.id);
            }}
            sensitivity={2}
          />
          <div className='border-l border-rgb(0,0,0,0.6)' />
          <DraggableInput
            name='W'
            value={data.width}
            bounds={{
              min: MINIMUM_NODE_WIDTH,
              max: MAXIMUM_NODE_HEIGHT,
            }}
            onChange={(value) => {
              const newValue = parseInt(value, 10);
              // adjust for old value to keep the same center in the same place even after resizing
              const oldWidth = data.width;

              getIsRootNode(node.id) &&
                mutateNodeCoordX(
                  node,
                  data.coords.x + (oldWidth - newValue) / 2
                );
              mutateNodeWidth(node, newValue);
              triggerRerenderEditor();
              triggerNodeRerender(node.id);
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
              let newValue = parseInt(value, 10);
              if (checkInvalidInput(value)) return;
              if (newValue < MINIMUM_NODE_HEIGHT) {
                newValue = MINIMUM_NODE_HEIGHT;
              }
              // adjust for old value to keep the same center in the same place even after resizing
              const oldHeight = data.height;
              getIsRootNode(node.id) &&
                mutateNodeCoordY(
                  node,
                  data.coords.y + (oldHeight - newValue) / 2
                );
              mutateNodeHeight(node, newValue);
              triggerRerenderEditor();
              triggerNodeRerender(node.id);
            }}
            sensitivity={2}
          />
        </div>
      </div>
      <hr className='border-1 border-gray-200 mt-3' />
      <div className='flex flex-col gap-1 mt-3'>
        <div className='flex text-placeholder font-roboto-text mb-2'>
          Node color theme
        </div>
        <VariantsComponent
          selectedColor={node.data.colorType}
          selectedTheme={getColorThemeFromRoadmap()}
          node={node}
        />
        <div className='flex flex-row justify-start mt-2 mr-6'>
          {/* <DraggableInput */}
          {/*  name='Opacity' */}
          {/*  value={data.opacity} */}
          {/*  defaultValue={100} */}
          {/*  onChange={(value) => { */}
          {/*    let newValue = parseInt(value, 10); */}
          {/*    if (checkInvalidInput(value)) return; */}
          {/*    if (newValue < 0) { */}
          {/*      newValue = 0; */}
          {/*    } */}
          {/*    if (newValue > 100) { */}
          {/*      newValue = 100; */}
          {/*    } */}
          {/*    mutateNodeOpacity(node, newValue); */}
          {/*    triggerRerenderEditor(); */}
          {/*    triggerNodeRerender(node.id); */}
          {/*  }} */}
          {/*  sensitivity={1} */}
          {/* /> */}
          <DraggableInput
            name='Fill Opacity'
            value={data.backgroundOpacity}
            bounds={{
              min: 0,
              max: 100,
            }}
            onChange={(value) => {
              const newValue = parseInt(value, 10);
              mutateNodeBackgroundOpacity(node, newValue);
              triggerRerenderEditor();
              triggerNodeRerender(node.id);
            }}
            sensitivity={1}
          />
        </div>
      </div>
      <hr className='border-1 border-gray-200 mt-3' />
      <div className='flex text-placeholder font-roboto-text mt-3'>
        On click
      </div>
      <div className='flex flex-row gap-3 mt-2'>
        <div className='w-60'>
          <DropdownWhiteSelect
            dropdownName={node.actions.onClick}
            options={[
              {
                id: '1',
                name: 'Do nothing',
                callback: () => {
                  mutateNodeOnClickAction(node, 'Do nothing');
                  triggerRerenderEditor();
                },
              },
              {
                id: '2',
                name: 'Open link',
                callback: () => {
                  mutateNodeOnClickAction(node, 'Open link');
                  triggerRerenderEditor();
                },
              },
              {
                id: '3',
                name: 'Open attachment',
                callback: () => {
                  mutateNodeOnClickAction(node, 'Open attachment');
                  triggerRerenderEditor();
                },
              },
            ]}
            dropdownCallback={() => {
              return null;
            }}
          />
        </div>
        {node.actions.onClick === 'Open link' && (
          <TextInputStandard
            label='Link'
            value={actions.additionalData.link || ''}
            placeholder='http://google.com'
            onChange={(newValue: string) => {
              mutateActionLink(actions, newValue);
              triggerRerenderEditor();
            }}
            h='40px' // Customize height here
            w='208px' // Customize width here
          />
        )}
      </div>
    </div>
  );
};

export default Properties;
