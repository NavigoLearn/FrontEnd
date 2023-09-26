import React, { useEffect, useRef, useState, useMemo } from 'react';
import { tailwindTransitionClass } from '@src/UI-library/tailwind-utils';
import { throttle } from '@src/typescript/roadmap_ref/render/chunks';
import useStateAndRef from '@hooks/useStateAndRef.tsx';

type IDisplayProperty = {
  name: string;
  value: number;
  onChange: (value: string) => void;
  sensitivity?: number;
  bounds: {
    min: number;
    max: number;
  };
};

const handleInputValidation = (newValue: string) => {
  if (newValue === '') {
    false;
  }
  if (newValue === '-') {
    false;
  }
  // checks if contains only numbers or '-'
  const regex = /^-?[0-9]+$/;
  if (!regex.test(newValue)) {
    return false;
  }
  if (newValue === null || newValue === undefined) {
    return false;
  }

  if (Number.isNaN(parseInt(newValue, 10))) {
    return false;
  }
  return true;
};

const DraggableInput = ({
  name,
  value,
  onChange,
  sensitivity,
  bounds,
}: IDisplayProperty) => {
  // throttling function cannot be recreated at every rerender, therefore the function it calls have a old closure of
  // the state. To solve this we use useRef to get the actual value of the state in the closure
  // feel free to refactor if a cleaner solution is found
  const [mouseDownAt, setMouseDownAt, mouseDownAtRef] = useStateAndRef(null);
  const init = value.toString();
  const [initialValue, setInitialValue, initialValueRef] = useStateAndRef(init);
  const [temporaryValue, setTemporaryValue, temporaryValueRef] =
    useStateAndRef(init);

  useEffect(() => {
    if (!mouseDownAt) {
      // the values were changes not from dragging
      setInitialValue(value.toString());
      setTemporaryValue(value.toString());
    }
  }, [value]);

  const handleInputBounding = (nonBoundedValue: string) => {
    const newValue = parseInt(nonBoundedValue, 10);
    if (!bounds) return newValue.toString();
    if (newValue < bounds.min) {
      return bounds.min.toString();
    }
    if (newValue > bounds.max) {
      return bounds.max.toString();
    }
    return newValue.toString();
  };

  const validationPipeline = (newValue: string) => {
    if (!handleInputValidation(newValue)) {
      setTemporaryValue(initialValueRef.current);
      return false;
    }
    const boundedValue = handleInputBounding(newValue);
    setTemporaryValue(boundedValue);

    return true;
  };

  const handleTempInputChangeTyped = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTemporaryValue(e.target.value);
  };

  const handleEnterChangeValue = () => {
    // pipeline for input validation
    if (!validationPipeline(temporaryValueRef.current)) return;

    onChange(temporaryValueRef.current);
    setInitialValue(temporaryValueRef.current);
  };

  const handleMouseMove = (e) => {
    const deltaX = e.clientX - mouseDownAtRef.current;
    // const step = sensitivity; // sensitivity
    const newValue = parseInt(initialValueRef.current, 10) + deltaX;
    const boundedValue = handleInputBounding(newValue.toString());
    setTemporaryValue(boundedValue);
    // syncs node with temporary value because it is dragged
    onChange(temporaryValueRef.current);
  };

  const throttledHandleMouseMove = useMemo(() => {
    return throttle(handleMouseMove, 1000 / 60);
  }, []);

  const handleMouseUp = () => {
    document.body.style.cursor = 'auto';
    document.removeEventListener('mousemove', throttledHandleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
    // sets the new value to initial value
    if (!validationPipeline(temporaryValueRef.current)) return;
    setInitialValue(temporaryValueRef.current);
    setMouseDownAt(null);
  };

  const handleMouseDown = (e) => {
    setMouseDownAt(e.clientX);
    validationPipeline(temporaryValueRef.current);
    document.body.style.cursor = 'ew-resize';
    document.addEventListener('mousemove', throttledHandleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div
      className={`flex items-center border border-transparent hover:border-gray-300 ${tailwindTransitionClass}`}
    >
      <div
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
        type='number'
        step='1'
        className='text-darkBlue w-10 outline-none font-semibold [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
        value={temporaryValue}
        onChange={handleTempInputChangeTyped}
        onKeyUp={(e) => {
          if (e.key === 'Enter') handleEnterChangeValue();
        }}
      />
    </div>
  );
};

DraggableInput.defaultProps = {
  sensitivity: 1,
  // bounds: undefined,
};

export default DraggableInput;
