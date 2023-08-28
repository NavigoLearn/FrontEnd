import React, { useState } from 'react';
import DropdownWhiteAddCleaner from '@components/roadmap/displayers/editor/reusable-components/DropdownWhiteAddCleaner';
import { appendClassicNodeToRoadmap } from '@src/typescript/roadmap_ref/roadmap-data/protocols/append';
import { useStore } from '@nanostores/react';
import editorSelectedData from '@store/roadmap-refactor/elements-editing/editor-selected-data';
import { getNodeByIdRoadmapSelector } from '@src/typescript/roadmap_ref/roadmap-data/services/get';
import DeleteButton from '@components/roadmap/displayers/editor/editor-pages/operations-page/actions/DeleteButton';
import {
  deleteProtocolNodeFromRoadmap,
  deleteProtocolNodeFromRoadmapRecursive,
} from '@src/typescript/roadmap_ref/roadmap-data/protocols/delete';
import DropdownWhiteSelect from '@components/roadmap/displayers/editor/reusable-components/DropdownWhiteSelect';
import { closeEditorProtocol } from '@src/to-be-organized/nodeview/actions-manager';
import {
  operationsStore,
  setOperationsDropdown,
} from '@components/roadmap/displayers/editor/editor-pages/operations-page/stores/operations-store';

const ActionsSystem = () => {
  const { selectedNodeId } = useStore(editorSelectedData);
  const node = getNodeByIdRoadmapSelector(selectedNodeId);
  const { dropdown } = useStore(operationsStore);

  return (
    <>
      <div className='flex gap-6 w-full relative pb-4 '>
        <div
          className={`w-48 relative  ${
            dropdown === 'add-child' ? 'z-20' : 'z-10'
          }`}
        >
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
              if (hasOpened) {
                setOperationsDropdown('add-child');
              } else {
                setOperationsDropdown('none');
              }
            }}
          />
        </div>
        <DeleteButton
          callback={() => {
            deleteProtocolNodeFromRoadmap(node);
            closeEditorProtocol();
          }}
          text='Delete Node'
          space
        />
        <hr className='absolute w-[calc(100%+80px)] -left-10 bottom-0' />
      </div>

      <div className='flex gap-6 w-full'>
        <div
          className={`w-48 relative ${
            dropdown === 'apply-template' ? 'z-20' : 'z-0'
          }`}
        >
          <DropdownWhiteSelect
            dropdownName='Apply template'
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
              if (hasOpened) {
                setOperationsDropdown('apply-template');
              } else {
                setOperationsDropdown('none');
              }
            }}
          />
        </div>
        <DeleteButton
          callback={() => {
            deleteProtocolNodeFromRoadmapRecursive(node);
            closeEditorProtocol();
          }}
          text='Delete Subtree'
          src='/editor/tree.svg'
        />
      </div>
      <div className='w-full relative'>
        <hr className='absolute w-[calc(100%+80px)] -left-10 bottom-0' />
      </div>
    </>
  );
};

export default ActionsSystem;
