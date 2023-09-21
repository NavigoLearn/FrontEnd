import React, { useEffect, useRef, useState } from 'react';
import MainNodeM from '@components/home/mobile/sections/editor/sections/editor-demonstration/components/nodes/MainNodeM';
import BasicNodeM from '@components/home/mobile/sections/editor/sections/editor-demonstration/components/nodes/BasicNodeM';
import ResourceNodeM from '@components/home/mobile/sections/editor/sections/editor-demonstration/components/nodes/ResourceNodeM';
import { useStore } from '@nanostores/react';
import { storeHomeNodesMobile } from '@components/home/mobile/sections/editor/sections/editor-demonstration/logic/store-home-nodes-mobile';
import NodeConnectionM from '@components/home/mobile/sections/editor/sections/editor-demonstration/components/NodeConnectionM';
import ButtonEditorSizingM from '@components/home/mobile/sections/editor/sections/editor-demonstration/components/buttons/ButtonEditorSizingM';
import ButtonEditorColorsM from '@components/home/mobile/sections/editor/sections/editor-demonstration/components/buttons/ButtonEditorColorsM';
import ButtonEditorInterior from '@components/home/mobile/sections/editor/sections/editor-demonstration/components/buttons/ButtonEditorInterior';

const NODE_BASIC_1 = {
  width: 130,
  height: 30,
  x: 5,
  y: 50,
};

const NODE_BASIC_2 = {
  width: 130,
  height: 30,
  x: 170,
  y: 50,
};

const NODE_PRIMARY = {
  width: 130,
  height: 30,
  x: 100,
  y: 150,
};

const NODE_RESOURCE = {
  width: 200,
  height: 130,
  x: 50,
  y: 200,
};

type IConnection = {
  from: string;
  to: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
};
const CONNECTIONS = [
  {
    from: 'node1basic', // for copilot
    to: 'primary',
    x1: NODE_BASIC_1.x + NODE_BASIC_1.width / 2,
    y1: NODE_BASIC_1.y + NODE_BASIC_1.height / 2,
    x2: NODE_PRIMARY.x + NODE_PRIMARY.width / 2,
    y2: NODE_PRIMARY.y + NODE_PRIMARY.height / 2,
  },
  {
    from: 'node2basic',
    to: 'primary',
    x1: NODE_BASIC_2.x + NODE_BASIC_2.width / 2,
    y1: NODE_BASIC_2.y + NODE_BASIC_2.height / 2,
    x2: NODE_PRIMARY.x + NODE_PRIMARY.width / 2,
    y2: NODE_PRIMARY.y + NODE_PRIMARY.height / 2,
  },
  {
    from: 'primary',
    to: 'resource',
    x1: NODE_PRIMARY.x + NODE_PRIMARY.width / 2,
    y1: NODE_PRIMARY.y + NODE_PRIMARY.height / 2,
    x2: NODE_RESOURCE.x + NODE_RESOURCE.width / 2,
    y2: NODE_RESOURCE.y + NODE_RESOURCE.height / 2,
  },
];

const EditorDemonstrationM = () => {
  const { focusedNode } = useStore(storeHomeNodesMobile);
  const HEIGHT = 350;
  const [viewport, setViewport] = useState({
    width: 300,
    height: HEIGHT,
  });
  const divRef = useRef(null);

  useEffect(() => {
    setViewport({
      width: divRef.current.offsetWidth,
      height: divRef.current.offsetHeight,
    });
    const handleResize = () => {
      setViewport({
        width: divRef.current.offsetWidth,
        height: divRef.current.offsetHeight,
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <div className='relative'>
        <div className='w-full h-32 flex justify-center gap-12 mt-10 mb-5'>
          <ButtonEditorSizingM
            size={50}
            text='Sizing'
            isSelected={focusedNode === 'main'}
          />
          <ButtonEditorColorsM
            size={50}
            text='Colors'
            isSelected={focusedNode === 'basic'}
          />
          <ButtonEditorInterior
            size={50}
            text='Interior'
            isSelected={focusedNode === 'resource'}
          />
          <div className='absolute left-1/2 -translate-x-1/2 text-placeholder text-sm -bottom-1'>
            And many more...
          </div>
        </div>
      </div>

      <div
        style={{
          boxShadow:
            '3px 3px 4px 0px rgba(0, 0, 0, 0.25) inset, -1px -1px 1px 1px rgba(255, 255, 255, 0.10) inset',
        }}
        className='w-full h-full bg-[#F4F4F5] flex justify-center font-semibold border-b-2 border-b-placeholderBlack'
      >
        <div ref={divRef} className={`relative h-[${HEIGHT}px] w-[300px] `}>
          <BasicNodeM
            height={NODE_BASIC_1.height}
            width={NODE_BASIC_1.width}
            x={NODE_BASIC_1.x}
            y={NODE_BASIC_1.y}
            selected={focusedNode === 'basic'}
            defaultState={focusedNode === 'none'}
          />
          <BasicNodeM
            height={NODE_BASIC_2.height}
            width={NODE_BASIC_2.width}
            x={NODE_BASIC_2.x}
            y={NODE_BASIC_2.y}
            selected={focusedNode === 'basic'}
            defaultState={focusedNode === 'none'}
          />
          <MainNodeM
            height={NODE_PRIMARY.height}
            width={NODE_PRIMARY.width}
            x={NODE_PRIMARY.x}
            y={NODE_PRIMARY.y}
            selected={focusedNode === 'main'}
            defaultState={focusedNode === 'none'}
          />
          <ResourceNodeM
            height={NODE_RESOURCE.height}
            width={NODE_RESOURCE.width}
            x={NODE_RESOURCE.x}
            y={NODE_RESOURCE.y}
            selected={focusedNode === 'resource'}
            defaultState={focusedNode === 'none'}
          />
          <svg
            viewBox={`0 0 ${viewport.width} ${viewport.height}`}
            className='w-full h-full'
          >
            {CONNECTIONS.map((connection: IConnection, index: number) => (
              <NodeConnectionM
                key={`${connection.from}-${connection.to}`}
                x1={connection.x1}
                y1={connection.y1}
                x2={connection.x2}
                y2={connection.y2}
              />
            ))}
          </svg>
        </div>
      </div>
    </>
  );
};

export default EditorDemonstrationM;
