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
import { getNodeByIdRoadmapSelector } from '@src/typescript/roadmap_ref/roadmap-data/services/get';
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
import DraggingResizeElement from '@src/to-be-organized/resize-dragging/DraggingResizeElement';
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
import { getRoadmapNodeProgress } from '@store/roadmap-refactor/roadmap-data/misc-data/roadmap-progress';
import { getResize } from '@src/to-be-organized/resize-dragging/stores-resize-shared-data';
import { hexAddAlpha } from '@src/typescript/roadmap_ref/utils';
import { showContextMenu } from '@components/roadmap/contextmenu/store/ContextMenu';
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
  const node = getNodeByIdRoadmapSelector(nodeId);
  const nodeDivRef = useRef<HTMLDivElement>(null);
  const rerender = useTriggerRerender();
  const childNodeId = useStore(selectedNodeIdChild);
  const parentNodeId = useStore(selectedNodeIdParent);
  const currentConnection = useStore(selectedConnectionId);
  const { scale, isSafari } = useStore(scaleSafariStore);

  const handleContextMenu = (event) => {
    event.stopPropagation();
    event.preventDefault();
    if (node.actions.onClick === 'Do nothing') return;

    showContextMenu(
      nodeId,
      `${event.clientX - 16}px`,
      `${event.clientY - 16}px`
    );
  };

  const renderNode = (nodeId: string, isSubNode: boolean) => {
    const loaded = useIsLoaded();
    const {
      width: widthData,
      height: heightData,
      opacity: opacityData,
      colorType: colorTypeData,
      backgroundOpacity: backgroundOpacityData,
    } = node.data;

    // ensure node has all data it needs
    const width = widthData ?? 200;
    const height = heightData ?? 50;
    const opacity = opacityData ?? 100;
    const colorType = colorTypeData ?? 'primary';
    const backgroundOpacity = backgroundOpacityData ?? 100;

    node.data.center.x = width / 2;
    const { subNodeIds } = node;
    // Function to render each subnode

    const { subNodeFlag } = node.flags;

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
        const status = getRoadmapNodeProgress(nodeId);
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

    function getStatusBarColor(node: NodeClass) {
      const statusCircleBgColor = {
        Status: 'bg-transparent',
        'In Progress': 'bg-yellow-400',
        Completed: 'bg-green-400',
        Skip: 'bg-gray-400',
      };
      const attachment = node.attachments[0];
      const status = getRoadmapNodeProgress(nodeId);
      return statusCircleBgColor[status];
    }

    const bgOpacity = backgroundOpacity / 100;

    const color = selectNodeColorFromScheme(
      getColorThemeFromRoadmap(),
      colorType
    );

    const borderColor = selectNodeColorTextBorder(
      getColorThemeFromRoadmap(),
      colorType
    );

    const shadowClass =
      // eslint-disable-next-line no-nested-ternary
      bgOpacity === 0 ? 'shadow-none' : isSubNode ? 'shadow-md' : 'shadow-lg';

    const borderStyle =
      borderColor === '#none'
        ? `2px solid transparent`
        : `2px solid ${hexAddAlpha(borderColor, bgOpacity)}`;

    const style = {
      // color: textColor,
      backgroundColor: hexAddAlpha(color, bgOpacity),
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
      getIsEditing() && deleteStatusEffectAll(nodeId);
      loaded && !getIsEditing() && appendNodeMarkAsDone(node);
      if (!nodeDivRef.current) return;
      loaded && applyElementEffects(nodeId);
    });

    const isDraggable = getElementIsDraggable(nodeId);
    // const isRoot = node.flags.renderedOnRoadmapFlag;
    const isCurrentlyDragged = getElementHasEffect(
      nodeId,
      'dragging-recursive'
    );

    // const { addNotification } = useNotification();

    const cursor = isCurrentlyDragged ? 'cursor-grab' : 'cursor-pointer';

    // isCurrentlyDragged && handleNotification(addNotification);

    return (
      <div
        className={isSafari && !isSubNode ? 'fixed origin-center' : ''}
        style={{
          transform: `scale(${isSafari && !isSubNode ? scale : 1})`,
        }}
        onContextMenu={handleContextMenu}
      >
        {getElementHasEffect(nodeId, 'highlight-node') && (
          <div className='z-10  left-1/2 -translate-x-1/2 w-20 h-20 absolute select-none -top-16'>
            <div className='w-full h-full flex justify-center items-center'>
              <DragSvg size={50} />
            </div>
          </div>
        )}

        <div
          className={`rounded-md ${shadowClass} transition-allNoTransform duration-200 absolute ${cursor}`}
          id={`div${nodeId}`}
          ref={nodeDivRef}
          onClick={(event) => {
            event.stopPropagation();
            if (resizing || isCurrentlyDragged || getResize()) {
              return;
            }

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
                  element={node}
                  setResizeCallback={() => {
                    setResizing(true);
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
          {!editing &&
            !getHideProgress() &&
            node.actions.onClick !== 'Do nothing' && (
              <div
                className={`h-[10px] left-[-2px] top-[-2px] rounded-t-md absolute select-none ${getStatusBarColor(
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
