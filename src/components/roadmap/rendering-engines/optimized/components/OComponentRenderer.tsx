import React, { useRef } from 'react';
import { calculateComponentsPositions } from '@src/to-be-organized/nodeview/logic';
import { NodeClass } from '@src/typescript/roadmap_ref/node/core/core';
import { IComponentObject } from '@type/roadmap/node/components-types';
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
import { getSelectedNodeId } from '@store/roadmap-refactor/elements-editing/editor-selected-data';
import displayManagerStore from '@store/roadmap-refactor/display/display-manager';
import { getOnMouseOverAction } from '@src/to-be-organized/nodeview/actions-manager';
import { triggerNodeRerender } from '@store/roadmap-refactor/render/rerender-triggers-nodes';
import DraggingResizeElement from '@src/to-be-organized/DraggingResizeElement';
import { getNodeByIdRoadmapSelector } from '@src/typescript/roadmap_ref/roadmap-data/services/get';

type IComponentElementProps = {
  component: IComponentObject;
  parentNode: NodeClass;
};

const OComponentRenderer = ({
  component,
  parentNode,
}: IComponentElementProps) => {
  const { id, type, textSize, textWeight, text } = component;
  const { colorType } = parentNode.data;
  const textRef = useRef(null);
  const theme = getColorThemeFromRoadmap();

  const parentSelected =
    getSelectedNodeId() === parentNode.id &&
    getIsEditable() &&
    displayManagerStore.get().type !== 'closed';

  const textColor = selectNodeColorText(theme, colorType);

  const textWeightSelect = selectTextFontWeight(textWeight);

  const fontSizeSelect = selectTextFontSize(textSize);

  const { position, height, width } = calculateComponentsPositions(
    component,
    parentNode,
    textRef
  );
  mutateComponentTextHeight(component, height);

  console.log(`rendering component ${id}`, parentSelected);

  return (
    <g transform={`translate(${position.x},${position.y})`}>
      <g
        id={`g${id}`}
        className='pointer-events-auto'
        onClick={(e) => {
          e.stopPropagation();
          console.log(`click comp${id}`);
        }}
        onMouseOver={(e) => {
          e.stopPropagation();
          console.log(`mouse over comp${id}`);
        }}
      >
        {parentSelected && (
          <DraggingResizeElement
            style={{
              width,
              height,
            }}
            widthCallback={(newWidth) => {
              const parentWidth = getNodeByIdRoadmapSelector(parentNode.id).data
                .width;
              if (newWidth > parentWidth) {
                newWidth = parentWidth;
              }
              mutateComponentTextWidth(component, newWidth);
              triggerNodeRerender(parentNode.id);
            }}
            heightCallback={(newHeight: number) => {
              const parentHeight = getNodeByIdRoadmapSelector(parentNode.id)
                .data.height;
              if (newHeight > parentHeight) {
                newHeight = parentHeight;
              }
              mutateComponentTextHeight(component, newHeight);
              triggerNodeRerender(parentNode.id);
            }}
            snappingCallback={(newWidth: number, newHeight: number) => {
              return { width: newWidth, height: newHeight };
            }}
          />
        )}
        <text
          className='pointer-events-none'
          ref={textRef}
          key={component.id}
          id={`text${id}`}
          style={{
            fill: textColor,
            fontSize: fontSizeSelect,
            fontWeight: textWeightSelect,
          }}
          width={width}
          height={height}
          textAnchor='middle'
          dominantBaseline='middle'
          x={width / 2}
          y={height / 2}
        >
          {text}
        </text>
      </g>
    </g>
  );
};

export default OComponentRenderer;
