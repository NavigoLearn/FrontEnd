import React, { useState } from 'react';
import {
  mutateComponentTitleText,
  mutateComponentTitleX,
  mutateComponentTitleY,
} from '@typescript/roadmap_ref/node/components/text/mutate';
import { useStore } from '@nanostores/react';
import editorSelectedData, {
  triggerRerenderEditor,
} from '@store/roadmap-refactor/elements-editing/editor-selected-data';
import { getComponentTitleById } from '@typescript/roadmap_ref/node/core/data-get/components';
import { deleteComponentWithId } from '@typescript/roadmap_ref/node/core/data-mutation/delete';
import PropertyEditorText from '@components/roadmap/displayers/editor/components/PropertyEditorText';
import PropertyEditorNumber from '@components/roadmap/displayers/editor/components/PropertyEditorNumber';

type TitleComponentProps = {
  id: string;
  name: string;
};
const TitleComponent = ({ id, name }: TitleComponentProps) => {
  const [dropdown, setDropdown] = useState(false);
  const { node } = useStore(editorSelectedData); // since title component is used means editor
  // is opened and node is selected
  const titleComponent = getComponentTitleById(node, id);
  return (
    <>
      <div className='flex gap-2'>
        <div className='text-sm text-black'>Title:</div>
        <h2 className='text-lg font-semibold text-black'>{name}</h2>
        <button
          type='button'
          onClick={() => {
            deleteComponentWithId(node, id);
            triggerRerenderEditor();
          }}
          className='w-20 h-10 bg-red-500'
        >
          Del
        </button>
        <button
          type='button'
          className='bg-green-500 px-2 py-2 '
          onClick={() => {
            setDropdown((prev) => !prev);
          }}
        >
          dropdown
        </button>
        <button
          type='button'
          className='bg-green-500 px-2 py-2 '
          onClick={() => {
            console.log('title variants');
          }}
        >
          variants
        </button>
      </div>
      {dropdown && (
        <div className='flex flex-col gap-4'>
          <PropertyEditorText
            name='title'
            value={`${titleComponent.text}`}
            onChange={(value) => {
              mutateComponentTitleText(titleComponent, value);
              triggerRerenderEditor();
            }}
          />
          <PropertyEditorNumber
            name='x'
            value={titleComponent.x}
            onChange={(value) => {
              const newValue = parseInt(value, 10);
              mutateComponentTitleX(titleComponent, newValue);
              triggerRerenderEditor();
            }}
          />
          <PropertyEditorNumber
            name='y'
            value={titleComponent.y}
            onChange={(value) => {
              const newValue = parseInt(value, 10);
              mutateComponentTitleY(titleComponent, newValue);
              triggerRerenderEditor();
            }}
          />
        </div>
      )}
    </>
  );
};

export default TitleComponent;
