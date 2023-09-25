import {
  moveRoadmapToNode,
  closeEditorProtocol,
} from '@src/to-be-organized/node-rendering-stuff/actions-manager';
import React from 'react';
import {
  addChildTemplateToRoadmap,
  addParentTemplateToRoadmap,
  applyTemplateToNode,
} from '@src/typescript/roadmap_ref/roadmap-data/protocols/append';
import { useStore } from '@nanostores/react';
import storeEditorSelectedData from '@store/roadmap-refactor/elements-editing/store-editor-selected-data';
import {
  getNodeByIdRoadmapSelector,
  getRoadmapTemplatesArray,
  getRootGlobalId,
} from '@src/typescript/roadmap_ref/roadmap-data/services/get';
import DeleteButton from '@components/roadmap/pages-roadmap/editor/editor-pages/operations-page/actions/DeleteButton';
import {
  deleteProtocolNodeFromRoadmap,
  deleteProtocolNodeFromRoadmapRecursive,
} from '@src/typescript/roadmap_ref/roadmap-data/protocols/delete';
import DropdownWhiteSelect from '@components/roadmap/pages-roadmap/editor/reusable-components/DropdownWhiteSelect';
import {
  operationsStore,
  setOperationsDropdown,
} from '@components/roadmap/pages-roadmap/editor/editor-pages/operations-page/stores/operations-store';
import { TemplateNode } from '@src/typescript/roadmap_ref/node/templates-system/template-core';
import { highlightNodeEffects } from '@store/roadmap-refactor/elements-editing/store-node-effects';
import { setNotification } from '@src/components/roadmap/to-be-organized/notifications/notifciations-refr/notification-store-refr';
import nodeTree from '@assets/editor/tree.svg';
import DropdownPlusSelection from '../../../reusable-components/DropdownPlusSelection';

type IOption = {
  id: string;
  name: string;
  callback: () => void;
  tooltip?: string;
};

function formatTemplatesAddChild(
  originalTemplates: TemplateNode[],
  parentId: string
) {
  const templatesArray: IOption[] = [];

  originalTemplates.forEach((template) => {
    const templateObject: IOption = {
      id: template.id,
      name: template.name,
      callback: () => {
        const id = addChildTemplateToRoadmap(parentId, template.id);
        highlightNodeEffects(id);
        moveRoadmapToNode(id, true);
      },
      tooltip: `This template has ${
        Object.keys(template.roadmapImage.nodes).length
      } node(s)`,
    };
    templatesArray.push(templateObject);
  });

  return templatesArray;
}

function formatTemplatesAddParent(
  originalTemplates: TemplateNode[],
  parentId: string
) {
  const templatesArray: IOption[] = [];

  originalTemplates.forEach((template) => {
    const templateObject: IOption = {
      id: template.id,
      name: template.name,
      callback: () => {
        const id = addParentTemplateToRoadmap(parentId, template.id);
        highlightNodeEffects(id);
        moveRoadmapToNode(id, true);
      },
      tooltip: `This template has ${
        Object.keys(template.roadmapImage.nodes).length
      } node(s)`,
    };
    templatesArray.push(templateObject);
  });

  return templatesArray;
}

function formatTemplatesApply(
  originalTemplates: TemplateNode[],
  targetNodeId: string
) {
  const templatesArray: IOption[] = [];

  originalTemplates.forEach((template) => {
    const templateObject: IOption = {
      id: template.id,
      name: template.name,
      callback: () => {
        applyTemplateToNode(targetNodeId, template.id);
      },

      tooltip: `This template has ${
        Object.keys(template.roadmapImage.nodes).length
      } node(s)`,
    };
    templatesArray.push(templateObject);
  });

  return templatesArray;
}

const ActionsSystem = () => {
  const { selectedNodeId } = useStore(storeEditorSelectedData);
  const node = getNodeByIdRoadmapSelector(selectedNodeId);
  const { dropdown } = useStore(operationsStore);
  const isRoot = getRootGlobalId() === node.id;

  const rawTemplates = getRoadmapTemplatesArray();

  const templatesJSONAddChild = formatTemplatesAddChild(rawTemplates, node.id);
  const templatesJSONAddParent = formatTemplatesAddParent(
    rawTemplates,
    node.id
  );
  const templatesJSONApplyTemplate = formatTemplatesApply(
    rawTemplates,
    node.id
  );

  return (
    <>
      <div className='flex gap-6 w-full relative pb-4 '>
        <div
          className={`w-48 relative  ${
            dropdown === 'add-child' ? 'z-30' : 'z-20'
          }`}
        >
          {/* <DropdownWhiteAddCleaner
            dropdownName='Add child'
            options={[...templatesJSONAddChild]}
            dropdownCallback={(hasOpened) => {
              if (hasOpened) {
                setOperationsDropdown('add-child');
              } else {
                setOperationsDropdown('none');
              }
            }}
          /> */}
          <DropdownPlusSelection
            dropdownName='Add child'
            options={[...templatesJSONAddChild]}
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
            if (isRoot) {
              setNotification('error', 'You cannot delete the root node');
              return;
            }
            deleteProtocolNodeFromRoadmap(node);
            closeEditorProtocol();
          }}
          text='Delete Node'
          space
        />
      </div>

      <hr className='absolute w-full bottom-0' />

      <div className='flex gap-6 w-full relative pb-4 '>
        <div
          className={`w-48 relative  ${
            dropdown === 'add-parent' ? 'z-20' : 'z-10'
          }`}
        >
          <DropdownPlusSelection
            dropdownName='Add parent'
            options={[...templatesJSONAddParent]}
            dropdownCallback={(hasOpened) => {
              if (hasOpened) {
                setOperationsDropdown('add-parent');
              } else {
                setOperationsDropdown('none');
              }
            }}
          />
        </div>
      </div>

      <hr className='absolute w-full bottom-0' />

      <div className='flex gap-6 w-full'>
        <div
          className={`w-48 relative ${
            dropdown === 'apply-template' ? 'z-40' : 'z-0'
          }`}
        >
          <DropdownWhiteSelect
            dropdownName='Apply template'
            options={[...templatesJSONApplyTemplate]}
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
          src={nodeTree.src}
        />
      </div>
      <div className='w-full relative'>
        <hr className='absolute w-full bottom-0' />
      </div>
    </>
  );
};

export default ActionsSystem;
