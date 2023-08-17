import React, { useEffect, useRef, useState } from 'react';
import { tailwindTransitionClass } from '@src/UI-library/tailwind-utils';

type IDisplayProperty = {
  name: string;
  value: number;
  onChange: (value: string) => void;
  onDragChange: (value: number) => void;
  sensitivity?: number;
};

const DraggableInput = ({
  name,
  value,
  onChange,
  onDragChange,
  sensitivity,
}: IDisplayProperty) => {
  const [isDragging, setIsDragging] = useState(false);
  const [mouseDownAt, setMouseDownAt] = useState(0);
  const [prevDeltaX, setPrevDeltaX] = useState(0);
  const [inputValue, setInputValue] = useState(value);

  const divRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging) {
        const deltaX = e.clientX - mouseDownAt;
        const step = sensitivity; // sensitivity
        if (deltaX !== prevDeltaX) {
          const newValue = inputValue + step * (deltaX > prevDeltaX ? 1 : -1);
          setInputValue(Math.max(0, newValue));

          onDragChange(newValue); // Call the callback with the new value

          setPrevDeltaX(deltaX);
        }
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setPrevDeltaX(0);
      document.body.style.cursor = 'auto';
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, mouseDownAt, inputValue, prevDeltaX]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setMouseDownAt(e.clientX);
    setPrevDeltaX(0);
    document.body.style.cursor = 'ew-resize';
  };

  const handleInputMouseDown = (e) => {
    e.stopPropagation();
  };

  const handleInputChange = (e) => {
    const newValue = parseInt(e.target.value, 10);
    setInputValue(newValue);
    onChange(newValue.toString());
  };

  return (
    <div
      className={`flex items-center border-2 border-transparent hover:border-gray-500 ${tailwindTransitionClass}`}
    >
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
      <div
        ref={divRef}
        id='draggable-input'
        className='px-2 '
        onMouseDown={handleMouseDown}
        style={{
          cursor: 'ew-resize',
          userSelect: 'none',
        }}
      >
        <div className='text-secondary'>{name}</div>
      </div>
      <input
        ref={inputRef}
        type='number'
        step='1'
        className='text-darkBlue w-12 outline-none font-semibold [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
        value={inputValue}
        onChange={handleInputChange}
        onMouseDown={handleInputMouseDown}
      />
    </div>
  );
};

export default DraggableInput;
