import React from 'react';
import { triggerNodeRerender } from '@store/roadmap-refactor/render/rerender-triggers-nodes';
import { useStore } from '@nanostores/react';
import storeEditorSelectedData, {
  triggerRerenderEditor,
} from '@store/roadmap-refactor/elements-editing/store-editor-selected-data';
import { type IComponentOptions } from '@type/roadmap/node/options-types';
import { factoryComponentEmpty } from '@src/typescript/roadmap_ref/node/components/text/factories';
import TextComponent from '@components/roadmap/pages-roadmap/editor/editor-pages/components-page/components/TextComponent';
import { appendComponent } from '@src/typescript/roadmap_ref/node/core/data-mutation/append';
import { getNodeByIdRoadmapSelector } from '@src/typescript/roadmap_ref/roadmap-data/services/get';
import { type IComponentObject } from '@type/roadmap/node/components-types';
import { setElementDraggable } from '@store/roadmap-refactor/elements-editing/draggable-elements';
import { addDragabilityProtocol } from '@src/typescript/roadmap_ref/render/dragging';
import { afterEventLoop } from '@src/typescript/utils/misc';
import { deleteAllComponents } from '@src/typescript/roadmap_ref/node/core/data-mutation/delete';
import DropdownPlusSelection from '@src/components/roadmap/pages-roadmap/editor/reusable-components/DropdownPlusSelection';
import DeleteButton from '../operations-page/actions/DeleteButton';

const Components = () => {
  const { selectedNodeId } = useStore(storeEditorSelectedData);
  const node = getNodeByIdRoadmapSelector(selectedNodeId);

  const selectComponentToRender = (
    type: IComponentOptions,
    id: string,
    name: string
  ) => {
    const JSONMapper = {
      Text: <TextComponent node={node} key={id} id={id} name={name} />,
    };
    return JSONMapper[type];
  };

  return (
    <div className='w-full h-full max-h-full flex flex-col'>
      <div className='flex justify-between my-1'>
        <div className='w-48'>
          <DropdownPlusSelection
            dropdownName='Add component'
            options={[
              {
                id: '1',
                name: 'Text',
                callback: (componentType: IComponentOptions) => {
                  const newComponent = factoryComponentEmpty(
                    componentType,
                    node.id
                  );
                  appendComponent(node, newComponent); // needs parentNodeId injected
                  addDragabilityProtocol(newComponent.draggingBehavior);
                  triggerNodeRerender(node.id);
                  afterEventLoop(() => {
                    // delays until the next render cycle
                    setElementDraggable(newComponent.id, true);
                  });
                  triggerRerenderEditor();
                },
              },
            ]}
            dropdownCallback={() => {
              return null;
            }}
          />
        </div>
        <div className='flex justify-center items-center mr-6'>
          <DeleteButton
            callback={() => {
              deleteAllComponents(node);
              triggerNodeRerender(node.id);
            }}
            text='Delete All'
            src=''
          />
        </div>
      </div>
      <hr className='border-1 border-gray-200 mt-5 mb-2' />
      <div className='flex flex-col gap-4 h-5/6 mt-4 mb-6 overflow-y-auto border-b-2 border-gray-200 overflow-x-hidden'>
        {node.components.map((component: IComponentObject) => {
          return selectComponentToRender(
            component.type,
            component.id,
            component.name
          );
        })}
      </div>
    </div>
  );
};

export default Components;
