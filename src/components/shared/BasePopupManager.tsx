import React from 'react';
import { useStore } from '@nanostores/react';
import {
  type IBasePopup,
  setBasePopup,
  storeBasePopups,
} from '@components/shared/stores/store-base-popups';
import { AnimatePresence, motion } from 'framer-motion';
import AuthPopup from '@components/auth/AuthPopup';

const popupMapperJSON: Record<IBasePopup, React.ReactNode> = {
  'get-started': (
    <AuthPopup
      additionalData="Login with GitHub or Google. Don't worry if you don't have an accout. We will create one for you"
      closeCallback={() => {
        setBasePopup('none');
      }}
    />
  ),
  none: null,
};

const SelectedPopup = ({ page }: { page: IBasePopup }) => {
  return (
    <motion.div
      key={page}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.2,
      }}
      className=' relative w-full h-full'
    >
      {popupMapperJSON[page]}
    </motion.div>
  );
};

const BasePopupManager = () => {
  const { basePopup } = useStore(storeBasePopups);
  if (basePopup === 'none') return null;

  return (
    <div className='h-screen w-screen bg-coverColor absolute left-0 top-0 z-30 flex justify-center items-center'>
      <div className='flex justify-center items-center'>
        <AnimatePresence>
          <SelectedPopup page={basePopup} />
        </AnimatePresence>
      </div>
    </div>
  );
};

export default BasePopupManager;
