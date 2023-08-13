import React, { useState } from 'react';
import {
  mutateNodeColor,
  mutateNodeCoordX,
  mutateNodeCoordY,
  mutateNodeHeight,
  mutateNodeOnClickAction,
  mutateNodeOpacity,
  mutateNodeWidth,
} from '@src/typescript/roadmap_ref/node/core/data-mutation/mutate';
import PropertyEditorNumber from '@components/roadmap/displayers/editor/components/PropertyEditorNumber';
import { useStore } from '@nanostores/react';
import editorSelectedData, {
  triggerRerenderEditor,
} from '@store/roadmap-refactor/elements-editing/editor-selected-data';
import VariantsComponent from '@components/roadmap/displayers/editor/components/VariantsComponent';
import { triggerNodeRerender } from '@store/roadmap-refactor/render/rerender-triggers';
import { getNodeByIdRoadmapSelector } from '@store/roadmap-refactor/roadmap-data/roadmap-selector';
import { tailwindTransitionClass } from '@src/UI-library/tailwind-utils';
import { IActionTypes } from '@src/typescript/roadmap_ref/node/core/actions';
import { selectNodeColorScheme } from '@src/typescript/roadmap_ref/node/core/factories/injectors/services';
import { colorThemes } from '@src/typescript/roadmap_ref/node/core/factories/params/params';

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
              color: selectNodeColorScheme(node.data.colorTheme, 'primary'),
              callback: () => {
                mutateNodeColor(node, 'primary');
                triggerNodeRerender(node.id);
              },
            },
            {
              color: selectNodeColorScheme(node.data.colorTheme, 'secondary'),
              callback: () => {
                mutateNodeColor(node, 'secondary');
                triggerNodeRerender(node.id);
              },
            },
            {
              color: selectNodeColorScheme(node.data.colorTheme, 'tertiary'),
              callback: () => {
                mutateNodeColor(node, 'tertiary');
                triggerNodeRerender(node.id);
              },
            },
          ]}
        />
      </div>

      <div className='flex gap-3'>
        <h4 className='text-darkBlue font-kanit-text font-medium flex items-center text-lg '>
          On Click Event
        </h4>
        <ActionsDropdown
          action={actions.onClick}
          possibleActions={possibleActionsArray}
          onSelect={(actionName: IActionTypes) => {
            mutateNodeOnClickAction(node, actionName);
            triggerRerenderEditor();
          }}
        />
      </div>

      {/* <ButtonOutsideGray> */}
      {/*  <ButtonInsideGeneric */}
      {/*    name='Basic Template' */}
      {/*    icon='/editor/addCircle.svg' */}
      {/*    onClick={() => { */}
      {/*      Object.assign(node, nodeFactoryClassicBoilerplate()); */}
      {/*    }} */}
      {/*  /> */}
      {/* </ButtonOutsideGray> */}
      {/* <div className='text-center opacity-70 '> */}
      {/*  Basic template, contains only a title and a basic tab with preamde */}
      {/*  classic size */}
      {/* </div> */}
      {/* <ButtonOutsideGray> */}
      {/*  <ButtonInsideGeneric */}
      {/*    name='Resource Template' */}
      {/*    icon='/editor/addCircle.svg' */}
      {/*    onClick={() => { */}
      {/*      Object.assign(node, nodeFactoryResourceBoilerplate()); */}
      {/*    }} */}
      {/*  /> */}
      {/* </ButtonOutsideGray> */}
      {/* <div className='text-center opacity-70 '> */}
      {/*  Resource template, contains only a title along with 2 basic nested nodes */}
      {/* </div> */}
    </div>
  );
};

export default Properties;
