/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  getOnMouseOutActionEdit,
  getOnClickAction,
  getOnMouseOutAction,
  getOnMouseOverAction,
} from '@src/to-be-organized/nodeview/actions-manager';
import { afterEventLoop } from '@src/typescript/utils/misc';
import { useTriggerRerender } from '@hooks/useTriggerRerender';
import {
  setTriggerRender,
  triggerNodeRerender,
} from '@store/roadmap-refactor/render/rerender-triggers-nodes';
import {
  getNodeAdjacentNodesIds,
  getNodeByIdRoadmapSelector,
  getRootNodesIds,
} from '@src/typescript/roadmap_ref/roadmap-data/services/get';
import {
  getElementHasEffect,
  setElementEffectsInitialEmpty,
} from '@store/roadmap-refactor/elements-editing/element-effects';
import { useIsLoaded } from '@hooks/useIsLoaded';
import { getEditingState } from '@store/roadmap-refactor/editing/editing-state';
import OComponentRenderer from '@components/roadmap/rendering-engines/optimized/components/OComponentRenderer';
import {
  selectNodeColorFromScheme,
  selectNodeColorTextBorder,
} from '@src/typescript/roadmap_ref/node/core/factories/data-mutation/services';
import { getColorThemeFromRoadmap } from '@components/roadmap/pages-roadmap/setup-screen/theme-controler';
import { AnimatePresence, motion } from 'framer-motion';
import DraggingResizeElement from '@src/to-be-organized/DraggingResizeElement';
import {
  mutateNodeHeightWhileKeepingCenter,
  mutateNodeWidthWhileKeepingCenter,
} from '@src/typescript/roadmap_ref/node/core/data-mutation/mutate';
import { triggerAllConnectionsRerender } from '@src/typescript/roadmap_ref/render/dragging';
import { snapNodeWidthHeight } from '@src/typescript/roadmap_ref/snapping/old/core';
import { getElementIsDraggable } from '@store/roadmap-refactor/elements-editing/draggable-elements';
import { useStateTimed } from '@hooks/useStateTimed';
import { deleteAllSnappings } from '@store/roadmap-refactor/render/snapping-lines';
import {
  setDeleteRootNodeNotificationFalse,
  setDeleteRootNodeNotificationTrue,
} from '@src/to-be-organized/nodeview/notification-store';

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

  const colorTheme = useMemo(() => {
    return getColorThemeFromRoadmap();
  }, []);

  const borderColor = selectNodeColorTextBorder(colorTheme, colorType);
  const nodeColor = selectNodeColorFromScheme(colorTheme, colorType);

  const isDraggable = getElementIsDraggable(nodeId);
  const isCurrentlyDragged = getElementHasEffect(nodeId, 'dragging-recursive');

  const [mouseOver, setMouseOver] = useState(false);
  const [resizing, setResizing] = useStateTimed(false, 500, () => {
    deleteAllSnappings();
  });

  console.log('rerender node', isDraggable, !isCurrentlyDragged, resizing);

  const rectRef = useRef(null);
  return (
    <g transform={`translate(${x}, ${y})`}>
      <rect
        className='transition-allNoTransform duration-200'
        width={width}
        height={height}
        ref={rectRef}
        fill={`${nodeColor}`}
        opacity='1'
        stroke={`${borderColor}`}
        strokeWidth='2px'
        rx='7px'
        ry='7px'
        filter='url(#shadow)'
        onClick={(event) => {
          event.stopPropagation();
          getOnClickAction(nodeId)();
          if (nodeId === '0') {
            setDeleteRootNodeNotificationTrue();
          } else {
            setDeleteRootNodeNotificationFalse();
          }
        }}
        onMouseOver={(event) => {
          event.stopPropagation();
          getOnMouseOverAction(nodeId)();
          setMouseOver(true);
          triggerNodeRerender(nodeId);
          console.log('mouse over');
        }}
      />

      {mouseOver && (
        <foreignObject
          width={width + 30}
          height={height + 30}
          className='pointer-events-auto relative z-10 border-2 border-red-500'
          x={-15}
          y={-15}
          onMouseLeave={() => {
            getOnMouseOutActionEdit(nodeId)();
            setMouseOver(false);
            console.log('mouse leave');
          }}
          onMouseOut={(event) => {
            event.stopPropagation();
            getOnMouseOutAction(nodeId)();
            setMouseOver(false);
            console.log('mouse out');
          }}
        >
          {isDraggable && !isCurrentlyDragged && (mouseOver || resizing) && (
            <AnimatePresence>
              <motion.div
                className=' w-full h-full absolute top-0 left-0'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <DraggingResizeElement
                  style={{
                    width,
                    height,
                  }}
                  heightCallback={(height) => {
                    mutateNodeHeightWhileKeepingCenter(node, height);
                    triggerNodeRerender(nodeId);
                    triggerAllConnectionsRerender();
                  }}
                  widthCallback={(width) => {
                    mutateNodeWidthWhileKeepingCenter(node, width);
                    triggerNodeRerender(nodeId);
                    triggerAllConnectionsRerender();
                  }}
                  snappingCallback={(width, height) => {
                    setResizing(true);
                    const rootNode = node.flags.renderedOnRoadmapFlag;
                    const nodesToSnapTo = rootNode
                      ? getRootNodesIds()
                      : getNodeAdjacentNodesIds(nodeId);
                    // snapping node corners ( ͡° ͜ʖ ͡°) so width and height will also snap I hope
                    const { width: newWidth, height: newHeight } =
                      snapNodeWidthHeight(
                        node.id,
                        nodesToSnapTo,
                        width,
                        height
                      );
                    return {
                      width: newWidth,
                      height: newHeight,
                    };
                  }}
                />
              </motion.div>
            </AnimatePresence>
          )}
        </foreignObject>
      )}

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
