import React from 'react';
import HeroM from '@components/home/mobile/sections/hero/HeroM';
import WhyRoadmapsSectionM from '@components/home/mobile/sections/why-roadmaps/WhyRoadmapsM';
import EditorSection from '@components/home/desktop/sections/EditorSection';
import EditorSectionM from '@components/home/mobile/sections/editor/EditorSectionM';
import ScrollableEndM from '@components/home/mobile/sections/scrollable-end/ScrollableEndM';

const HomeMobile = () => {
  return (
    <div className=' relative '>
      <HeroM />
      <WhyRoadmapsSectionM />
      <EditorSectionM />
      <ScrollableEndM />
    </div>
  );
};

export default HomeMobile;
