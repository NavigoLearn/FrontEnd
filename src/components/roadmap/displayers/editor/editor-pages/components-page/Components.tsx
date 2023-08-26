import React from 'react';
import { triggerNodeRerender } from '@store/roadmap-refactor/render/rerender-triggers-nodes';
import { useStore } from '@nanostores/react';
import editorSelectedData, {
  triggerRerenderEditor,
} from '@store/roadmap-refactor/elements-editing/editor-selected-data';
import { IComponentOptions } from '@type/roadmap/node/options-types';
import { factoryComponentEmpty } from '@src/typescript/roadmap_ref/node/components/text/factories';
import TextComponent from '@components/roadmap/displayers/editor/editor-pages/components-page/components/TextComponent';
import DropdownGreyAdd from '@src/components/roadmap/displayers/editor/reusable-components/DropdownWhiteAdd';
import { appendComponent } from '@src/typescript/roadmap_ref/node/core/data-mutation/append';
import { getNodeByIdRoadmapSelector } from '@src/typescript/roadmap_ref/roadmap-data/services/get';
import { IComponentObject } from '@type/roadmap/node/components-types';
import { setDraggableElement } from '@store/roadmap-refactor/elements-editing/draggable-elements';
import { addDragabilityProtocol } from '@src/typescript/roadmap_ref/render/dragging';
import { afterEventLoop } from '@src/typescript/utils/misc';

const Components = () => {
  const { selectedNodeId } = useStore(editorSelectedData);
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
      <DropdownGreyAdd
        text='Add component'
        onSelect={(componentType: IComponentOptions) => {
          const newComponent = factoryComponentEmpty(componentType, node.id);
          appendComponent(node, newComponent); // needs parentNodeId injected
          addDragabilityProtocol(newComponent.draggingBehavior);
          triggerNodeRerender(node.id);
          afterEventLoop(() => {
            // delays until the next render cycle
            setDraggableElement(newComponent.id, true);
          });
          triggerRerenderEditor();
        }}
        optionsList={['Text']}
      />
      <div className='flex flex-col gap-4 h-5/6 mt-10 mb-6 overflow-y-auto border-b-2 border-gray-200 overflow-x-hidden'>
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
