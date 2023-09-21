import React from 'react';
import versatileImage from '@assets/versatile.svg';
import infiniteImage from '@assets/infinite.svg';
import intuitiveImage from '@assets/intuitive.svg';
import { motion, type HTMLMotionProps } from 'framer-motion';
import type { ImageMetadata } from 'astro';

const imageMap: Record<string, ImageMetadata> = {
  versatile: versatileImage,
  infinite: infiniteImage,
  intuitive: intuitiveImage,
};

type ICardProperties = {
  title: string;
  description: string;
  image: keyof typeof imageMap;
  animate: HTMLMotionProps<'div'>['animate'];
  variants: HTMLMotionProps<'div'>['variants'];
};

const CardsM = ({
  title,
  description,
  image,
  animate,
  variants,
}: ICardProperties) => {
  const imagePath = imageMap[image];
  return (
    <motion.div
      className='border-primary border-t-4 w-full max-w-sm h-60 px-6 bg-white drop-shadow-md items-center'
      // initial='hidden'
      // animate={animate}
      // variants={variants}
    >
      <div className='bg-white border border-primary rounded-full justify-center mx-auto -translate-y-1/2 items-center flex w-16 h-16'>
        <img
          src={imagePath.src}
          alt={image}
          className='w-10 h-10 justify-center items-center'
        />
      </div>
      <h1 className='text-xl font-roboto-text font-semibold bg-gradient-to-b bg-clip-text text-transparent from-[#1A1B50] to-[#3134A5] text-center justify-center -translate-y-8'>
        {title}
      </h1>
      <p className='text-secondary text-sm justify-center text-center font-roboto-text -translate-y-2'>
        {description}
      </p>
    </motion.div>
  );
};

export default CardsM;
