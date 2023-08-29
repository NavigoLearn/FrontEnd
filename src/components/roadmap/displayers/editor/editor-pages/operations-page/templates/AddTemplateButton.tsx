import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const AddTemplateButton = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <section className='flex relative'>
      <button
        onClick={() => {
          //
        }}
        onMouseOver={() => {
          setHovered(true);
        }}
        onMouseOut={() => {
          setHovered(false);
        }}
        type='button'
        className='flex items-center gap-2'
      >
        <div className='text-darkBlue font-medium text-md font-roboto-text'>
          Add as template
        </div>
        <img
          className='w-7 h-7'
          alt='add button for template'
          src='/editor/addCircle.svg'
        />
      </button>
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, x: '25%' }}
            animate={{ opacity: 1, x: 5 }}
            exit={{ opacity: 0, x: '25%' }}
            className='absolute text-darkBlue font-roboto-text text-xs left-[calc(100%+10px)] w-40 text-opacity-30 '
          >
            Adds the currently selected node as a template
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default AddTemplateButton;
