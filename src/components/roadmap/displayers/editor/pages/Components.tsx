import React from 'react';
import { useStore } from '@nanostores/react';
import editorSelectedData, {
  triggerRerenderEditor,
} from '@store/roadmap-refactor/elements-editing/editor-selected-data';
import { appendComponentJSON } from '@typescript/roadmap_ref/node/core/data-mutation/append';
import { factoryComponentJSONEmpty } from '@typescript/roadmap_ref/node/components/text/factories';
import { IComponentOptions } from '@type/roadmap/node/components-types';
import TitleComponent from '@components/roadmap/displayers/editor/components/TitleComponent';
import DescriptionComponent from '@components/roadmap/displayers/editor/components/DescriptionComponent';
import DropdownSelect from '../components/DropdownSelect';

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
    <div className='w-full h-full px-6'>
      <DropdownSelect
        text='Add a new component'
        onSelect={(element: IComponentOptions) => {
          appendComponentJSON(node, factoryComponentJSONEmpty(element));
          triggerRerenderEditor();
        }}
        optionsList={['Title', 'Description']}
      />
      <div className='flex flex-col gap-4 mt-5'>
        {node.componentsJSON.map((component) => {
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
