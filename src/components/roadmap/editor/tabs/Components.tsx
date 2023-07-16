import React, { useState } from 'react';
import roadmapPlaceholder from '@store/roadmap-refactor/data/roadmap-placeholder';
import { useStore } from '@nanostores/react';
import DropDownSelect from '../DropDownSelect';

const Title = () => {
  const [title, setTitle] = useState('');
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const { nodes } = useStore(roadmapPlaceholder);
  const node = nodes[0];
  // Here implement the logic and where would you like the boxes to be placed for the states defined above
  // (e) => setHeight(e.target.value) , mutateComponentTitleHeight(component, height)

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

const Description = () => {
  const [description, setDescription] = useState('');
  // const [x, setX] = useState(0);
  // const [y, setY] = useState(0);
  // const [width, setWidth] = useState(0);
  // const [height, setHeight] = useState(0);

  // const { nodes } = useStore(roadmapPlaceholder);
  // const node = nodes[0];
  // appendComponentTitle(node, factoryComponentDescription(description));
  // const componentId = 0;
  // const component = getComponentTitleById(node, componentId);

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
  return <DropDownSelect components={[Title, Description]} />;
};

export default Components;
