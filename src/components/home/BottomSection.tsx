import React, { useEffect, useRef, useState } from 'react';
import homeedit from '@assets/homeedit.svg';
import { motion, useAnimation } from 'framer-motion';
import {
  ColoursButton,
  InteriorButton,
  SizingButton,
} from './animated/ButtonsNodes';
import NodesAnimationSmall from './animated/NodesAnimationSmall';

const BottomSection = () => {
  const [selectedButton, setSelectedButton] = useState(null);
  const [primaryNodeText, setPrimaryNodeText] = useState('Primary node');
  // const [primaryNodeOpacity, setPrimaryNodeOpacity] = useState(1);
  const [secondaryNodesOpacity, setSecondaryNodesOpacity] = useState(1);
  const [interiorNodeOpacity, setInteriorNodeOpacity] = useState(0); // State for interior node opacity
  const [interiorNodeText, setInteriorNodeText] = useState(
    'Secondary node with sub nodes'
  ); // State for interior node text
  const [subNodeOpacity, setSubNodeOpacity] = useState(1); // State for sub node opacity
  const [secondaryNodeColor, setSecondaryNodeColor] = useState(
    'bg-white text-secondary'
  ); // State for secondary node background and text color
  const [secondaryNodeText, setSecondaryNodeText] = useState('Secondary node'); // State for secondary node text
  const [resetTimeout, setResetTimeout] = useState(null); // Reset timer
  const root = useRef(null);
  const [displaySection, setDisplaySection] = useState('hidden'); // State for displaying the section [true/false
  const controls = useAnimation(); // Initialize animation controls

  const fadeInUpAnim = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const resetNodesToDefault = () => {
    setSelectedButton(null);
    setPrimaryNodeText('Primary node');
    setSecondaryNodesOpacity(1);
    setSubNodeOpacity(1);
    setInteriorNodeOpacity(0);
    setInteriorNodeText('Secondary node with sub nodes');
    setSecondaryNodeColor('bg-white text-secondary');
    setSecondaryNodeText('Secondary node');
    controls.stop();
    controls.start({
      height: '32px',
      opacity: 1,
    });
  };

  const startResetTimer = () => {
    // Clear existing timer
    clearTimeout(resetTimeout);

    // Start a new timer for 5 seconds
    const timer = setTimeout(() => {
      resetNodesToDefault();
    }, 5000);

    // Set the timer in state
    setResetTimeout(timer);
  };

  const handleSizingButton = async () => {
    setSelectedButton('sizing');
    setPrimaryNodeText('My size changed');
    setSecondaryNodesOpacity(0.1);
    setInteriorNodeOpacity(0);
    setInteriorNodeText('Secondary node with sub nodes');
    setSubNodeOpacity(0.4);
    setSecondaryNodeColor('bg-white text-secondary');
    await controls.start({
      height: '120px',
      opacity: 1,
    });
    startResetTimer();
  };

  const handleColorsButton = async () => {
    setSelectedButton('colors');
    setPrimaryNodeText('Primary node');
    setSecondaryNodesOpacity(1);
    setSubNodeOpacity(0.4);
    setInteriorNodeOpacity(0);
    setInteriorNodeText('Secondary node with sub nodes');
    setSecondaryNodeColor('bg-darkBlue text-white');
    setSecondaryNodeText('Colours changed');
    controls.stop();
    await controls.start({
      height: '32px',
      opacity: 0.4,
    });
    startResetTimer();
  };

  const handleInteriorButton = async () => {
    setSelectedButton('interior');
    setPrimaryNodeText('Primary node');
    setSecondaryNodeColor('bg-white text-secondary');
    setSecondaryNodeText('Secondary node');
    setSecondaryNodesOpacity(0.4);
    setSubNodeOpacity(1);
    setInteriorNodeOpacity(1);
    setInteriorNodeText('Interior changes');
    controls.stop();
    await controls.start({
      height: '32px',
      opacity: 0.4,
    });
    startResetTimer();
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
                src={homeedit}
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
        <p className='text-placeholder text-base 2xl:text-lg font-roboto-text font-medium text-start w-[250px] 2xl:w-[600px] mt-8'>
          We wanted to allow as much space for creativity and usefulness as
          possible for the creation of the roadmaps. For that reason we created
          a fully-featured editor allowing granular control and customization
          for the nodes and roadmaps
        </p>
        <motion.a
          type='button'
          href='/roadmaps/create'
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
      <div className='flex flex-col'>
        <motion.div
          style={{
            boxShadow:
              '3px 3px 4px 0px rgba(0, 0, 0, 0.25) inset, -1px -1px 1px 1px rgba(255, 255, 255, 0.10) inset',
          }}
          className='bg-[#F4F4F5] border border-darkBlue lg:w-[600px] 2xl:w-[900px] 2xl:h-96 lg:h-56 rounded-md flex justify-center items-center font-semibold'
        >
          <div className='flex flex-row items-center'>
            <div className='z-10 flex flex-col items-center translate-y-4 md:translate-y-8 lg:translate-x-2'>
              <motion.div
                className={`py-1 lg:px-4 2xl:px-8 2xl:text-lg lg:text-xs text-sm rounded-md shadow-lg ${secondaryNodeColor} font-roboto-text`}
                initial={{ opacity: 1 }}
                animate={{ opacity: secondaryNodesOpacity }}
              >
                {secondaryNodeText}
              </motion.div>
              <motion.div
                className={`py-1 lg:px-4 2xl:px-8 2xl:text-lg lg:text-xs text-sm rounded-md shadow-lg ${secondaryNodeColor} text-secondary font-roboto-text mt-4 md:mt-8`}
                initial={{ opacity: 1 }}
                animate={{ opacity: secondaryNodesOpacity }}
              >
                {secondaryNodeText}
              </motion.div>
            </div>
            <div className='flex flex-col translate-y-8 md:translate-y-14 z-[0]'>
              <NodesAnimationSmall />
              <div className='-translate-y-6 md:-translate-y-10'>
                <NodesAnimationSmall y1={0} y2={-32} />
              </div>
            </div>
            <motion.div
              className='flex justify-center md:py-1 lg:px-4 2xl:px-8 rounded-md shadow-lg text-center items-center bg-darkBlue text-white 2xl:text-lg lg:text-xs  font-roboto-text font-semibold -translate-x-2 md:-translate-x-4'
              initial={{ height: '32px', opacity: 1 }}
              animate={controls}
            >
              {primaryNodeText}
            </motion.div>
            <div className='-translate-x-4 md:-translate-x-6'>
              <NodesAnimationSmall />
            </div>
            <motion.div
              className='flex flex-col bg-white shadow-lg lg:w-32 2xl:w-52 rounded-md items-start py-2 px-1 xl:px-2 2xl:px-4 h-36 2xl:h-44 -translate-x-4 md:-translate-x-8'
              initial={{ opacity: 1 }}
              animate={{ opacity: subNodeOpacity }}
            >
              <h2 className='text-secondary font-roboto-text text-xs xl:text-md 2xl:text-lg w-16 lg:w-32 2xl:w-44'>
                {interiorNodeText}
              </h2>
              <div className='bg-[#ECEFF2] rounded-md shadow-lg py-1 lg:w-28 2xl:w-40 px-2 text-start text-darkBlue text-sm xl:text-md 2xl:text-lg font-roboto-text font-medium'>
                Inside node
              </div>
              <div className='flex flex-row gap-2 mt-2'>
                <motion.div
                  className='bg-[#ECEFF2] rounded-md text-[10px] 2xl:text-sm shadow-lg py-1 w-[52px] 2xl:w-[76px] h-12 2xl:px-2 text-start text-darkBlue font-roboto-text font-medium'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: interiorNodeOpacity }}
                >
                  Subnode1
                </motion.div>
                <motion.div
                  className='bg-[#ECEFF2] rounded-md text-[10px] 2xl:text-sm shadow-lg py-1 w-[52px] 2xl:w-[76px] h-12 2xl:px-2 text-start text-darkBlue font-roboto-text font-medium'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: interiorNodeOpacity }}
                >
                  Subnode2
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
        <div className='flex flex-row gap-4 md:gap-10 items-start justify-start mt-6 md:mt-12 ml-4 md:ml-10'>
          <div className='flex flex-row gap-6 md:gap-20 justify-start items-start'>
            <SizingButton
              onClick={handleSizingButton}
              isSelected={selectedButton === 'sizing'}
            />
            <ColoursButton
              onClick={handleColorsButton}
              isSelected={selectedButton === 'colors'}
            />
            <InteriorButton
              onClick={handleInteriorButton}
              isSelected={selectedButton === 'interior'}
            />
          </div>
          <h2 className='justify-center text-center text-secondary font-roboto-text font-semibold text-lg md:text-xl my-auto'>
            and many more...
          </h2>
        </div>
        <h2 className='text-placeholder text-lg md:text-xl font-roboto-text font-semibold ml-4 md:ml-10 w-60 md:w-80 mt-4 md:mt-5'>
          Also, we allow infinitely recursive editable nodes, just to know
        </h2>
      </div>
    </motion.div>
  );
};

export default BottomSection;
