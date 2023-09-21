import React from 'react';
import HeroM from '@components/home/mobile/sections/hero/HeroM';
import WhyRoadmapsSectionM from '@components/home/mobile/sections/why-roadmaps/WhyRoadmapsM';

const HomeMobile = () => {
  return (
    <div className=' relative '>
      <HeroM />
      <WhyRoadmapsSectionM />
    </div>
  );
};

export default HomeMobile;
