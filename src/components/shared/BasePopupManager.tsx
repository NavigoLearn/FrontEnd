import React from 'react';
import { useStore } from '@nanostores/react';
import {
  IBasePopup,
  storeBasePopups,
} from '@components/shared/stores/store-base-popups';
import { AnimatePresence, motion } from 'framer-motion';
import AuthPopup from '@components/auth/AuthPopup';

const popupMapperJSON: Record<IBasePopup, React.ReactNode> = {
  'get-started': <AuthPopup />,
  none: null,
};

const SelectedPopup = ({ page }: { page: IBasePopup }) => {
  return (
    <motion.div
      key={page}
      initial={{ opacity: 0, x: '5%', y: 0 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{
        duration: 0.25,
        ease: [0.43, 0.13, 0.23, 0.96], // Custom easing curve
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
    <div className='h-[100%] w-[100%] bg-[#1A1B504D] absolute top-0 z-30 flex justify-center items-center'>
      <AnimatePresence>
        <SelectedPopup page={basePopup} />
      </AnimatePresence>
    </div>
  );
};

export default BasePopupManager;
