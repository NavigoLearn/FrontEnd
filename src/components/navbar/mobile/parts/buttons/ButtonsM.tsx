import React from 'react';
import loupeWhite from '@assets/loupe-white.svg';
import homeWhite from '@assets/home-white.svg';

type ILinkM = {
  text: string;
  href: string;
  imgsrc: string;
};

const imageMapping: Record<string, string> = {
  home: homeWhite.src,
  explore: loupeWhite.src,
};

const LinkM = ({ text, href, imgsrc }: ILinkM) => {
  // Get the image source based on the imgsrc prop
  const imageSource = imageMapping[imgsrc] || '';

  return (
    <div className='flex flex-row'>
      <a
        href={href}
        className='text-white flex gap-2 items-center text-center text-[4vw] font-roboto-text font-normal'
      >
        <img
          src={imageSource}
          alt={`${imgsrc}icon`}
          className='w-[4vw] h-[4vw]'
        />
        {text}
      </a>
    </div>
  );
};

const ButtonM = ({ text, onClick }: { text: string; onClick: () => void }) => {
  return (
    <div className='flex flex-row'>
      <button
        type='button'
        onClick={onClick}
        className='text-white flex gap-2 mb-6 items-center text-center text-[4vw] font-roboto-text font-normal'
      >
        {text}
      </button>
    </div>
  );
};

export { ButtonM, LinkM };
