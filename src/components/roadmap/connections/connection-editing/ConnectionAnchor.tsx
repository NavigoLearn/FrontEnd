import {
  ConnectionClass,
  type IConnectionPositions,
} from '@src/typescript/roadmap_ref/node/connections/core';
import { connectionSetter } from '@src/typescript/roadmap_ref/node/connections/services';
import { triggerConnectionRerender } from '@store/roadmap-refactor/render/rerender-trigger-connections';
import React, { useEffect, useRef } from 'react';
import { tailwindTransitionClass } from '@src/UI-library/tailwind-utils';
import { triggerNodeRerender } from '@store/roadmap-refactor/render/rerender-triggers-nodes';

type IRedSquare = {
  x: number;
  y: number;
  width: number;
  height: number;
  positionType: IConnectionPositions;
  position: 'to' | 'from';
  connection: ConnectionClass;
  filled: boolean;
  // nodeId: string;
};

const ConnectionAnchor = ({
  x,
  y,
  width,
  height,
  positionType,
  position,
  connection,
  filled,
}: IRedSquare) => {
  const handleClick = (e) => {
    connectionSetter(position, connection, positionType);
    triggerConnectionRerender(connection.id);
    triggerNodeRerender(connection.from);
    triggerNodeRerender(connection.to);
    e.stopPropagation();
  };
  const anchorButtonRef = useRef(null);

  useEffect(() => {
    if (anchorButtonRef.current) {
      anchorButtonRef.current.style.width = `${width}px`;
      anchorButtonRef.current.style.height = `${height}px`;
    }
  }, []);

  return (
    <button
      ref={anchorButtonRef}
      type='button'
      className={` ${
        filled && 'bg-primary'
      } border-2 border-primary hover:bg-primary rounded-sm absolute z-20${tailwindTransitionClass}`}
      style={{ top: `${y}px`, left: `${x}px` }}
      onClick={handleClick}
      onMouseOver={(e) => {
        e.stopPropagation();
      }}
    />
  );
};

export default ConnectionAnchor;
