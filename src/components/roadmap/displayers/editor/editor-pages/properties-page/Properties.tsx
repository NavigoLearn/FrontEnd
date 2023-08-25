import React, { useState } from 'react';
import {
  mutateNodeCoordX,
  mutateNodeCoordY,
  mutateNodeHeight,
  mutateNodeOnClickAction,
  mutateNodeOpacity,
  mutateNodeWidth,
} from '@src/typescript/roadmap_ref/node/core/data-mutation/mutate';
import { useStore } from '@nanostores/react';
import editorSelectedData, {
  triggerRerenderEditor,
} from '@store/roadmap-refactor/elements-editing/editor-selected-data';
import VariantsComponent from '@components/roadmap/displayers/editor/editor-pages/properties-page/VariantsComponent';
import { triggerNodeRerender } from '@store/roadmap-refactor/render/rerender-triggers-nodes';
import {
  getIsRootNode,
  getNodeByIdRoadmapSelector,
} from '@src/typescript/roadmap_ref/roadmap-data/services/get';
import { tailwindTransitionClass } from '@src/UI-library/tailwind-utils';
import DraggableInput from '@src/UI-library/DraggableInput';
import DropdownWhiteSelect from '@components/roadmap/displayers/editor/reusable-components/DropdownWhiteSelect';
import DropdownGreyAdd from '@src/components/roadmap/displayers/editor/reusable-components/DropdownWhiteAdd';
import { mutateActionLink } from '@src/typescript/roadmap_ref/node/core/actions/mutate';
import { getColorThemeFromRoadmap } from '@components/roadmap/displayers/setup-screen/theme-controler';
import { IActionTypes } from '@src/typescript/roadmap_ref/node/core/actions/core';
import TextVariants from './TextVariants';

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
            src='/editor/addCircle.svg'
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
  const { selectedNodeId } = useStore(editorSelectedData);
  const node = getNodeByIdRoadmapSelector(selectedNodeId);
  const { data } = node;

  function checkInvalidInput(value: string) {
    const newValue = parseInt(value, 10);
    if (typeof newValue !== 'number' || Number.isNaN(newValue)) return true;
    return false;
  }

  const { actions } = node;
  const { possibleActions } = actions;
  const possibleActionsArray = possibleActions;
  const [selectedSize, setSelectedSize] = useState('big');
  return (
    <div className='flex flex-col gap-6'>
      <div className='flex flex-col'>
        <div className='flex text-secondary font-roboto-text font-medium'>
          Position
        </div>
        <div className='flex flex-row gap-2 mt-2'>
          <DraggableInput
            name='X'
            value={data.coords.x}
            onChange={(value) => {
              const newValue = parseInt(value, 10);
              if (checkInvalidInput(value)) return;
              mutateNodeCoordX(node, newValue);
              triggerRerenderEditor();
              triggerNodeRerender(node.id);
            }}
            sensitivity={2}
          />
          <DraggableInput
            name='Y'
            value={data.coords.y}
            onChange={(value) => {
              const newValue = parseInt(value, 10);
              if (checkInvalidInput(value)) return;
              mutateNodeCoordY(node, newValue);
              triggerRerenderEditor();
              triggerNodeRerender(node.id);
            }}
            sensitivity={2}
          />
        </div>
        <hr className='border-1 border-gray-200 mt-4' />
        <div className='flex text-secondary font-roboto-text font-medium mt-2'>
          Size
        </div>
        <div className='flex flex-row gap-2 mt-2'>
          <DraggableInput
            name='W'
            value={data.width}
            onChange={(value) => {
              const newValue = parseInt(value, 10);
              if (checkInvalidInput(value)) return;
              if (newValue < 0) return;
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
            onChange={(value) => {
              const newValue = parseInt(value, 10);
              if (checkInvalidInput(value)) return;
              if (newValue < 0) return;
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
          <DraggableInput
            name='Opacity'
            value={data.opacity}
            onChange={(value) => {
              const newValue = parseInt(value, 10);
              if (checkInvalidInput(value)) return;
              if (newValue < 0 || newValue > 100) return;
              mutateNodeOpacity(node, newValue);
              triggerRerenderEditor();
              triggerNodeRerender(node.id);
            }}
            sensitivity={1}
          />
        </div>
      </div>
      <hr className='border-1 border-gray-200' />
      <div className='flex flex-col gap-1'>
        <h4 className='text-secondary text-base font-roboto-text'>Colour </h4>
        <h5 className='text-darkBlue font-medium text-md font-roboto-text'>
          Select node colour
        </h5>
        <VariantsComponent
          selectedColor={node.data.colorType}
          selectedTheme={getColorThemeFromRoadmap()}
          node={node}
        />
      </div>
      <div className='flex flex-col gap-1'>
        <h4 className='flex text-secondary font-roboto-text font-medium mt-2'>
          Text
        </h4>
        <h5 className='text-darkBlue font-medium text-md font-roboto-text'>
          Select text size
        </h5>
        <TextVariants
          selectedSize={selectedSize}
          setSelectedSize={setSelectedSize}
        />
      </div>
      <div className='flex text-secondary font-roboto-text font-medium mt-2'>
        Interactions
      </div>
      <DropdownGreyAdd
        text='Add action'
        onSelect={(actionName: IActionTypes) => {
          mutateNodeOnClickAction(node, actionName);
          triggerRerenderEditor();
        }}
        optionsList={possibleActionsArray}
      />
      <hr className='border-1 border-gray-200' />
      {actions.onClick === 'Open link' && (
        <input
          value={actions.additionalData.link}
          onChange={(e) => {
            mutateActionLink(actions, e.target.value);
            triggerRerenderEditor();
          }}
          className='w-full h-10 border-2 border-gray-300 rounded-lg px-3'
        />
      )}
    </div>
  );
};

export default Properties;
