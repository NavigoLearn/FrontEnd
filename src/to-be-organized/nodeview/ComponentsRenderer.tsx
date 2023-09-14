import React, { useEffect, useRef } from 'react';
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
} from '@store/roadmap-refactor/roadmap-data/misc-data/roadmap_state';
import editorSelectedData, {
  getSelectedNodeId,
} from '@store/roadmap-refactor/elements-editing/editor-selected-data';
import displayManagerStore from '@store/roadmap-refactor/display/display-manager';

type IComponentElementProps = {
  component: IComponentObject;
  parentNode: NodeClass;
};

const ComponentRenderer = ({
  component,
  parentNode,
}: IComponentElementProps) => {
  const { id, type, textSize, textWeight, text } = component;
  const { colorType } = parentNode.data;
  const divRef = useRef<HTMLDivElement>(null);
  // text color is based on the node color
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
    {
      type: 'foreign-object',
      textRef: divRef,
    }
  );
  mutateComponentTextHeight(component, height);

  return (
    <div
      ref={divRef}
      key={component.id}
      id={`div${id}`}
      className={`absolute flex justify-center items-center select-none pointer-events-auto ${
        parentSelected && 'border-opacity-100'
      } transition-allNoTransform`}
      style={{
        color: textColor,
        fontSize: fontSizeSelect,
        fontWeight: textWeightSelect,
        textAlign: 'center',
        width: `${width}px`,
        // height: `${height}px`,
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
    </div>
  );
};

export const componentsRenderer = (node: NodeClass) => {
  const { components, data } = node;

  return (
    <div className='components-container select-none'>
      {components.map((component, index) => {
        return (
          <ComponentRenderer
            key={component.id}
            component={component}
            parentNode={node}
          />
        );
      })}
    </div>
  );
};
