import React, { useState } from 'react';
import editorSelectedData from '@store/roadmap-refactor/elements-editing/editor-selected-data';
import { useStore } from '@nanostores/react';
import { getNodeByIdRoadmapSelector } from '@src/typescript/roadmap_ref/roadmap-data/services/get';
import { appendClassicNodeToRoadmap } from '@src/typescript/roadmap_ref/roadmap-data/protocols/append';
import {
  deleteProtocolNodeFromRoadmap,
  deleteProtocolNodeFromRoadmapRecursive,
} from '@src/typescript/roadmap_ref/roadmap-data/protocols/delete';
import { closeEditorProtocol } from '@src/to-be-organized/nodeview/actions-manager';
import DropdownWhiteSelect from '@components/roadmap/displayers/editor/reusable-components/DropdownWhiteSelect';
import { tailwindTransitionClass } from '@src/UI-library/tailwind-utils';
import TrashIconCustomizable from '@src/UI-library/svg-animations/trash/TrashIconCustomizable';
import { applyNodeTemplate } from '@src/typescript/roadmap_ref/node/core/factories/core';
import DropdownWhiteAdd from '@components/roadmap/displayers/editor/reusable-components/DropdownWhiteAdd';
import DropdownWhiteAddCleaner from '@components/roadmap/displayers/editor/reusable-components/DropdownWhiteAddCleaner';

type IDeleteButtonProps = {
  callback: () => void;
  text: string;
};
const DeleteButton = ({ callback, text }: IDeleteButtonProps) => {
  const [mouseOver, setMouseOver] = useState(false);
  return (
    <div className='flex items-center'>
      <img
        className='h-10 pt-4 w-12  flex items-center'
        alt='delete one node'
        src='/editor/rectangleSmall.svg'
      />
      <button
        type='button'
        onClick={() => {
          callback();
        }}
        className='flex justify-center items-center group h-10'
        onMouseOver={() => {
          setMouseOver(true);
        }}
        onMouseOut={() => {
          setMouseOver(false);
        }}
      >
        <span
          className={`text-lg font-semibold text-darkBlue group-hover:text-red-500 ${tailwindTransitionClass}`}
        >
          {text}
        </span>
        <TrashIconCustomizable size={50} hovered={mouseOver} />
      </button>
    </div>
  );
};

const Operations = () => {
  const { selectedNodeId } = useStore(editorSelectedData);
  const node = getNodeByIdRoadmapSelector(selectedNodeId);
  const [mouseOver, setMouseOver] = useState(false);

  return (
    <div className='flex flex-col gap-5 justify-start items-start'>
      <div className='flex justify-between'>
        <div className='w-52'>
          <DropdownWhiteAddCleaner
            dropdownName='Add child'
            options={[
              {
                name: 'Main',
                callback: () => {
                  appendClassicNodeToRoadmap(node);
                },
                tooltip: 'Basic main node with title and tab and main color',
              },
              {
                name: 'Secondary',
                callback: () => {
                  appendClassicNodeToRoadmap(node);
                },
                tooltip: 'Basic node with title and secondary color and a tab',
              },
              {
                name: 'Link',
                callback: () => {
                  appendClassicNodeToRoadmap(node);
                },
                tooltip:
                  'Node holding a link to another roadmap or website on click',
              },
            ]}
            dropdownCallback={(hasOpened) => {
              //
            }}
          />
        </div>
        <DeleteButton
          callback={() => {
            deleteProtocolNodeFromRoadmap(node);
            closeEditorProtocol();
          }}
          text='Delete Node'
        />
      </div>

      <DeleteButton
        callback={() => {
          deleteProtocolNodeFromRoadmapRecursive(node);
          closeEditorProtocol();
        }}
        text='Delete Node and subtree'
      />
    </div>
  );
};

export default Operations;
