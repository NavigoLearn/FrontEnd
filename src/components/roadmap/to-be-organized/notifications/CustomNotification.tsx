import React, { type FC } from 'react';
import { motion } from 'framer-motion';
import { Info, ConfirmSvg, CrossSvg, ErrorSvg } from './NotifUI/NotifIcons';

interface CustomNotificationProps {
  type: 'info' | 'confirm' | 'error';
  text: string;
  onClose: () => void;
}

const CustomNotification: FC<CustomNotificationProps> = ({
  type,
  text,
  onClose,
}) => {
  let bgColor: string;
  let borderValue: string;
  let SvgIcon: JSX.Element;
  let textColor: string;
  let crossColor: string;

  switch (type) {
    case 'info':
      bgColor = 'bg-white';
      SvgIcon = <Info className='fill-primary' />;
      textColor = 'text-darkBlue';
      crossColor = 'fill-darkBlue';
      break;

    case 'error':
      bgColor = 'bg-red-100';
      borderValue = 'border-2 border-bg-red-300';
      SvgIcon = <ErrorSvg className='fill-red-500' />;
      textColor = 'text-red-900';
      crossColor = 'fill-red-900';
      break;

    case 'confirm':
    default:
      bgColor = 'bg-green-100';
      borderValue = 'border-2 border-bg-red-300';
      SvgIcon = <ConfirmSvg className='fill-green-500 stroke-green-500' />;
      textColor = 'text-green-900';
      crossColor = 'fill-green-900';
      break;
  }

  return (
    <motion.li
      initial={{ opacity: 0, y: 50, scale: 0.3 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
      className={`w-full min-w-[420px] h-auto ${bgColor} ${borderValue} rounded-md relative drop-shadow-lg justify-between flex items-center px-2 py-1 m-4`}
    >
      <div className='flex-shrink-0'>{SvgIcon}</div>

      <p className={`font-roboto-text text-lg font-medium mx-2 ${textColor}`}>
        {text}
      </p>

      <div className='flex-shrink-0'>
        <button type='button' onClick={onClose}>
          <CrossSvg className={crossColor} />
        </button>
      </div>
    </motion.li>
  );
};

export default CustomNotification;
