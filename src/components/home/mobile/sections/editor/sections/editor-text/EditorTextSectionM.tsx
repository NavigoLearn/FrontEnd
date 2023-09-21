import React from 'react';
import { motion } from 'framer-motion';
import homeedit from '@assets/homeedit.svg';

const EditorTextSectionM = () => {
  return (
    <motion.div className='flex flex-col justify-center items-center'>
      <div className='flex flex-row items-center justify-center gap-4'>
        <div className='w-8 h-8 rounded-full border border-placeholderBlack items-center justify-center flex'>
          <div className='w-7 h-7 rounded-full border border-placeholderBlack items-center justify-center flex'>
            <img
              src={homeedit.src}
              alt='edit icon build roadmaps'
              className='w-4 h-4 2xl:w-7 2xl:h-7'
            />
          </div>
        </div>
        <h1 className='text-lg font-roboto-text font-semibold text-primary text-center justify-center'>
          Build anything
        </h1>
      </div>
      <h2 className='text-darkBlue text-2xl font-roboto-text font-bold text-center w-full mt-5 px-2'>
        A fully featured EDITOR for creating roadmaps
      </h2>
      <p className='text-placeholder font-roboto-text text-sm text-center mt-8 px-1'>
        We wanted to allow as much space for creativity and usefulness as
        possible for the creation of the roadmaps. For that reason we created a
        fully-featured editor allowing granular control and customization for
        the nodes and roadmaps
      </p>
    </motion.div>
  );
};

export default EditorTextSectionM;
