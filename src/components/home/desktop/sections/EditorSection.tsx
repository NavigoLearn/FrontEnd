import React, { useEffect, useRef, useState } from 'react';
import homeEdit from '@assets/homeedit.svg';
import { motion } from 'framer-motion';
import { type BottomSectionStateProps } from '@components/home/desktop/components/BottomSectionState';
import EditorSectionD from '@components/home/desktop/components/EditorSectionD';

const EditorSection = (stateProps: BottomSectionStateProps) => {
  const [displaySection, setDisplaySection] = useState<string>('hidden');
  const root = useRef<HTMLDivElement>(null);

  const fadeInUpAnim = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  useEffect(() => {
    const handleScroll = () => {
      if (root.current) {
        const { top } = root.current.getBoundingClientRect();
        setDisplaySection(
          top - window.innerHeight * (5 / 8) <= 0 ? 'visible' : 'hidden'
        );
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div
      className='w-full mt-56 flex flex-row items-center justify-center gap-20'
      initial='hidden'
      animate={displaySection}
      transition={{ duration: 0.25 }}
      variants={fadeInUpAnim}
      ref={root}
    >
      <motion.div
        className='flex flex-col items-start mb-auto'
        initial={{ opacity: 1 }}
        animate={displaySection}
        transition={{ duration: 0.5 }}
        variants={{
          hidden: { opacity: 1, x: -40 },
          visible: { opacity: 1, x: 0 },
        }}
      >
        <div className='flex flex-row items-center justify-center gap-4'>
          <div className='w-8 h-8 2xl:w-12 2xl:h-12 rounded-full border border-placeholderBlack items-center justify-center flex'>
            <div className='w-7 h-7 2xl:w-11 2xl:h-11 rounded-full border border-placeholderBlack items-center justify-center flex'>
              <img
                src={homeEdit.src}
                alt='homeedit'
                className='w-4 h-4 2xl:w-7 2xl:h-7'
              />
            </div>
          </div>
          <h1 className='2xl:text-3xl text-lg font-roboto-text font-semibold text-primary text-center justify-center'>
            Build anything
          </h1>
        </div>
        <h2 className='text-darkBlue text-2xl 2xl:text-5xl font-roboto-text font-bold text-start w-[300px] 2xl:w-[550px] mt-6'>
          A fully featured EDITOR for creating roadmaps
        </h2>
        <p className='text-placeholder text-base 2xl:text-lg font-roboto-text font-regular text-start w-[250px] 2xl:w-[600px] mt-8'>
          We wanted to allow as much space for creativity and usefulness as
          possible for the creation of the roadmaps. For that reason we created
          a fully-featured editor allowing granular control and customization
          for the nodes and roadmaps
        </p>
        <motion.a
          type='button'
          href='/roadmap/create'
          className='mt-8 bg-primary text-white font-roboto-text font-medium text-xl px-10 py-1 rounded-md shadow-md'
          whileHover={{
            backgroundColor: '#1A1B50',
            color: '#fff',
            scale: 1.05,
            transition: { duration: 0.2 },
          }}
        >
          Try tool
        </motion.a>
      </motion.div>
      <EditorSectionD {...stateProps} />
    </motion.div>
  );
};

export default EditorSection;
