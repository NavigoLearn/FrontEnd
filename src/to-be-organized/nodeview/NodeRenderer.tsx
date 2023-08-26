/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
import React, { useEffect, useRef, Component } from 'react';
import { afterEventLoop } from '@src/typescript/utils/misc';
import { componentsRenderer } from '@src/to-be-organized/nodeview/ComponentsRenderer';
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
  getOnClickAction,
  getOnMouseOutAction,
  getOnMouseOverAction,
} from '@src/to-be-organized/nodeview/actions-manager';
import {
  appendElementEffect,
  appendStatusEffect,
  applyElementEffects,
  setElementEffectsEmpty,
  deleteStatusEffectAll,
} from '@store/roadmap-refactor/elements-editing/element-effects';
import { useIsLoaded } from '@hooks/useIsLoaded';
import { setElementDiv } from '@store/roadmap-refactor/elements-editing/elements-divs';
import { FontSizeValues } from '@src/types/roadmap/node/components-types';
import { NodeClass } from '@src/typescript/roadmap_ref/node/core/core';
import { getIsEditing } from '@store/roadmap-refactor/roadmap-data/roadmap_state';
import DraggingResizeElement from '@src/to-be-organized/DraggingResizeElement';
import {
  mutateNodeHeight,
  mutateNodeHeightWhileKeepingCenter,
  mutateNodeWidth,
  mutateNodeWidthWhileKeepingCenter,
} from '@src/typescript/roadmap_ref/node/core/data-mutation/mutate';
import {
  getElementIsDraggable,
  setDraggabilityAllElements,
  setDraggableElement,
} from '@store/roadmap-refactor/elements-editing/draggable-elements';
import { snapNodeWidthHeight } from '@src/typescript/roadmap_ref/snapping/core';
import { selectNodeColorFromScheme } from '@src/typescript/roadmap_ref/node/core/factories/data-mutation/services';
import { getColorThemeFromRoadmap } from '@components/roadmap/displayers/setup-screen/theme-controler';

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
      setElementEffectsEmpty(nodeId);
      setElementDiv(nodeId, nodeDivRef.current);
    }, []);

    useEffect(() => {
      if (node.flags.renderedOnRoadmapFlag) return;
      setTriggerRender(node.id, rerender);
    }, []);

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
      borderColor: `rgba(0,0,0, ${bgOpacity})`, // assuming borderColor is in #RRGGBB format
      width: `${width}px`,
      height: `${height}px`,
      top: `${calculatedOffsetCoords.y + coords.y}px`,
      left: `${calculatedOffsetCoords.x + coords.x}px`,
      opacity: `${getNodeOpacity(node)}`,
    };

    const applyStyle = () => {
      const element = nodeDivRef.current;
      Object.assign(element.style, style);
    };

    afterEventLoop(() => {
      // runs all the effects after the node is rendered
      applyStyle();
      loaded && !getIsEditing() && appendNodeMarkAsDone(node);
      getIsEditing() && deleteStatusEffectAll(nodeId);
      loaded && applyElementEffects(nodeId, nodeDivRef.current);
    });

    const isRoot = node.flags.renderedOnRoadmapFlag;
    return (
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/mouse-events-have-key-events,jsx-a11y/no-static-element-interactions
      <div
        className={`drop-shadow-md rounded-lg border-2 border-black transition-allNoTransform duration-300 absolute `}
        id={`div${nodeId}`}
        ref={nodeDivRef}
        onClick={(event) => {
          // draggable elements coincide with clickable elements on a roadmap
          event.stopPropagation(); // to avoid clicking a subnode and its parent at the same time
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
        style={style}
      >
        {!editing && (
          <div
            className={`w-8 h-8 -left-4 -top-4 absolute rounded-full select-none ${getStatusCircleStyle(
              node
            )}`}
          />
        )}
        <DraggingResizeElement
          style={{
            width,
            height,
          }}
          heightCallback={(height) => {
            mutateNodeHeightWhileKeepingCenter(node, height);
            triggerNodeRerender(nodeId);
          }}
          widthCallback={(width) => {
            mutateNodeWidthWhileKeepingCenter(node, width);
            triggerNodeRerender(nodeId);
          }}
          snappingCallback={(width, height) => {
            const rootNode = node.flags.renderedOnRoadmapFlag;
            const nodesToSnapTo = rootNode
              ? getRootNodesIds()
              : getNodeAdjacentNodesIds(nodeId);
            // snapping node corners ( ͡° ͜ʖ ͡°) so width and height will also snap I hope
            const { width: newWidth, height: newHeight } = snapNodeWidthHeight(
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

        {componentsRenderer(node)}
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
