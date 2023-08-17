import React, { useState, useEffect, useRef } from 'react';

type IDisplayProperty = {
  name: string;
  value: number;
  onChange: (value: string) => void;
  onDragChange: (value: number) => void;
};

const DraggableInput = ({
  name,
  value,
  onChange,
  onDragChange,
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
        const step = 1; // sensitivity
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
    <div className='flex gap-3 items-center'>
      <div className='text-secondary'>{name}</div>
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
      <div
        ref={divRef}
        id='draggable-input'
        className='w-[68px]'
        onMouseDown={handleMouseDown}
        style={{
          cursor: 'ew-resize',
          userSelect: 'none',
        }}
      >
        <input
          ref={inputRef}
          type='number'
          step='1'
          className='text-darkBlue w-16 font-semibold [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
          value={inputValue}
          onChange={handleInputChange}
          onMouseDown={handleInputMouseDown}
        />
      </div>
    </div>
  );
};

export default DraggableInput;
