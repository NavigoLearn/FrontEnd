import React from 'react';
import { useStore } from '@nanostores/react';
import editorSelectedData, {
  triggerRerenderEditor,
} from '@store/roadmap-refactor/elements-editing/editor-selected-data';
import { appendComponent } from '@typescript/roadmap_ref/node/core/data-mutation/append';
import { IComponentOptions } from '@type/roadmap/node/options-types';
import TitleComponent from '@components/roadmap/displayers/editor/components/TitleComponent';
import DescriptionComponent from '@components/roadmap/displayers/editor/components/DescriptionComponent';
import { factoryComponentEmpty } from '@typescript/roadmap_ref/node/components/text/factories';
import DropdownComponent from '@components/roadmap/displayers/editor/components/DropdownComponent';

const Components = () => {
  const { node, selectedNodeId } = useStore(editorSelectedData);

  const selectComponentToRender = (
    type: IComponentOptions,
    id: string,
    name: string
  ) => {
    const JSONMapper = {
      Title: <TitleComponent key={id} id={id} name={name} />,
      Description: <DescriptionComponent id={id} name={name} />,
    };
    return JSONMapper[type];
  };

  return (
    <div className='w-full h-full max-h-full flex flex-col'>
      <DropdownComponent
        text='Add component'
        onSelect={(componentType: IComponentOptions) => {
          appendComponent(node, factoryComponentEmpty(componentType));
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
