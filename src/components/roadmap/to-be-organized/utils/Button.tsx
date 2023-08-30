import React from 'react';

type ButtonProps = {
  text: string;
  callback: () => void;
  color: 'primary' | 'secondary' | 'green';
  size: 'small' | 'medium' | 'large';
};

const Button = ({
  text,
  callback,
  color = 'secondary',
  size = 'small',
}: ButtonProps) => {
  const colors = {
    secondary: 'bg-secondary',
    primary: 'bg-primary',
    green: 'bg-green-500',
    red: 'bg-red-500',
  };
  const sizes = {
    small: 'h-8 text-sm px-4',
    medium: 'h-10 text-core px-6',
    large: 'h-12 text-lg px-6',
  };
  return (
    <button
      className={` flex justify-center items-center rounded-2xl   text-white font-medium  ${colors[color]} ${sizes[size]}`}
      type='button'
      onClick={callback}
    >
      {text}
    </button>
  );
};

export default Button;
