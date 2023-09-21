import { motion } from 'framer-motion';
import NodesAnimationSmall from '@components/home/desktop/components/NodesAnimationSmall';
import {
  ColorsButton,
  InteriorButton,
  SizingButton,
} from '@components/home/desktop/components/ButtonsNodes';
import React from 'react';
import { type BottomSectionStateProps } from '@components/home/desktop/components/BottomSectionState';

const EditorSectionD = ({
  controls,
  handleButtonPress,
  selectedButton,
  secondaryNodeText,
  secondaryNodeColor,
  secondaryNodesOpacity,
  primaryNodeText,
  subNodeOpacity,
  interiorNodeText,
  interiorNodeOpacity,
}: BottomSectionStateProps) => {
  return (
    <div className='flex flex-col'>
      <motion.div
        style={{
          boxShadow:
            '3px 3px 4px 0px rgba(0, 0, 0, 0.25) inset, -1px -1px 1px 1px rgba(255, 255, 255, 0.10) inset',
        }}
        className='bg-[#F4F4F5] border border-placeholderBlack lg:w-[600px] 2xl:w-[900px] 2xl:h-96 lg:h-56 rounded-md flex justify-center items-center font-semibold'
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
            onClick={handleButtonPress}
            isSelected={selectedButton === 'sizing'}
          />
          <ColorsButton
            onClick={handleButtonPress}
            isSelected={selectedButton === 'colors'}
          />
          <InteriorButton
            onClick={handleButtonPress}
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
  );
};

export default EditorSectionD;
