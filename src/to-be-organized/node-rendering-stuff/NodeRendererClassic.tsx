import React, { useRef, useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { componentsRenderer } from '@src/to-be-organized/node-rendering-stuff/ComponentsRenderer';
import { triggerNodeRerender } from '@store/roadmap-refactor/render/rerender-triggers-nodes';
import { getNodeByIdRoadmapSelector } from '@src/typescript/roadmap_ref/roadmap-data/services/get';
import {
  closeEditorProtocol,
  getOnClickAction,
  getOnMouseOutAction,
  getOnMouseOutActionEdit,
  getOnMouseOverAction,
} from '@src/to-be-organized/node-rendering-stuff/actions-manager';
import { getElementHasEffect } from '@store/roadmap-refactor/elements-editing/store-node-effects';
import {
  getHideProgress,
  getRoadmapState,
} from '@store/roadmap-refactor/roadmap-data/misc-data/roadmap_state';
import DraggingResizeElement from '@src/to-be-organized/resize-dragging/DraggingResizeElement';
import ConnectionAnchorsRenderer from '@components/roadmap/connections/connection-editing/ConnectionAnchorsRenderer';
import { getEditingState } from '@store/roadmap-refactor/editing/editing-state';
import DragSvg from '@src/UI-library/svg-components/DragSvg';
import {
  getIsResizingGlobal,
  getResize,
} from '@src/to-be-organized/resize-dragging/stores-resize-shared-data';
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
import {
  checkFirstOnClick,
  getNodeStatusBarColor,
} from '@src/to-be-organized/node-rendering-stuff/node-render-logic';
import NodeHOCForeignObject from '@components/roadmap/to-be-organized/NodeHOCForeignObject';
import AsyncLoaderHOC from '@components/roadmap/rendering-engines/async-loading/AsyncLoaderHOC';
import { showContextMenu } from '@components/roadmap/contextmenu/store/ContextMenu';
import useContextMenuOrLongPress from '@hooks/useContextMenuOrLongPress';
import { requestButton } from '@src/components/roadmap/navbar-roadmap/viewmodes/owner/components/buttons-arrays/buttons-requester';
import { triggerRerenderEditor } from '@src/store/roadmap-refactor/elements-editing/store-editor-selected-data';
import { setDisplayPageType } from '@src/store/roadmap-refactor/display/display-manager';
import storeVisitorStatus from '@src/store/user/user-status';
import { useStore } from '@nanostores/react';
import { setNotification } from '@src/components/roadmap/to-be-organized/notifications/notifciations-refr/notification-store-refr';
import {
  activateToolTip,
  deactivateToolTip,
  setNodeType,
} from './store-tooltip';

interface NodeViewProps {
  nodeId: string;
  centerOffset: { x: number; y: number };
}

const OFFSET_DRAGGING = 2;

const NodeRendererClassic: React.FC<NodeViewProps> = ({
  nodeId,
  centerOffset,
}) => {
  const node = getNodeByIdRoadmapSelector(nodeId);
  const { editing, scale, isSafari, optimized } = useNodeExternalData();
  const [maskBoolean, setMaskBoolean] = useState(false);
  // for 3 nodes login
  // const initialCountNumber = localStorage.getItem('count')
  //   ? parseInt(localStorage.getItem('count'), 10)
  //   : 0;
  // const loginButton = requestButton('get-started');
  // const { isLogged } = useStore(storeVisitorStatus);

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
  const { isCurrentlyDragged, cursor, isDraggable, isSelected } =
    useNodeRuntimeProperties(nodeId);

  const { style } = useNodeApplyStatusAndEffects(
    node,
    nodeDivRef,
    nodeDataProcessed,
    centeredCoords,
    loaded
  );

  useNodeHandleEvents(nodeDivRef, nodeId, loaded);

  const shouldNotHaveEvents =
    getRoadmapState() === 'view' && node.actions.onClick === 'Do nothing';

  return (
    // @ts-ignore
    <div
      className={`${
        shouldNotHaveEvents ? 'pointer-events-none' : 'pointer-events-auto'
      } ${isSafari && !isSubNode ? 'fixed origin-center' : ''}`}
      style={{
        transform: `scale(${isSafari && !isSubNode ? scale : 1})`,
      }}
      {...useContextMenuOrLongPress(handleContextMenuOrLongPress)}
    >
      <div
        className='absolute '
        id={`div${nodeId}`} // used for dragging
        style={{
          height: `${height}px`,
          width: `${width}px`,
          top: `${centeredCoords.y}px`,
          left: `${centeredCoords.x}px`,
        }}
        onBlur={() => {}}
        onFocus={() => {}}
        onMouseOver={(event) => {
          event.stopPropagation();
          getOnMouseOverAction(nodeId)();
          setMouseOver(true);
          triggerNodeRerender(nodeId);
          setMaskBoolean(true);
          activateToolTip();
          setNodeType(node.actions.onClick);
        }}
        onMouseLeave={() => {
          getOnMouseOutActionEdit(nodeId)();
          setMouseOver(false);
          deactivateToolTip();
        }}
        onMouseOut={(event) => {
          event.stopPropagation();
          getOnMouseOutAction(nodeId)();
          setMouseOver(false);
          setMaskBoolean(false);
        }}
      >
        {getElementHasEffect(nodeId, 'highlight-node') && (
          <div className='z-10  left-1/2 -translate-x-1/2 w-20 h-20 absolute select-none -top-16'>
            <div className='w-full h-full flex justify-center items-center'>
              <DragSvg size={50} />
            </div>
          </div>
        )}
        {!isSubNode && bgOpacity !== 0 && (
          <div
            className='bg-backgroundRoadmap absolute '
            id={`background${nodeId}`}
            style={{
              ...style,
              fillOpacity: 40,
              backgroundColor: undefined,
              borderStyle: undefined,
            }}
          />
        )}
        <div
          onFocus={() => {}}
          onBlur={() => {}}
          className={`${
            !optimized && shadowClass
          } top-0 left-0 transition-allNoTransform duration-200 absolute ${cursor}`}
          ref={nodeDivRef}
          onClick={(event) => {
            event.stopPropagation();
            if (
              isResizing ||
              isCurrentlyDragged ||
              getResize() ||
              getIsResizingGlobal()
            ) {
              return;
            }
            // if (
            //   initialCountNumber >= 2 &&
            //   !isLogged &&
            //   node.actions.onClick === 'Open link'
            // ) {
            //   loginButton.callback();
            //   return;
            // }
            getOnClickAction(nodeId)();
            // if (!editing && !isLogged) {
            //   localStorage.setItem('count', `${initialCountNumber + 1}`);
            // }
            // if (initialCountNumber >= 2 && !editing && !isLogged) {
            //   loginButton.callback();
            //   setDisplayPageType('closed');
            // }
          }}
          style={style}
        />
        {maskBoolean && !editing && node.actions.onClick !== 'Do nothing' && (
          <div
            className={`absolute w-full h-full border-2 border-opacity-100 ${
              node.data.colorType === 'tertiary' ||
              node.data.colorType === 'secondary'
                ? 'border-blue-400'
                : 'border-primary'
            } pointer-events-none`}
          />
        )}
        <AnimatePresence>
          {isDraggable &&
            !isCurrentlyDragged &&
            (mouseOver || isResizing || isSelected) && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <DraggingResizeElement
                  style={{
                    width: width + OFFSET_DRAGGING,
                    height: height + OFFSET_DRAGGING,
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
              className={`h-[10px] left-0 top-0 absolute pointer-events-none select-none ${getNodeStatusBarColor(
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
