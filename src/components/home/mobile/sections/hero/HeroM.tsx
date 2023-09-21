import React from 'react';
import HeroNodeAnimationM from '@components/home/mobile/sections/hero/components/HeroNodeAnimationM';
import HeroTextM from '@components/home/mobile/sections/hero/components/HeroTextM';

const HeroM = () => {
  return (
    <div>
      <div className='mt-12'>
        <HeroTextM />
      </div>
      <div className='relative -translate-y-8 z-[-1] h-64 w-full'>
        <HeroNodeAnimationM />
      </div>
    </div>
  );
};

export default HeroM;
