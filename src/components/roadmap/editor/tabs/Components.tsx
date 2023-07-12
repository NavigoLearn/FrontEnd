import React, { useState } from 'react';
import roadmapPlaceholder from '@store/roadmap-refactor/data/roadmap-placeholder';
import { useStore } from '@nanostores/react';
import TitleComponent from '@src/typescript/roadmap_ref/node/components/TitleComponent';
import DescriptionComponent from '@src/typescript/roadmap_ref/node/components/DescriptionComponent';
import { deepCopy } from '@src/typescript/roadmap/utils';
import DropDownSelect from '../DropDownSelect';

const titleForDropdown = () => {
  const [title, setTitle] = useState('');

  return (
    <div>
      <input
        type='text'
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className='w-full h-10 border border-black'
      />
    </div>
  );
};

const descriptionForDropdown = () => {
  const [description, setDescription] = useState('');

  return (
    <div>
      <textarea
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        className='w-full h-96 border border-black'
      />
    </div>
  );
};

const Components = () => {
  return (
    <DropDownSelect components={[titleForDropdown, descriptionForDropdown]} />
  );
};

export default Components;
