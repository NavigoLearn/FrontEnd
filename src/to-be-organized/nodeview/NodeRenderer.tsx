/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
import React, { useEffect, useRef, Component, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { afterEventLoop } from '@src/typescript/utils/misc';
import { componentsRenderer } from '@src/to-be-organized/nodeview/ComponentsRenderer';
import { useTriggerRerender } from '@hooks/useTriggerRerender';
import {
  selectedConnectionId,
  selectedNodeIdChild,
  selectedNodeIdParent,
} from '@components/roadmap/connections/connection-editing/connection-store';
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
  getOnClickAction,
  getOnMouseOutAction,
  getOnMouseOutActionEdit,
  getOnMouseOverAction,
} from '@src/to-be-organized/nodeview/actions-manager';
import {
  appendStatusEffect,
  applyElementEffects,
  setElementEffectsInitialEmpty,
  deleteStatusEffectAll,
  elementEffects,
} from '@store/roadmap-refactor/elements-editing/element-effects';
import { useIsLoaded } from '@hooks/useIsLoaded';
import { setElementDiv } from '@store/roadmap-refactor/elements-editing/elements-divs';
import { NodeClass } from '@src/typescript/roadmap_ref/node/core/core';
import { getIsEditing } from '@store/roadmap-refactor/roadmap-data/roadmap_state';
import DraggingResizeElement from '@src/to-be-organized/DraggingResizeElement';
import {
  mutateNodeHeightWhileKeepingCenter,
  mutateNodeWidthWhileKeepingCenter,
} from '@src/typescript/roadmap_ref/node/core/data-mutation/mutate';
import { snapNodeWidthHeight } from '@src/typescript/roadmap_ref/snapping/core';
import { selectNodeColorFromScheme } from '@src/typescript/roadmap_ref/node/core/factories/data-mutation/services';
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

interface NodeViewProps {
  nodeId: string;
  centerOffset: { x: number; y: number };
  divSizeCallback?: (divRef: React.MutableRefObject<HTMLDivElement>) => void; //
}

const NodeRenderer: React.FC<NodeViewProps> = ({
  nodeId,
  centerOffset,
  divSizeCallback,
}) => {
  const nodeDivRef = useRef<HTMLDivElement>(null);
  const rerender = useTriggerRerender();
  const childNodeId = useStore(selectedNodeIdChild);
  const parentNodeId = useStore(selectedNodeIdParent);
  const currentConnection = useStore(selectedConnectionId);

  const renderNode = (nodeId: string) => {
    const loaded = useIsLoaded();
    const node = getNodeByIdRoadmapSelector(nodeId);
    const { width, height, opacity, colorType } = node.data;
    node.data.center.x = width / 2;
    const { subNodeIds } = node;
    // Function to render each subnode

    const { flags } = node;
    const { subNodeFlag } = flags;

    const editing = getIsEditing();
    // the offset for the nodes-page rendered directly on the roadmap is calculated directly
    // on its group and foreign object in NodeManager. This is why you need to treat the coords
    // from subNodes which don't have their own foreign object and are divs relative to the parent node

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

    divSizeCallback &&
      setTimeout(() => {
        divSizeCallback(nodeDivRef);
      }, 0);

    useEffect(() => {
      setElementEffectsInitialEmpty(nodeId);
      setElementDiv(nodeId, nodeDivRef.current);
    }, []);

    useEffect(() => {
      if (node.flags.renderedOnRoadmapFlag) return;
      setTriggerRender(node.id, rerender);
    }, []);

    const [mouseOver, setMouseOver] = useState(false);
    const [resizing, setResizing] = useStateTimed(false, 500, () => {
      deleteAllSnappings();
    });

    function getNodeOpacity(node: NodeClass) {
      const editing = getIsEditing();
      if (editing) return 1;
      return node.properties.markAsDone ? 0.35 : 1;
    }

    function appendNodeMarkAsDone(node: NodeClass) {
      if (editing) return;
      if (node.properties.markAsDone !== undefined) {
        // adds proper effects
        const attachment = node.attachments[0];
        const { status } = attachment;
        if (status === 'Completed') {
          appendStatusEffect(nodeId, 'mark-as-completed');
        }
        if (status === 'In Progress') {
          appendStatusEffect(nodeId, 'mark-as-progress');
        }
        if (status === 'Skip') {
          appendStatusEffect(nodeId, 'mark-as-skipped');
        }
        if (status === 'Status') {
          appendStatusEffect(nodeId, 'mark-as-status');
        }
      }
    }

    function getStatusCircleStyle(node: NodeClass) {
      const statusCircleBgColor = {
        Status: 'bg-transparent',
        'In Progress': 'bg-yellow-400',
        Completed: 'bg-green-400',
        Skip: 'bg-gray-400',
      };
      const attachment = node.attachments[0];
      const { status } = attachment;
      return statusCircleBgColor[status];
    }

    const bgOpacity = opacity / 100;

    const color = selectNodeColorFromScheme(
      getColorThemeFromRoadmap(),
      colorType
    );

    const style = {
      // color: textColor,
      backgroundColor: `rgba(${parseInt(color.slice(1, 3), 16)}, ${parseInt(
        color.slice(3, 5),
        16
      )}, ${parseInt(color.slice(5, 7), 16)}, ${bgOpacity})`, // assuming color is in #RRGGBB format
      width: `${width}px`,
      height: `${height}px`,
      top: `${calculatedOffsetCoords.y + coords.y}px`,
      left: `${calculatedOffsetCoords.x + coords.x}px`,
      opacity: `${getNodeOpacity(node)}`,
      border: '2px solid transparent',
    };

    const applyStyle = () => {
      const element = nodeDivRef.current;
      Object.assign(element.style, style);
    };

    afterEventLoop(() => {
      // runs all the effects after the node is rendered
      applyStyle();
      // loaded && !getIsEditing() && appendNodeMarkAsDone(node);
      // getIsEditing() && deleteStatusEffectAll(nodeId);
      loaded && applyElementEffects(nodeId, nodeDivRef.current);
    });

    const isDraggable = getElementIsDraggable(nodeId);
    const isRoot = node.flags.renderedOnRoadmapFlag;
    return (
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/mouse-events-have-key-events,jsx-a11y/no-static-element-interactions
      <div
        className={`drop-shadow-md rounded-lg transition-allNoTransform duration-200 absolute `}
        id={`div${nodeId}`}
        ref={nodeDivRef}
        onClick={(event) => {
          event.stopPropagation();
          getOnClickAction(nodeId)();
        }}
        onMouseOver={(event) => {
          event.stopPropagation();
          getOnMouseOverAction(nodeId)();
          setMouseOver(true);
          triggerNodeRerender(nodeId);
        }}
        onMouseLeave={() => {
          getOnMouseOutActionEdit(nodeId)();
          setMouseOver(false);
        }}
        onMouseOut={(event) => {
          event.stopPropagation();
          getOnMouseOutAction(nodeId)();
          setMouseOver(false);
        }}
        style={style}
      >
        {!editing && (
          <div
            className={`w-8 h-8 -left-4 -top-4 absolute rounded-full select-none ${getStatusCircleStyle(
              node
            )}`}
          />
        )}
        <AnimatePresence>
          {isDraggable && (mouseOver || resizing) && (
            <motion.div
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
                    snapNodeWidthHeight(node.id, nodesToSnapTo, width, height);
                  return {
                    width: newWidth,
                    height: newHeight,
                  };
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {childNodeId === nodeId && (
          <ConnectionAnchorsRenderer
            connection={currentConnection}
            nodeId={nodeId}
            type='child'
          />
        )}

        {parentNodeId === nodeId && (
          <ConnectionAnchorsRenderer
            connection={currentConnection}
            nodeId={nodeId}
            type='parent'
          />
        )}

        {getEditingState() === 'nodes' && <>{componentsRenderer(node)}</>}
        {subNodeIds &&
          subNodeIds.map((subNodeId) => {
            // the div is used to position the subNode in the center of the current node
            return (
              <NodeRenderer
                key={subNodeId}
                nodeId={subNodeId}
                centerOffset={{
                  x: node.data.width / 2,
                  y: node.data.height / 2,
                }}
              />
            );
          })}
      </div>
    );
  };

  // @ts-ignore
  return renderNode(nodeId);
};
export default NodeRenderer;
