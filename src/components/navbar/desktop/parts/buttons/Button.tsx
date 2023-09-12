import React, { useRef } from 'react';

type IButtonTypes =
  | {
      type: 'button';
      callback: () => void;
    }
  | {
      type: 'link';
      href: string;
    };

type IButtonProps = {
  hasUnder: boolean;
  name: string;
  buttonData: IButtonTypes;
};

const Button = ({ hasUnder, name, buttonData }: IButtonProps) => {
  const lineRef = useRef<HTMLDivElement | null>(null);

  return (
    // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
    <li
      className='flex pointer-events-auto relative'
      onMouseOver={() => {
        const div = lineRef.current;
        if (!div) {
          return;
        }
        div.style.left = '0px';
        div.style.removeProperty('right');
        div.style.width = '100%';
      }}
      onMouseOut={() => {
        const div = lineRef.current;
        if (!div) {
          return;
        }
        div.style.right = '0px';
        div.style.removeProperty('left');
        div.style.width = '0px';
      }}
    >
      {hasUnder && (
        <div
          ref={lineRef}
          className='absolute -bottom-1 w-0 h-[2px] bg-black transition-all duration-300'
        />
      )}
      {buttonData.type === 'button' ? (
        <button
          type='button'
          className='text-md font-medium font-roboto-text text-center inline-block  transition-all'
          onClick={() => {
            buttonData.callback();
          }}
        >
          {name}
        </button>
      ) : (
        <a
          className='text-md font-medium font-roboto-text text-center inline-block  transition-all'
          href={buttonData.href}
        >
          {name}
        </a>
      )}
    </li>
  );
};

export default Button;
