import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { componentsRenderer } from '@src/to-be-organized/node-rendering-stuff/ComponentsRenderer';
import { triggerNodeRerender } from '@store/roadmap-refactor/render/rerender-triggers-nodes';
import { getNodeByIdRoadmapSelector } from '@src/typescript/roadmap_ref/roadmap-data/services/get';
import {
  getOnClickAction,
  getOnMouseOutAction,
  getOnMouseOutActionEdit,
  getOnMouseOverAction,
} from '@src/to-be-organized/node-rendering-stuff/actions-manager';
import { getElementHasEffect } from '@store/roadmap-refactor/elements-editing/store-node-effects';
import { getHideProgress } from '@store/roadmap-refactor/roadmap-data/misc-data/roadmap_state';
import DraggingResizeElement from '@src/to-be-organized/resize-dragging/DraggingResizeElement';
import ConnectionAnchorsRenderer from '@components/roadmap/connections/connection-editing/ConnectionAnchorsRenderer';
import { getEditingState } from '@store/roadmap-refactor/editing/editing-state';
import DragSvg from '@src/UI-library/svg-components/DragSvg';
import { setRoadmapNodeProgressAndFetchUpdate } from '@store/roadmap-refactor/roadmap-data/misc-data/roadmap-progress';
import { getResize } from '@src/to-be-organized/resize-dragging/stores-resize-shared-data';
import {
  useNodeApplyStatusAndEffects,
  useNodeCalculateCoords,
  useNodeData,
  useNodeExternalData,
  useNodeHandleEvents,
  useNodeRuntimeProperties,
  useNodeSideEffects,
  useSelectedConnectionData,
} from '@src/to-be-organized/node-rendering-stuff/node-renderer-hooks';
import { getNodeStatusBarColor } from '@src/to-be-organized/node-rendering-stuff/node-render-logic';
import NodeHOCForeignObject from '@components/roadmap/to-be-organized/NodeHOCForeignObject';
import AsyncLoaderHOC from '@components/roadmap/rendering-engines/async-loading/AsyncLoaderHOC';
import { showContextMenu } from '@components/roadmap/contextmenu/store/ContextMenu';
import { setNotification } from '@components/roadmap/to-be-organized/notifications/notifciations-refr/notification-store-refr';
import { checkIsMobile } from '@hooks/useIsMobile';
import useContextMenuOrLongPress from '@hooks/useContextMenuOrLongPress';

interface NodeViewProps {
  nodeId: string;
  centerOffset: { x: number; y: number };
}

const NodeRendererClassic: React.FC<NodeViewProps> = ({
  nodeId,
  centerOffset,
}) => {
  const node = getNodeByIdRoadmapSelector(nodeId);
  const { editing, scale, isSafari } = useNodeExternalData();

  const handleContextMenuOrLongPress = (event) => {
    event.stopPropagation();
    event.preventDefault();
    if (node.actions.onClick === 'Do nothing') return;

    showContextMenu(
      nodeId,
      `${event.clientX - 16}px`,
      `${event.clientY - 16}px`
    );
  };

  const checkFirstOnClick = () => {
    // check local storage if it's the first time the user clicks on a node
    const firstClick = localStorage.getItem('firstClick');
    if (firstClick !== null) return;
    localStorage.setItem('firstClick', 'true');

    // set in progress
    setRoadmapNodeProgressAndFetchUpdate(nodeId, 'In Progress');
    triggerNodeRerender(nodeId);

    // show notification
    setNotification(
      'tip',
      `To modify progress status, ${
        checkIsMobile() ? 'long-tap' : 'right-click'
      } on the node.`
    );
  };

  const {
    loaded,
    isResizing,
    setIsResizing,
    mouseOver,
    setMouseOver,
    nodeDivRef,
  } = useNodeSideEffects(node);

  const {
    connectionSelectedChildId,
    connectionSelectedParentId,
    currentConnection,
  } = useSelectedConnectionData();

  const nodeDataProcessed = useNodeData(node);
  const {
    width,
    height,
    bgOpacity,
    color,
    borderStyle,
    shadowClass,
    subNodeIds,
    isSubNode,
    opacity,
    isRootNode,
  } = nodeDataProcessed;

  const centeredCoords = useNodeCalculateCoords(node, centerOffset);
  const { isCurrentlyDragged, cursor, isDraggable } =
    useNodeRuntimeProperties(nodeId);

  const { style } = useNodeApplyStatusAndEffects(
    node,
    nodeDivRef,
    nodeDataProcessed,
    centeredCoords,
    loaded
  );

  useNodeHandleEvents(nodeDivRef, nodeId, loaded);

  return (
    <div
      className={isSafari && !isSubNode ? 'fixed origin-center' : ''}
      style={{
        transform: `scale(${isSafari && !isSubNode ? scale : 1})`,
      }}
      {...useContextMenuOrLongPress(handleContextMenuOrLongPress)}
    >
      {getElementHasEffect(nodeId, 'highlight-node') && (
        <div className='z-10  left-1/2 -translate-x-1/2 w-20 h-20 absolute select-none -top-16'>
          <div className='w-full h-full flex justify-center items-center'>
            <DragSvg size={50} />
          </div>
        </div>
      )}

      <div
        onFocus={() => {}}
        onBlur={() => {}}
        className={`rounded-md ${shadowClass} transition-allNoTransform duration-200 absolute  ${cursor}`}
        id={`div${nodeId}`}
        ref={nodeDivRef}
        onClick={(event) => {
          event.stopPropagation();
          if (isResizing || isCurrentlyDragged || getResize()) {
            return;
          }

          checkFirstOnClick();
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
        <AnimatePresence>
          {isDraggable && !isCurrentlyDragged && (mouseOver || isResizing) && (
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
                element={node}
                setResizeCallback={() => {
                  setIsResizing(true);
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {connectionSelectedChildId === nodeId && (
          <ConnectionAnchorsRenderer
            connection={currentConnection}
            nodeId={nodeId}
            type='child'
          />
        )}

        {connectionSelectedParentId === nodeId && (
          <ConnectionAnchorsRenderer
            connection={currentConnection}
            nodeId={nodeId}
            type='parent'
          />
        )}

        {getEditingState() === 'nodes' && <>{componentsRenderer(node)}</>}

        {!editing &&
          !getHideProgress() &&
          node.actions.onClick !== 'Do nothing' && (
            <div
              className={`h-[10px] left-[-2px] top-[-2px] rounded-t-lg absolute select-none ${getNodeStatusBarColor(
                node
              )}`}
              style={{
                opacity: 1,
                width: `${width}px`,
              }}
            />
          )}
        {subNodeIds &&
          subNodeIds.map((subNodeId) => {
            // the div is used to position the subNode in the center of the current node
            return (
              <NodeRendererClassic
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
    </div>
  );
};

export default AsyncLoaderHOC(NodeHOCForeignObject(NodeRendererClassic));
