/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
import React, { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
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
  getElementHasEffect,
  removeHighlightNodeEffects,
} from '@store/roadmap-refactor/elements-editing/element-effects';
import { useIsLoaded } from '@hooks/useIsLoaded';
import { setElementDiv } from '@store/roadmap-refactor/elements-editing/elements-gs';
import { NodeClass } from '@src/typescript/roadmap_ref/node/core/core';
import {
  getHideProgress,
  getIsEditing,
} from '@store/roadmap-refactor/roadmap-data/misc-data/roadmap_state';
import DraggingResizeElement from '@src/to-be-organized/DraggingResizeElement';
import {
  mutateNodeHeightWhileKeepingCenter,
  mutateNodeWidthWhileKeepingCenter,
} from '@src/typescript/roadmap_ref/node/core/data-mutation/mutate';
import { snapNodeWidthHeight } from '@src/typescript/roadmap_ref/snapping/old/core';
import {
  selectNodeColorFromScheme,
  selectNodeColorTextBorder,
} from '@src/typescript/roadmap_ref/node/core/factories/data-mutation/services';
import { getColorThemeFromRoadmap } from '@components/roadmap/pages-roadmap/setup-screen/theme-controler';
import ConnectionAnchorsRenderer from '@components/roadmap/connections/connection-editing/ConnectionAnchorsRenderer';
import { useStore } from '@nanostores/react';
import { getElementIsDraggable } from '@store/roadmap-refactor/elements-editing/draggable-elements';
import { getEditingState } from '@store/roadmap-refactor/editing/editing-state';
import { triggerAllConnectionsRerender } from '@src/typescript/roadmap_ref/render/dragging';
import { useStateTimed } from '@hooks/useStateTimed';
import { deleteAllSnappings } from '@store/roadmap-refactor/render/snapping-lines';
import { useNotification } from '@src/components/roadmap/to-be-organized/notifications/NotificationLogic';
import { handleDragabilityRecalculationOnChunking } from '@src/typescript/roadmap_ref/dragging/misc';
import DragSvg from '@src/UI-library/svg-components/DragSvg';
import scaleSafariStore from '@store/roadmap-refactor/misc/scale-safari-store';
import { useStateWithSideEffects } from '@hooks/useStateWithSideEffects';
import { handleNotification } from './notification-handler';

interface NodeViewProps {
  nodeId: string;
  centerOffset: { x: number; y: number };
  divSizeCallback?: (divRef: React.MutableRefObject<HTMLDivElement>) => void; //
  isSubNode?: boolean;
}

const NodeRendererForeign: React.FC<NodeViewProps> = ({
  nodeId,
  centerOffset,
  divSizeCallback,
  isSubNode = false,
}) => {
  const nodeDivRef = useRef<HTMLDivElement>(null);
  const rerender = useTriggerRerender();
  const childNodeId = useStore(selectedNodeIdChild);
  const parentNodeId = useStore(selectedNodeIdParent);
  const currentConnection = useStore(selectedConnectionId);
  const { scale, isSafari } = useStore(scaleSafariStore);

  const renderNode = (nodeId: string, isSubNode: boolean) => {
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
      // node can change when you apply a template
      setElementEffectsInitialEmpty(nodeId);
      setElementDiv(nodeId, nodeDivRef.current);
      handleDragabilityRecalculationOnChunking(node);

      if (loaded) {
        triggerAllConnectionsRerender();
      }
    }, [node]);

    useEffect(() => {
      if (node.flags.renderedOnRoadmapFlag) return;
      setTriggerRender(node.id, rerender);
    }, []);

    const [mouseOver, setMouseOver] = useStateWithSideEffects(false, () => {
      if (getElementHasEffect(nodeId, 'highlight-node')) {
        removeHighlightNodeEffects(nodeId);
      }
    });
    const [resizing, setResizing] = useStateTimed(false, 500, () => {
      deleteAllSnappings();
    });

    function getNodeOpacity(node: NodeClass) {
      return node.data.opacity / 100;
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

    const borderColor = selectNodeColorTextBorder(
      getColorThemeFromRoadmap(),
      colorType
    );

    const borderStyle =
      borderColor === 'none'
        ? `2px solid ${color}`
        : `2px solid ${borderColor}`;

    const style = {
      // color: textColor,
      backgroundColor: `rgba(${parseInt(color.slice(1, 3), 16)}, ${parseInt(
        color.slice(3, 5),
        16
      )}, ${parseInt(color.slice(5, 7), 16)}, ${bgOpacity})`, // assuming color is in #RRGGBB format
      width,
      height,
      top: calculatedOffsetCoords.y + coords.y,
      left: calculatedOffsetCoords.x + coords.x,
      opacity: `${getNodeOpacity(node)}`,
      border: borderStyle,
    };

    const applyStyle = () => {
      if (!nodeDivRef.current) return;
      const element = nodeDivRef.current;
      Object.assign(element.style, style);
    };

    afterEventLoop(() => {
      // runs all the effects after the node is rendered
      applyStyle();
      loaded && !getIsEditing() && appendNodeMarkAsDone(node);
      getIsEditing() && deleteStatusEffectAll(nodeId);
      if (!nodeDivRef.current) return;
      loaded && applyElementEffects(nodeId);
    });

    const isDraggable = getElementIsDraggable(nodeId);
    // const isRoot = node.flags.renderedOnRoadmapFlag;
    const isCurrentlyDragged = getElementHasEffect(
      nodeId,
      'dragging-recursive'
    );

    const { addNotification } = useNotification();

    const cursor = isCurrentlyDragged ? 'cursor-grab' : 'cursor-pointer';
    return (
      <div
        className={isSafari && !isSubNode ? 'fixed origin-center' : ''}
        style={{
          transform: `scale(${isSafari && !isSubNode ? scale : 1})`,
        }}
      >
        {getElementHasEffect(nodeId, 'highlight-node') && (
          <div className='z-10  left-1/2 -translate-x-1/2 w-20 h-20 absolute select-none -top-16'>
            <div className='w-full h-full flex justify-center items-center'>
              <DragSvg size={50} />
            </div>
          </div>
        )}
        {isCurrentlyDragged && handleNotification(addNotification)}
        <div
          className={`rounded-lg shadow-lg transition-allNoTransform duration-200 absolute ${cursor}`}
          id={`div${nodeId}`}
          ref={nodeDivRef}
          onClick={(event) => {
            event.stopPropagation();
            getOnClickAction(nodeId)();
            // if (nodeId === '0') {
            //   setDeleteRootNodeNotificationTrue();
            // } else {
            //   setDeleteRootNodeNotificationFalse();
            // }
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
          <AnimatePresence>
            {isDraggable && !isCurrentlyDragged && (mouseOver || resizing) && (
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

          {!editing && !getHideProgress() && (
            <div
              className={`h-3 left-0 top-0 rounded-t-lg absolute select-none ${getStatusCircleStyle(
                node
              )}`}
              style={{
                opacity: 1,
                // top: `${calculatedOffsetCoords.y + coords.y - 3}px`,
                // left: `${calculatedOffsetCoords.x + coords.x}px`,
                width: `${width}px`,
              }}
            />
          )}
          {subNodeIds &&
            subNodeIds.map((subNodeId) => {
              // the div is used to position the subNode in the center of the current node
              return (
                <NodeRendererForeign
                  key={subNodeId}
                  nodeId={subNodeId}
                  centerOffset={{
                    x: node.data.width / 2,
                    y: node.data.height / 2,
                  }}
                  isSubNode
                />
              );
            })}
        </div>
      </div>
    );
  };

  // @ts-ignore
  return renderNode(nodeId, isSubNode);
};
export default NodeRendererForeign;
