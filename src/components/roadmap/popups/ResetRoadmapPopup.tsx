import React from 'react';
import { CLOSE_SVG_SRC } from '@src/to-be-organized/svg-params';
import { tailwindTransitionClass } from '@src/UI-library/tailwind-utils';
import { resetRoadmapCreate } from '@store/roadmap-refactor/roadmap-data/roadmap-create';
import { createAndSetRoadmapClassicRefactored } from '@src/typescript/roadmap_ref/roadmap-templates/classic';
import { initialRoadmapProtocolAfterLoad } from '@components/roadmap/Roadmap';
import { clearSession } from '@src/typescript/roadmap_ref/caching/restoreSession';
import { deleteAllRenderedNodes } from '@store/roadmap-refactor/render/rendered-nodes';
import { deleteAllRenderedConnections } from '@store/roadmap-refactor/render/rendered-connections';

type IAuthPopupProps = {
  closeCallback: () => void;
};
const ResetRoadmapPopup = ({ closeCallback }: IAuthPopupProps) => {
  return (
    <div className='relative bg-white w-72 pb-6 border-t-8 border-t-primary rounded-lg'>
      <h2 className='text-lg font-medium font-roboto-text  w-full flex justify-center mt-10 text-center px-2'>
        Are you sure you want to reset the roadmap ?
      </h2>
      <div className='flex justify-center mt-2 w-full'>
        <span className='text-sm font-roboto-text text-placeholder text-center w-3/4 '>
          This operation cannot be undone.
        </span>
      </div>

      <section className='absolute w-6 h-6 top-3.5 right-2'>
        <button
          className='w-full h-full opacity-30 hover:opacity-100'
          type='button'
          onClick={() => {
            closeCallback();
          }}
        >
          <img src={CLOSE_SVG_SRC.src} className='w-full h-full' />
        </button>
      </section>
      <section className='flex justify-center mt-10'>
        <button
          type='button'
          className={`font-medium font-roboto-text bg-white rounded-md text-lg text-darkBlue hover:text-white hover:bg-darkBlue px-3 py-1${tailwindTransitionClass}`}
          onClick={() => {
            closeCallback();
            clearSession();
            deleteAllRenderedNodes();
            deleteAllRenderedConnections();
            resetRoadmapCreate();
            createAndSetRoadmapClassicRefactored(true);
            initialRoadmapProtocolAfterLoad();
          }}
        >
          Reset Roadmap
        </button>
      </section>
    </div>
  );
};

export default ResetRoadmapPopup;
