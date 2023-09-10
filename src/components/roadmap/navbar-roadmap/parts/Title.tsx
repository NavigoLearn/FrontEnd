import React from 'react';
import { useStore } from '@nanostores/react';
import storeRoadmapAbout from '@store/roadmap-refactor/roadmap-data/misc-data/roadmap-about';

const Title = () => {
  const { name } = useStore(storeRoadmapAbout);
  return <div className='text-lg font-semibold text-darkBlue '>{name}</div>;
};

export default Title;
