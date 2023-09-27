import React, { useRef } from 'react';
import { calculateComponentsPositions } from '@src/to-be-organized/node-rendering-stuff/logic';
import { NodeClass } from '@src/typescript/roadmap_ref/node/core/core';
import { type IComponentObject } from '@type/roadmap/node/components-types';
import {
  selectNodeColorText,
  selectTextFontWeight,
  selectTextFontSize,
  transformOpacity,
} from '@src/typescript/roadmap_ref/node/core/factories/data-mutation/services';
import { getColorThemeFromRoadmap } from '@components/roadmap/pages-roadmap/setup-screen/theme-controler';
import DraggingResizeElement from '@src/to-be-organized/resize-dragging/DraggingResizeElement';
import { mutateComponentTextHeight } from '@src/typescript/roadmap_ref/node/components/text/mutate';
import { getIsEditable } from '@store/roadmap-refactor/roadmap-data/misc-data/roadmap_state';
import { getSelectedNodeId } from '@store/roadmap-refactor/elements-editing/store-editor-selected-data';
import storeDisplayManager from '@store/roadmap-refactor/display/display-manager';
import { hexAddAlpha } from '@src/typescript/roadmap_ref/utils';

type IComponentElementProps = {
  component: IComponentObject;
  parentNode: NodeClass;
};

const ComponentRendererForeign = ({
  component,
  parentNode,
}: IComponentElementProps) => {
  const {
    id: idData,
    type: typeData,
    textSize: textSizeData,
    textWeight: textWeightData,
    text: textData,
    opacity: opacityData,
  } = component;

  // ensure everything is not null
  const id = idData ?? '';
  const type = typeData ?? 'Text';
  const textSize = textSizeData ?? 'normal';
  const textWeight = textWeightData ?? 'normal';
  const text = textData ?? '';
  const opacity = opacityData ?? 100;

  const { colorType } = parentNode.data;
  const divRef = useRef<HTMLDivElement>(null);
  // text color is based on the node color
  const theme = getColorThemeFromRoadmap();
  const parentSelected =
    getSelectedNodeId() === parentNode.id &&
    getIsEditable() &&
    storeDisplayManager.get().type !== 'closed';
  const textColor = selectNodeColorText(theme, colorType);

  const textWeightSelect = selectTextFontWeight(textWeight);

  const fontSizeSelect = selectTextFontSize(textSize);

  const opacityFiltered = transformOpacity(opacity);

  const {
    position: positionData,
    height: heightData,
    width: widthData,
  } = calculateComponentsPositions(component, parentNode, {
    type: 'foreign-object',
    divRef,
  });

  // ensure values are not null
  const position = positionData ?? { x: 0, y: 0 };
  const width = widthData ?? 150;
  const height = heightData ?? 50;

  mutateComponentTextHeight(component, height);

  return (
    <div
      ref={divRef}
      key={component.id}
      id={`div${id}`}
      className={`absolute flex justify-center items-center select-none font-roboto-text ${
        parentSelected ? 'pointer-events-auto' : 'pointer-events-none'
      } ${parentSelected && 'border-opacity-100'} transition-allNoTransform`}
      style={{
        color: `${hexAddAlpha(textColor, opacityFiltered)}`,
        fontSize: fontSizeSelect,
        fontWeight: textWeightSelect,
        textAlign: 'center',
        width: `${width}px`,
        // height: `${height}px`, the height is inferred from the inside divs that scale with the text
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
          onlyXaxis
          element={component}
          setResizeCallback={() => {}}
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
          <ComponentRendererForeign
            key={component.id}
            component={component}
            parentNode={node}
          />
        );
      })}
    </div>
  );
};
