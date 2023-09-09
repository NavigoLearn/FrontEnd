import React from 'react';
import { setDisplayPageTypeFullScreen } from '@store/roadmap-refactor/display/display-manager-full-screen';
import { CLOSE_SVG_SRC } from '@src/to-be-organized/svg-params';
import { tailwindTransitionClass } from '@src/UI-library/tailwind-utils';
import { resetRoadmapCreate } from '@store/roadmap-refactor/roadmap-data/roadmap-create';
import { createAndSetRoadmapClassic } from '@src/typescript/roadmap_ref/roadmap-templates/classic';
import { initialRoadmapProtocolAfterLoad } from '@components/roadmap/Roadmap';

type IButtonColor = 'green' | 'red' | 'darkblue';
type IAuthPopupProps = {
  actionCallback: () => void;
  buttonType: IButtonColor;
  name: string;
  heroText: string;
  smallText: string;
};
const GeneralPopup = ({
  actionCallback,
  buttonType,
  name,
  heroText,
  smallText,
}: IAuthPopupProps) => {
  const matchButtonColor = (buttonColorMatcher: IButtonColor) => {
    switch (buttonColorMatcher) {
      case 'green':
        return 'text-green-500 bg-white hover:bg-green-500 hover:text-white';
      case 'red':
        return 'text-red-500 bg-white hover:bg-red-500 hover:text-white';
      case 'darkblue':
        return 'text-darkBlue bg-white hover:bg-darkBlue hover:text-white';
      default:
        throw new Error(`Unknown button type: ${buttonColorMatcher}`);
    }
  };
  const buttonStyle = matchButtonColor(buttonType);

  return (
    <div className='relative bg-white w-72 pb-6 border-t-8 border-t-primary rounded-lg'>
      <h2 className='text-lg font-medium font-roboto-text  w-full flex justify-center mt-10 text-center px-2'>
        {heroText}
      </h2>
      <div className='flex justify-center mt-2 w-full'>
        <span className='text-sm font-roboto-text text-placeholder text-center w-3/4 '>
          {smallText}
        </span>
      </div>

      <section className='absolute w-6 h-6 top-3.5 right-2'>
        <button
          className='w-full h-full opacity-30 hover:opacity-100'
          type='button'
          onClick={() => {
            setDisplayPageTypeFullScreen('closed');
          }}
        >
          <img src={CLOSE_SVG_SRC} className='w-full h-full' />
        </button>
      </section>
      <section className='flex justify-center mt-10'>
        <button
          type='button'
          className={`font-medium font-roboto-text  rounded-md  px-3 py-1 ${buttonStyle} ${tailwindTransitionClass}`}
          onClick={() => {
            setDisplayPageTypeFullScreen('closed');
            actionCallback();
          }}
        >
          {name}
        </button>
      </section>
    </div>
  );
};

export default GeneralPopup;
