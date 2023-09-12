import React from 'react';
import DropdownWhiteAddCleaner from '@components/roadmap/pages-roadmap/editor/reusable-components/DropdownWhiteAddCleaner';
import {
  addChildTemplateToRoadmap,
  applyTemplateToNode,
} from '@src/typescript/roadmap_ref/roadmap-data/protocols/append';
import { useStore } from '@nanostores/react';
import editorSelectedData from '@store/roadmap-refactor/elements-editing/editor-selected-data';
import {
  getNodeByIdRoadmapSelector,
  getRoadmapTemplatesArray,
} from '@src/typescript/roadmap_ref/roadmap-data/services/get';
import DeleteButton from '@components/roadmap/pages-roadmap/editor/editor-pages/operations-page/actions/DeleteButton';
import {
  deleteProtocolNodeFromRoadmap,
  deleteProtocolNodeFromRoadmapRecursive,
} from '@src/typescript/roadmap_ref/roadmap-data/protocols/delete';
import DropdownWhiteSelect from '@components/roadmap/pages-roadmap/editor/reusable-components/DropdownWhiteSelect';
import { closeEditorProtocol } from '@src/to-be-organized/nodeview/actions-manager';
import {
  operationsStore,
  setOperationsDropdown,
} from '@components/roadmap/pages-roadmap/editor/editor-pages/operations-page/stores/operations-store';
import { TemplateNode } from '@src/typescript/roadmap_ref/node/templates-system/template-core';
import {
  getDeleteRootNodeNotification,
  setDeleteRootNodeNotificationFalse,
  setDeleteRootNodeNotificationTrue,
} from '@src/to-be-organized/nodeview/notification-store';
import { handleDeleteRootNotification } from '@src/to-be-organized/nodeview/notification-handler';
import { useNotification } from '@src/components/roadmap/to-be-organized/notifications/NotificationLogic';
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
        addChildTemplateToRoadmap(parentId, template.id);
      },
      tooltip: `This template has ${
        Object.keys(template.roadmapImage.nodes).length
      } nodes`,
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
      } nodes`,
    };
    templatesArray.push(templateObject);
  });

  return templatesArray;
}

const ActionsSystem = () => {
  const { selectedNodeId } = useStore(editorSelectedData);
  const node = getNodeByIdRoadmapSelector(selectedNodeId);
  const { dropdown } = useStore(operationsStore);
  const { addNotification } = useNotification();
  const isRoot = getDeleteRootNodeNotification();

  const rawTemplates = getRoadmapTemplatesArray();
  const templatesJSONAddChild = formatTemplatesAddChild(rawTemplates, node.id);
  const templatesJSONApplyTemplate = formatTemplatesApply(
    rawTemplates,
    node.id
  );

  return (
    <>
      <div className='flex gap-6 w-full relative pb-4 '>
        <div
          className={`w-48 relative  ${
            dropdown === 'add-child' ? 'z-20' : 'z-10'
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
        <div className={isRoot ? 'pointer-events-none opacity-50' : ''}>
          <DeleteButton
            callback={() => {
              deleteProtocolNodeFromRoadmap(node);
              closeEditorProtocol();
            }}
            text='Delete Node'
            space
          />
        </div>

        <hr className='absolute w-full bottom-0' />
      </div>

      <div className='flex gap-6 w-full'>
        <div
          className={`w-48 relative ${
            dropdown === 'apply-template' ? 'z-20' : 'z-0'
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
          src='/editor/tree.svg'
        />
      </div>
      <div className='w-full relative'>
        <hr className='absolute w-full bottom-0' />
      </div>
    </>
  );
};

export default ActionsSystem;
