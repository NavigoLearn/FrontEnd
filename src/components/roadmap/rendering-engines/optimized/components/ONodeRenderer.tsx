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
  applyElementEffects,
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
  setElementG,
  setElementRect,
} from '@store/roadmap-refactor/elements-editing/elements-gs';
import { NodeClass } from '@src/typescript/roadmap_ref/node/core/core';
import { ICoords } from '@src/typescript/roadmap_ref/dragging/core';
import { getIsEditable } from '@store/roadmap-refactor/roadmap-data/misc-data/roadmap_state';

const handleCoordCalculation = (node: NodeClass, centerOffset: ICoords) => {
  const { width, height } = node.data;
  const { subNodeFlag } = node.flags;
  const isOnRoadmap = node.flags.renderedOnRoadmapFlag;

  const coords = {
    x: subNodeFlag ? node.data.coords.x : 0,
    y: subNodeFlag ? node.data.coords.y : 0,
  };

  const centeringOffsetCoords = {
    x: centerOffset.x - width / 2,
    y: centerOffset.y - height / 2,
  };

  if (node.flags.renderedOnRoadmapFlag) {
    // we dont center the nodes rendered directly on the roadmap
    centeringOffsetCoords.x = 0;
    centeringOffsetCoords.y = 0;
  }

  const x = isOnRoadmap
    ? node.data.coords.x
    : centeringOffsetCoords.x + coords.x;
  const y = isOnRoadmap
    ? node.data.coords.y
    : centeringOffsetCoords.y + coords.y;

  return { x, y };
};

const useHandleNodeInitialization = (node: NodeClass) => {
  const nodeId = node.id;

  const nodeGRef = useRef<SVGGElement>(null);
  const nodeRectRef = useRef<SVGRectElement>(null);
  const rerender = useTriggerRerender();

  useEffect(() => {
    setElementEffectsInitialEmpty(nodeId);
    setElementG(nodeId, nodeGRef.current);
    setElementRect(nodeId, nodeRectRef.current);
  }, []);

  useEffect(() => {
    setTriggerRender(node.id, rerender);
  }, []);

  return { nodeGRef, nodeRectRef };
};

function handleGetNodeProperties(node: NodeClass) {
  const { width, height, opacity, colorType } = node.data;
  const colorTheme = useMemo(() => {
    return getColorThemeFromRoadmap();
  }, []);
  const borderColor = selectNodeColorTextBorder(colorTheme, colorType);
  const nodeColor = selectNodeColorFromScheme(colorTheme, colorType);

  return { width, height, opacity, colorType, borderColor, nodeColor };
}

function handleMouseOverAndDragging(nodeId: string) {
  const isDraggable = getElementIsDraggable(nodeId);
  const isCurrentlyDragged = getElementHasEffect(nodeId, 'dragging-recursive');

  const [mouseOver, setMouseOver] = useState(false);

  const mouseLeaveProtocol = () => {
    getOnMouseOutActionEdit(nodeId)();
    setMouseOver(false);
  };

  const [resizing, setResizing] = useStateTimed(false, 500, () => {
    deleteAllSnappings();
    mouseLeaveProtocol();
  });

  return {
    isDraggable,
    isCurrentlyDragged,
    mouseOver,
    setMouseOver,
    mouseLeaveProtocol,
    resizing,
    setResizing,
  };
}

interface NodeViewProps {
  nodeId: string;
  centerOffset: { x: number; y: number };
}

const ONodeRenderer: React.FC<NodeViewProps> = ({ nodeId, centerOffset }) => {
  const node = getNodeByIdRoadmapSelector(nodeId);
  const loaded = useIsLoaded();

  const { x, y } = handleCoordCalculation(node, centerOffset);
  const { nodeGRef, nodeRectRef } = useHandleNodeInitialization(node);

  const { width, height, opacity, borderColor, nodeColor } =
    handleGetNodeProperties(node);

  const applyStyle = () => {
    if (!nodeRectRef.current) return;
    if (!nodeGRef.current) return;

    nodeRectRef.current.setAttribute('fill', nodeColor);
    nodeRectRef.current.setAttribute('stroke', borderColor);

    nodeGRef.current.setAttribute('opacity', `${opacity}`);
  };

  afterEventLoop(() => {
    // runs all the effects after the node is rendered
    applyStyle();
    // loaded && !getIsEditing() && appendNodeMarkAsDone(node);
    // getIsEditing() && deleteStatusEffectAll(nodeId);
    if (!nodeRectRef.current) return;
    loaded && applyElementEffects(nodeId);
  });

  const {
    isDraggable,
    isCurrentlyDragged,
    mouseOver,
    setMouseOver,
    mouseLeaveProtocol,
    resizing,
    setResizing,
  } = handleMouseOverAndDragging(nodeId);

  const isView = !getIsEditable();

  return (
    <g transform={`translate(${x}, ${y})`}>
      <g
        id={`g${nodeId}`} // used to identify nodes in dragging
        ref={nodeGRef}
        className={`transition-allNoTransform duration-200 ${
          !!isView && 'cursor-pointer'
        }`}
        onMouseOver={(event) => {
          event.stopPropagation();
          getOnMouseOverAction(nodeId)();
          setMouseOver(true);
          triggerNodeRerender(nodeId);
        }}
        onClick={(e) => {
          e.stopPropagation();
          const action = getOnClickAction(nodeId);
          action();
        }}
        onMouseOut={() => {
          if (resizing) return;
          mouseLeaveProtocol();
        }}
      >
        <rect
          className='transition-allNoTransform duration-200'
          width={width}
          height={height}
          ref={nodeRectRef}
          fill={`${nodeColor}`}
          opacity='1'
          stroke={`${borderColor}`}
          strokeWidth='2px'
          rx='7px'
          ry='7px'
          filter='url(#shadow)'
        />

        <AnimatePresence>
          {!!mouseOver && !isView && (
            <motion.foreignObject
              width={width + 30}
              height={height + 30}
              className='pointer-events-auto relative z-10'
              x={-15}
              y={-15}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {isDraggable &&
                !isCurrentlyDragged &&
                (mouseOver || resizing) && (
                  <motion.div className='pointer-events-none w-full h-full absolute top-[15px] left-[15px]'>
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
                )}
            </motion.foreignObject>
          )}
        </AnimatePresence>

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
        {node.subNodeIds &&
          node.subNodeIds.map((subNodeId) => {
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
    </g>
  );
};
export default ONodeRenderer;
