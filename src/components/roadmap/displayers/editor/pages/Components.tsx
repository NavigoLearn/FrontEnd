import React from 'react';
import { triggerNodeRerender } from '@store/roadmap-refactor/render/rerender-triggers';
import { useStore } from '@nanostores/react';
import editorSelectedData, {
  triggerRerenderEditor,
} from '@store/roadmap-refactor/elements-editing/editor-selected-data';
import { IComponentOptions } from '@type/roadmap/node/options-types';
import TitleComponent from '@components/roadmap/displayers/editor/components/TitleComponent';
import DescriptionComponent from '@components/roadmap/displayers/editor/components/DescriptionComponent';
import DropdownComponent from '@components/roadmap/displayers/editor/components/DropdownComponent';
import { appendComponent } from '@src/typescript/roadmap_ref/node/core/data-mutation/append';
import { factoryComponentEmpty } from '@src/typescript/roadmap_ref/node/components/text/factories';
import { getNodeByIdRoadmapSelector } from '@store/roadmap-refactor/roadmap-data/roadmap-selector';
import { IComponentObject } from '@type/roadmap/node/components-types';
import { setElementDraggable } from '@store/roadmap-refactor/elements-editing/draggable-elements';
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
      Title: <TitleComponent node={node} key={id} id={id} name={name} />,
      Description: (
        <DescriptionComponent key={id} node={node} id={id} name={name} />
      ),
    };
    return JSONMapper[type];
  };

  return (
    <div className='w-full h-full max-h-full flex flex-col'>
      <DropdownComponent
        text='Add component'
        onSelect={(componentType: IComponentOptions) => {
          const newComponent = factoryComponentEmpty(componentType, node.id);
          appendComponent(node, newComponent); // needs parentNodeId injected
          addDragabilityProtocol(newComponent.draggingBehavior);
          triggerNodeRerender(node.id);
          afterEventLoop(() => {
            // delays until the next render cycle
            setElementDraggable(newComponent.id, true);
          });
          triggerRerenderEditor();
        }}
        optionsList={['Title', 'Description']}
      />
      <div className='flex flex-col gap-4 h-5/6 mt-10 mb-6 overflow-y-auto border-b-2 border-gray-200'>
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
