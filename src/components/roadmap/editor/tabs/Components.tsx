import React, { useState } from 'react';
import roadmapPlaceholder from '@store/roadmap-refactor/data/roadmap-placeholder';
import { useStore } from '@nanostores/react';
import { deepCopy } from '@src/typescript/roadmap/utils';

const Components = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { nodes } = useStore(roadmapPlaceholder);

  // const Title: TitleComponent = new TitleComponent(10, 20, 100, 50, title);
  // const Description: DescriptionComponent = new DescriptionComponent(
  //   10,
  //   20,
  //   100,
  //   50,
  //   description
  // );

  // const onSave = () => {
  //   injectNewTitle(nodes[0], 'title', Title);
  //   injectNewDescription(nodes[0], 'description', Description);
  // };
  console.log(deepCopy(roadmapPlaceholder.get().nodes));

  return (
    <div>
      <h1>Title:</h1>
      <input
        type='text'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        id='title'
        className='border border-black'
      />
      <h1>Description:</h1>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className='w-full h-96 border border-black'
        id='description'
      />
      <button type='button'>Save</button>
    </div>
  );
};

export default Components;
