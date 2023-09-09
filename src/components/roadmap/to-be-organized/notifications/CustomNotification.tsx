/* eslint-disable no-nested-ternary */
import React, { useEffect } from 'react';
import crosssvg from '@assets/cross.svg';
import close from '@assets/close.svg';
import { motion } from 'framer-motion';
import { TipSvg, PopupSvg, CrossSvg } from './NotifUI/NotifIcons';

const CustmoNotification = ({
  type,
  text,
  onClose,
}: {
  type: string;
  text: string;
  onClose: () => void;
}) => {
  console.log('type', type);
  return (
    <motion.li
      initial={{ opacity: 0, y: 50, scale: 0.3 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
      className={`w-auto min-w-[420px] h-auto ${
        type === 'tip'
          ? 'bg-white'
          : type === 'error'
          ? 'bg-[#9C2C2C] bg-opacity-5 border-2 border-[#9C2C2C]'
          : 'bg-[#51BD95] bg-opacity-5 border-2 border-[#51BD95]'
      } rounded-md relative drop-shadow-lg justify-between flex items-center px-2 py-1 m-4`}
    >
      {type === 'tip' ? (
        <TipSvg />
      ) : type === 'popup' ? (
        <PopupSvg />
      ) : (
        <img alt='close' className='h-6' src={close} />
      )}

      <p
        className={`font-roboto-text text-lg font-medium mx-2 ${
          type === 'tip'
            ? 'text-darkBlue'
            : type === 'error'
            ? 'text-[#9C2C2C]'
            : 'text-[#51BD95]'
        }`}
      >
        {text}
      </p>
      <button type='button' onClick={onClose}>
        {type === 'tip' ? (
          <CrossSvg fillColor='#1A1B50' />
        ) : type === 'popup' ? (
          <CrossSvg fillColor='#51BD95' />
        ) : (
          <CrossSvg fillColor='#9C2C2C' />
        )}
      </button>
    </motion.li>
  );
};

export default CustmoNotification;
