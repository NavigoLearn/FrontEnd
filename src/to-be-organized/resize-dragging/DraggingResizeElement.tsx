import React, { useEffect, useRef } from 'react';
import { handleResizeNodeMouseDown } from '@src/to-be-organized/resize-dragging/resize-node-mouse-protocols';
import { NodeClass } from '@src/typescript/roadmap_ref/node/core/core';
import {
  type IMouseDragDirection,
  setResizeNodeRef,
} from '@src/to-be-organized/resize-dragging/stores-resize-node';
import { type IComponentClasses } from '@src/typescript/roadmap_ref/node/components/text/factories';
import { setResizeComponentRef } from '@src/to-be-organized/resize-dragging/stores-resize-components';
import { setResizeIsResizing } from '@src/to-be-organized/resize-dragging/stores-resize-shared-data';
import { handleResizeComponentMouseDown } from '@src/to-be-organized/resize-dragging/resize-component-mouse-protocols';

type IDraggingSizeWrapperProps = {
  style: {
    width: number;
    height: number;
  };
  onlyXaxis?: boolean;
  element: NodeClass | IComponentClasses;
  setResizeCallback: () => void;
};

function isNodeClass(element: any): element is NodeClass {
  const field = 'subNodeIds';
  return 'subNodeIds' in element;
}

const DraggingResizeElement = ({
  style,
  onlyXaxis,
  element,
  setResizeCallback,
}: IDraggingSizeWrapperProps) => {
  const wrapperDiv = useRef(null);

  useEffect(() => {
    wrapperDiv.current.style.width = `${style.width}px`;
    wrapperDiv.current.style.height = `${style.height}px`;
  }, [style]);

  const vertexStyle = ' w-3 h-3 bg-white border-2 border-primary ';
  const onlyX = !!onlyXaxis;

  function handleResizeMouseDownProtocol(e, direction: IMouseDragDirection) {
    if (isNodeClass(element)) {
      setResizeNodeRef(element);
      setResizeIsResizing(setResizeCallback);
      handleResizeNodeMouseDown(e, direction);
    } else {
      setResizeComponentRef(element);
      handleResizeComponentMouseDown(e, direction);
    }
  }

  return (
    <div
      ref={wrapperDiv}
      className='pointer-events-none top-[-1.5px] left-[-1.5px] absolute border-2 border-primary'
    >
      <div
        onMouseDownCapture={(e) => {
          handleResizeMouseDownProtocol(e, 'top');
          e.stopPropagation();
        }}
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={`absolute -top-2 cursor-ns-resize w-full h-2 left-0 ${
          onlyX ? 'pointer-events-none' : 'pointer-events-auto'
        }`}
      />
      <div
        onMouseDownCapture={(e) => {
          handleResizeMouseDownProtocol(e, 'bottom');
          e.stopPropagation();
        }}
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={`absolute -bottom-2 left-0 cursor-ns-resize w-full h-2  ${
          onlyX ? 'pointer-events-none' : 'pointer-events-auto'
        } `}
      />
      <div
        onMouseDownCapture={(e) => {
          handleResizeMouseDownProtocol(e, 'left');
          e.stopPropagation();
        }}
        onClick={(e) => {
          e.stopPropagation();
          // prevents clicking from opening editor
        }}
        className='absolute top-0 -left-2 cursor-ew-resize w-2 h-full pointer-events-auto'
      />
      <div
        onMouseDownCapture={(e) => {
          handleResizeMouseDownProtocol(e, 'right');
          e.stopPropagation();
        }}
        onClick={(e) => {
          e.stopPropagation();
          // prevents clicking from opening editor
        }}
        className='absolute top-0 -right-2 cursor-ew-resize w-2 h-full pointer-events-auto '
      />
      {onlyX && (
        <>
          <div
            onMouseDownCapture={(e) => {
              handleResizeMouseDownProtocol(e, 'right');
              e.stopPropagation();
            }}
            onClick={(e) => {
              e.stopPropagation();
            }}
            className={`absolute top-1/2 -translate-y-1/2 -right-1.5 cursor-w-resize  ${vertexStyle} pointer-events-auto`}
          />

          <div
            onMouseDownCapture={(e) => {
              handleResizeMouseDownProtocol(e, 'left');
              e.stopPropagation();
            }}
            onClick={(e) => {
              e.stopPropagation();
            }}
            className={`absolute top-1/2 -translate-y-1/2 -left-1.5 cursor-e-resize  ${vertexStyle} pointer-events-auto`}
          />
        </>
      )}
      {!onlyX && (
        <>
          <div
            onMouseDownCapture={(e) => {
              handleResizeMouseDownProtocol(e, 'top-left'); // Param for top left
              e.stopPropagation();
            }}
            onClick={(e) => {
              e.stopPropagation();
              // prevents clicking from opening editor
            }}
            className={`absolute -top-1.5 -left-1.5 cursor-nwse-resize  ${vertexStyle} pointer-events-auto`}
          />
          <div
            onMouseDownCapture={(e) => {
              handleResizeMouseDownProtocol(e, 'top-right'); // Param for top right
              e.stopPropagation();
            }}
            onClick={(e) => {
              e.stopPropagation();
              // prevents clicking from opening editor
            }}
            className={`absolute -top-1.5 -right-1.5 cursor-nesw-resize ${vertexStyle} pointer-events-auto`}
          />
          <div
            onMouseDownCapture={(e) => {
              handleResizeMouseDownProtocol(e, 'bottom-left'); // Param for bottom left
              e.stopPropagation();
            }}
            onClick={(e) => {
              e.stopPropagation();
              // prevents clicking from opening editor
            }}
            className={`absolute -bottom-1.5 -left-1.5 cursor-nesw-resize ${vertexStyle} pointer-events-auto`}
          />
          <div
            onMouseDownCapture={(e) => {
              handleResizeMouseDownProtocol(e, 'bottom-right'); // Param for bottom right
              e.stopPropagation();
            }}
            onClick={(e) => {
              e.stopPropagation();
              // prevents clicking from opening editor
            }}
            className={`absolute -bottom-1.5 -right-1.5 cursor-nwse-resize ${vertexStyle} pointer-events-auto`}
          />
        </>
      )}
    </div>
  );
};

DraggingResizeElement.defaultProps = {
  onlyXaxis: false,
};

export default DraggingResizeElement;
