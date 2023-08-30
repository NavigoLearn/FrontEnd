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
import DraggingResizeElement from '@src/to-be-organized/DraggingResizeElement';
import {
  mutateComponentTextHeight,
  mutateComponentTextWidth,
} from '@src/typescript/roadmap_ref/node/components/text/mutate';
import { triggerNodeRerender } from '@store/roadmap-refactor/render/rerender-triggers-nodes';
import { tailwindTransitionClass } from '@src/UI-library/tailwind-utils';
import { getNodeByIdRoadmapSelector } from '@src/typescript/roadmap_ref/roadmap-data/services/get';
import {
  getIsEditable,
  getIsEditing,
} from '@store/roadmap-refactor/roadmap-data/roadmap_state';
import editorSelectedData, {
  getSelectedNodeId,
} from '@store/roadmap-refactor/elements-editing/editor-selected-data';
import displayManagerStore from '@store/roadmap-refactor/display/display-manager';

type IComponentElementProps = {
  component: IComponentObject;
  position: { x: number; y: number };
  parentNode: NodeClass;
};

const ComponentRenderer = ({
  component,
  position,
  parentNode,
}: IComponentElementProps) => {
  const { id, type, width, height, textSize, textWeight, text } = component;
  const { colorType } = parentNode.data;
  const objRef = useRef(null);
  // text color is based on the node color
  const theme = getColorThemeFromRoadmap();
  const parentSelected =
    getSelectedNodeId() === parentNode.id &&
    getIsEditable() &&
    displayManagerStore.get().type !== 'closed';
  const textColor = selectNodeColorText(theme, colorType);

  const textWeightSelect = selectTextFontWeight(textWeight);

  const fontSizeSelect = selectTextFontSize(textSize);
  // console.log(component.textSize);
  // font weight and font size will per component and be ni the component itself

  console.log('parent selected', text);

  return (
    <div
      ref={objRef}
      key={component.id}
      id={`div${id}`}
      className={`absolute flex justify-center items-center select-none border-2 pointer-events-auto ${
        parentSelected && 'border-black'
      } transition-allNoTransform`}
      style={{
        color: textColor,
        fontSize: fontSizeSelect,
        fontWeight: textWeightSelect,
        textAlign: 'center',
        width: `${width}px`,
        height: `${height}px`,
        top: `${position.y}px`,
        left: `${position.x}px`,
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
            const parentHeight = getNodeByIdRoadmapSelector(parentNode.id).data
              .height;
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
      {type === 'Text' && <h1 className='text-center select-none'>{text}</h1>}
      {/* Add more conditions for other component types */}
    </div>
  );
};

export const componentsRenderer = (node: NodeClass) => {
  const { components, data } = node;
  const positions = calculateComponentsPositions(node);

  return (
    <div className='components-container select-none'>
      {components.map((component, index) => {
        return (
          <ComponentRenderer
            key={component.id}
            component={component}
            position={positions[index]}
            parentNode={node}
          />
        );
      })}
    </div>
  );
};
