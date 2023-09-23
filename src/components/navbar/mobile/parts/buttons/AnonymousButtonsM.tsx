import react from 'react';
import { setBasePopup } from '@src/components/shared/stores/store-base-popups';
import { ButtonM, LinkM } from './ButtonsM';

const AnonymusButtonsM = () => {
  const handleAuthClick = () => {
    setBasePopup('get-started');
  };
  return (
    <div className='mt-12'>
      <div className='flex flex-col gap-4'>
        <ButtonM text='Get Started' onClick={handleAuthClick} />
        <LinkM text='Explore' href='/roadmap/explore' imgsrc='explore' />
        <LinkM text='Home' href='/' imgsrc='home' />
      </div>
    </div>
  );
};

export default AnonymusButtonsM;
