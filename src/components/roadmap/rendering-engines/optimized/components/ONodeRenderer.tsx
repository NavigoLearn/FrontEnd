/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from 'react';
import { afterEventLoop } from '@src/typescript/utils/misc';
import { useTriggerRerender } from '@hooks/useTriggerRerender';
import {
  setTriggerRender,
  triggerNodeRerender,
} from '@store/roadmap-refactor/render/rerender-triggers-nodes';
import { getNodeByIdRoadmapSelector } from '@src/typescript/roadmap_ref/roadmap-data/services/get';
import {
  getOnClickAction,
  getOnMouseOutAction,
  getOnMouseOutActionEdit,
  getOnMouseOverAction,
} from '@src/to-be-organized/nodeview/actions-manager';
import {
  appendStatusEffect,
  setElementEffectsInitialEmpty,
  getElementHasEffect,
} from '@store/roadmap-refactor/elements-editing/element-effects';
import { useIsLoaded } from '@hooks/useIsLoaded';
import { setElementDiv } from '@store/roadmap-refactor/elements-editing/elements-divs';
import { NodeClass } from '@src/typescript/roadmap_ref/node/core/core';
import {
  getIsEditable,
  getIsEditing,
} from '@store/roadmap-refactor/roadmap-data/misc-data/roadmap_state';
import {
  selectNodeColorFromScheme,
  selectNodeColorTextBorder,
} from '@src/typescript/roadmap_ref/node/core/factories/data-mutation/services';
import { getColorThemeFromRoadmap } from '@components/roadmap/pages-roadmap/setup-screen/theme-controler';
import ConnectionAnchorsRenderer from '@components/roadmap/connections/connection-editing/ConnectionAnchorsRenderer';
import { useStore } from '@nanostores/react';
import draggableElements, {
  getElementIsDraggable,
} from '@store/roadmap-refactor/elements-editing/draggable-elements';
import { getEditingState } from '@store/roadmap-refactor/editing/editing-state';
import { triggerAllConnectionsRerender } from '@src/typescript/roadmap_ref/render/dragging';
import { useStateTimed } from '@hooks/useStateTimed';
import { deleteAllSnappings } from '@store/roadmap-refactor/render/snapping-lines';
import { useNotification } from '@src/components/roadmap/to-be-organized/notifications/NotificationLogic';
import OComponentRenderer from '@components/roadmap/rendering-engines/optimized/components/OComponentRenderer';

interface NodeViewProps {
  nodeId: string;
  centerOffset: { x: number; y: number };
}

const ONodeRenderer: React.FC<NodeViewProps> = ({ nodeId, centerOffset }) => {
  const rerender = useTriggerRerender();
  const loaded = useIsLoaded();
  const node = getNodeByIdRoadmapSelector(nodeId);
  const { width, height, opacity, colorType } = node.data;
  node.data.center.x = width / 2;
  const { subNodeIds } = node;
  // Function to render each subnode

  const { flags } = node;
  const { subNodeFlag } = flags;

  const coords = {
    x: subNodeFlag ? node.data.coords.x : 0,
    y: subNodeFlag ? node.data.coords.y : 0,
  };

  const calculatedOffsetCoords = {
    x: centerOffset.x - width / 2,
    y: centerOffset.y - height / 2,
  };

  if (node.flags.renderedOnRoadmapFlag) {
    calculatedOffsetCoords.x = 0;
    calculatedOffsetCoords.y = 0;
  }

  useEffect(() => {
    setElementEffectsInitialEmpty(nodeId);
  }, []);

  useEffect(() => {
    if (node.flags.renderedOnRoadmapFlag) return;
    setTriggerRender(node.id, rerender);
  }, []);

  const applyStyle = () => {
    // if (!nodeRectRef.current) return;
    // const element = nodeRectRef.current;
    // Object.assign(element.style, style);
  };

  afterEventLoop(() => {
    // runs all the effects after the node is rendered
    applyStyle();
    // loaded && !getIsEditing() && appendNodeMarkAsDone(node);
    // getIsEditing() && deleteStatusEffectAll(nodeId);
    // if (!nodeDivRef.current) return;
    // loaded && applyElementEffects(nodeId, nodeDivRef.current);
  });

  // ... other relevant properties
  const isOnRoadmap = node.flags.renderedOnRoadmapFlag;

  const x = isOnRoadmap
    ? node.data.coords.x
    : calculatedOffsetCoords.x + coords.x;
  const y = isOnRoadmap
    ? node.data.coords.y
    : calculatedOffsetCoords.y + coords.y;

  return (
    <g transform={`translate(${x}, ${y})`}>
      <rect
        width={width}
        height={height}
        fill='white'
        opacity='1'
        stroke={}
        stroke
        onClick={(event) => {
          event.stopPropagation();
          getOnClickAction(nodeId)();
        }}
        onMouseOver={(event) => {
          event.stopPropagation();
          getOnMouseOverAction(nodeId)();
        }}
        onMouseOut={(event) => {
          event.stopPropagation();
          getOnMouseOutAction(nodeId)();
        }}
      />
      {getEditingState() === 'nodes' &&
        node.components.map((component) => {
          return (
            <OComponentRenderer
              key={component.id}
              component={component}
              parentNode={node}
            />
          );
        })}
      {subNodeIds &&
        subNodeIds.map((subNodeId) => {
          // the div is used to position the subNode in the center of the current node
          return (
            <ONodeRenderer
              key={subNodeId}
              nodeId={subNodeId}
              centerOffset={{
                x: node.data.width / 2,
                y: node.data.height / 2,
              }}
            />
          );
        })}
    </g>
  );
};
export default ONodeRenderer;
