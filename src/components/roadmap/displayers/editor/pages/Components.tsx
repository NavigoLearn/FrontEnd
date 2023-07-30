import React from 'react';
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
      Description: <DescriptionComponent node={node} id={id} name={name} />,
    };
    return JSONMapper[type];
  };

  return (
    <div className='w-full h-full max-h-full flex flex-col'>
      <DropdownComponent
        text='Add component'
        onSelect={(componentType: IComponentOptions) => {
          appendComponent(node, factoryComponentEmpty(componentType, node.id)); // needs parentNodeId injected
          triggerRerenderEditor();
        }}
        optionsList={['Title', 'Description']}
      />
      <div className='flex flex-col gap-4 h-5/6 mt-10 mb-6 overflow-y-auto border-b-2 border-gray-200'>
        {node.components.map((component) => {
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
