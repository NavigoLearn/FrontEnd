import React, { useEffect, useRef, useState } from 'react';
import { tailwindTransitionClass } from '@src/UI-library/tailwind-utils';
import { throttle } from '@src/typescript/roadmap_ref/render/chunks';

type IDisplayProperty = {
  name: string;
  value: number;
  onChange: (value: string) => void;
  sensitivity?: number;
  defaultValue: number;
};

const DraggableInput = ({
  name,
  value,
  onChange,
  sensitivity,
  defaultValue,
}: IDisplayProperty) => {
  value ??= defaultValue;

  const [isDragging, setIsDragging] = useState(false);
  const [mouseDownAt, setMouseDownAt] = useState(0);
  const [prevDeltaX, setPrevDeltaX] = useState(0);
  const [initialValue, setInitialValue] = useState(value);

  const divRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - mouseDownAt;
      const step = sensitivity; // sensitivity
      const newValue = initialValue + deltaX;
      onChange(newValue.toString());
      setPrevDeltaX(deltaX);
    };

    const throttledHandleMouseMove = throttle(handleMouseMove, 1000 / 60);

    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener('mousemove', throttledHandleMouseMove);
      document.body.style.cursor = 'auto';
    };

    if (isDragging) {
      document.addEventListener('mousemove', throttledHandleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mousemove', throttledHandleMouseMove);
    };
  }, [isDragging, mouseDownAt, initialValue, sensitivity, onChange]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setMouseDownAt(e.clientX);
    setPrevDeltaX(0);
    setInitialValue(value); // Update initialValue when dragging starts
    document.body.style.cursor = 'ew-resize';
  };

  const handleInputMouseDown = (e) => {
    e.stopPropagation();
  };

  const handleInputChange = (e) => {
    const newValue = parseInt(e.target.value, 10);
    onChange(newValue.toString());
  };

  return (
    <div
      className={`flex items-center border border-transparent hover:border-gray-300 ${tailwindTransitionClass}`}
    >
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
        <div className='text-secondary text-lg'>{name}</div>
      </div>
      <input
        ref={inputRef}
        type='number'
        step='1'
        className='text-darkBlue w-10 outline-none font-semibold [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
        value={value}
        onChange={handleInputChange}
        onMouseDown={handleInputMouseDown}
      />
    </div>
  );
};

DraggableInput.defaultProps = {
  sensitivity: 1,
};

export default DraggableInput;
