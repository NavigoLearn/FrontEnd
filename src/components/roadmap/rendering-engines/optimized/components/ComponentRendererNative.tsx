import React, { type MutableRefObject, useEffect, useRef } from 'react';
import { calculateComponentsPositions } from '@src/to-be-organized/node-rendering-stuff/logic';
import { NodeClass } from '@src/typescript/roadmap_ref/node/core/core';
import { type IComponentObject } from '@type/roadmap/node/components-types';
import {
  selectNodeColorText,
  selectTextFontWeight,
  selectTextFontSize,
} from '@src/typescript/roadmap_ref/node/core/factories/data-mutation/services';
import { getColorThemeFromRoadmap } from '@components/roadmap/pages-roadmap/setup-screen/theme-controler';
import {
  mutateComponentTextHeight,
  mutateComponentTextWidth,
} from '@src/typescript/roadmap_ref/node/components/text/mutate';
import { getIsEditable } from '@store/roadmap-refactor/roadmap-data/misc-data/roadmap_state';
import { getSelectedNodeId } from '@store/roadmap-refactor/elements-editing/store-editor-selected-data';
import storeDisplayManager from '@store/roadmap-refactor/display/display-manager';
import { triggerNodeRerender } from '@store/roadmap-refactor/render/rerender-triggers-nodes';
import DraggingResizeElement from '@src/to-be-organized/resize-dragging/DraggingResizeElement';
import { getNodeByIdRoadmapSelector } from '@src/typescript/roadmap_ref/roadmap-data/services/get';
import { AnimatePresence, motion } from 'framer-motion';

function textPositioningCalculations(
  textElement: React.MutableRefObject<SVGTextElement | null>,
  text: string,
  maxWidth: number,
  lineHeight: number
) {
  if (textElement.current === null) return;
  // written by chatgpt, I haven't understood it fully but it works for now so I'll keep it
  // text svg element is lacking features such as multi line text so this function implements it from scratch basically

  const words = text.split(' ');
  let line = '';

  textElement.current.textContent = '';

  let tspan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
  tspan.setAttribute('x', '0');
  tspan.setAttribute('y', '0');
  textElement.current.appendChild(tspan);

  for (let i = 0; i < words.length; i += 1) {
    const word = words[i];
    const testLine = `${line + word} `;
    tspan.textContent = testLine;

    const bbox = textElement.current.getBBox();

    if (bbox.width > maxWidth && line !== '') {
      tspan.textContent = line.trim();

      line = `${word} `;

      const newTspan = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'tspan'
      );
      newTspan.setAttribute('x', '0');
      newTspan.setAttribute('dy', String(lineHeight));
      newTspan.textContent = line;
      textElement.current.appendChild(newTspan);

      tspan = newTspan;
    } else {
      line = testLine;
    }
  }
}

function wrapText2(
  textElement: MutableRefObject<SVGTextElement>,
  text: string,
  maxWidth: number
) {
  const words = text.split(' ');

  let line = '';
  const lineHeight = 30;
  let height = lineHeight;

  textElement.current.textContent = '';

  for (let i = 0; i < words.length; i += 1) {
    const word = words[i];
    line = `${line + word} `;
    textElement.current.textContent = line;
    const bbox = textElement.current.getBBox();

    if (bbox.width > maxWidth && line !== '') {
      textElement.current.textContent = line;

      line += '\n';
      height += lineHeight;
    }
  }
}

type IComponentElementProps = {
  component: IComponentObject;
  parentNode: NodeClass;
};

const ComponentRendererNative = ({
  component,
  parentNode,
}: IComponentElementProps) => {
  const { id, type, textSize, textWeight, text } = component;
  const { colorType } = parentNode.data;
  const textRef = useRef<SVGTextElement>(null);
  const theme = getColorThemeFromRoadmap();

  const parentSelected =
    getSelectedNodeId() === parentNode.id &&
    getIsEditable() &&
    storeDisplayManager.get().type !== 'closed';

  const textColor = selectNodeColorText(theme, colorType);

  const textWeightSelect = selectTextFontWeight(textWeight);

  const fontSizeSelect = selectTextFontSize(textSize);

  const { position, height, width } = calculateComponentsPositions(
    component,
    parentNode,
    {
      type: 'native-elements',
      textRef,
    }
  );

  const adjustedWidth = width + 10;
  const adjustedHeight = height + 5;

  const lineHeight = 30;
  useEffect(() => {
    // !! WARNING, This is a patch that reimplements multiline text for svg text elements, it is "AI powered" so if you break it its your fault
    textPositioningCalculations(textRef, text, width, lineHeight);
    mutateComponentTextHeight(component, height);
  });

  return (
    <g transform={`translate(${position.x},${position.y})`}>
      <g id={`g${id}`} className='pointer-events-auto select-none'>
        <AnimatePresence>
          {!!parentSelected && (
            <motion.foreignObject
              width={adjustedWidth + 10}
              height={adjustedHeight + 10}
              className='pointer-events-auto relative z-10'
              x={-5}
              y={-5}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div className='pointer-events-none w-full h-full absolute top-[5px] left-[5px]'>
                {/* dragging */}
              </motion.div>
            </motion.foreignObject>
          )}
        </AnimatePresence>

        <text
          className='pointer-events-none'
          transform={`translate(${adjustedWidth / 2 - 5},${lineHeight / 2})`}
          ref={textRef}
          key={component.id}
          id={`text${id}`}
          style={{
            fill: textColor,
            fontSize: fontSizeSelect,
            fontWeight: textWeightSelect,
          }}
          // width={adjustedWidth}
          // height={adjustedHeight}
          textAnchor='middle'
          dominantBaseline='middle'
          // x={adjustedWidth / 2}
          // y={adjustedHeight / 2}
        >
          {text}
        </text>
      </g>
    </g>
  );
};

export default ComponentRendererNative;
