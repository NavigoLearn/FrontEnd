import React, { useState } from 'react';
import roadmapPlaceholder from '@store/roadmap-refactor/data/roadmap-placeholder';
import { useStore } from '@nanostores/react';
import TitleComponent from '@src/typescript/roadmap_ref/node/components/TitleComponent';
import DescriptionComponent from '@src/typescript/roadmap_ref/node/components/DescriptionComponent';
import { deepCopy } from '@src/typescript/roadmap/utils';
import {
  appendComponentDescription,
  appendComponentTitle,
} from '@src/typescript/roadmap_ref/node/core/data-mutation/append';
import { factoryComponentDescription, factoryComponentTitle } from '@src/typescript/roadmap_ref/node/components/text/factories';
import { getComponentTitleById } from '@src/typescript/roadmap_ref/node/core/data-get/components';
import {
  mutateComponentTitleX,
  mutateComponentDescriptionHeight,
  mutateComponentDescriptionWidth,
  mutateComponentTitleHeight,
  mutateComponentDescriptionX,
  mutateComponentDescriptionY,
  mutateComponentTitleY,
  mutateComponentTitleWidth,
} from '@src/typescript/roadmap_ref/node/components/text/mutate';
import DropDownSelect from '../DropDownSelect';

const Title = () => {
  const [title, setTitle] = useState('');
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const { nodes } = useStore(roadmapPlaceholder);
  const node = nodes[0];
  const componentId = appendComponentTitle(node, factoryComponentTitle(title));
  const component = getComponentTitleById(node, componentId);

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
