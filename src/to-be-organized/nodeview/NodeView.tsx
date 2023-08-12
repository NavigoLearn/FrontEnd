/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
import React, { useEffect, useRef } from 'react';
import { afterEventLoop } from '@src/typescript/utils/misc';
import renderComponents from '@src/to-be-organized/nodeview/CompRender';
import { useTriggerRerender } from '@hooks/useTriggerRerender';
import { setTriggerRender } from '@store/roadmap-refactor/render/rerender-triggers';
import {
  getElementDraggable,
  setDraggableElementForNodeWithId,
} from '@store/roadmap-refactor/elements-editing/draggable-elements';
import { setDisplayPageType } from '@store/roadmap-refactor/display/display-manager';
import { setSelectedNodeId } from '@store/roadmap-refactor/elements-editing/editor-selected-data';
import { getNodeByIdRoadmapSelector } from '@store/roadmap-refactor/roadmap-data/roadmap-selector';
import { FontSizeValues } from '@src/types/roadmap/node/components-types';

interface NodeViewProps {
  nodeId: string;
  centerOffset: { x: number; y: number };
  divSizeCallback?: (divRef: React.MutableRefObject<HTMLDivElement>) => void; //
}

const NodeView: React.FC<NodeViewProps> = ({
  nodeId,
  centerOffset,
  divSizeCallback,
}) => {
  const nodeDivRef = useRef<HTMLDivElement>(null);
  const rerender = useTriggerRerender();

  const renderNode = (nodeId: string) => {
    const node = getNodeByIdRoadmapSelector(nodeId);
    const { color, width, height, opacity, fontSizeType, colorTheme } = node.data;
    node.data.center.x = width / 2;
    const { subNodeIds } = node;
    // Function to render each subnode

    const { flags } = node;
    const { nestedFlag } = flags;

    // the offset for the nodes rendered directly on the roadmap is calculated directly
    // on its group and foreign object in NodeManager. This is why you need to treat the coords
    // from subNodes which don't have their own foreign object and are divs relative to the parent node

    const coords = {
      x: nestedFlag ? node.data.coords.x : 0,
      y: nestedFlag ? node.data.coords.y : 0,
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
      if (node.flags.renderedOnRoadmapFlag) return;
      afterEventLoop(() => {
        setTriggerRender(node.id, rerender);
      });
    }, []);

    return (
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
      <div
        className='drop-shadow-md  rounded-xl absolute border-2 border-black'
        id={`div${nodeId}`}
        ref={nodeDivRef}
        onClick={() => {
          // draggable elements coincide with clickable elements on a roadmap
          if (!getElementDraggable(nodeId)) return;
          setDisplayPageType('editor');
          setSelectedNodeId(nodeId);
          setDraggableElementForNodeWithId(nodeId);
        }}
        style={{
          backgroundColor: color,
          width: `${width}px`,
          height: `${height}px`,
          top: `${calculatedOffsetCoords.y + coords.y}px`,
          left: `${calculatedOffsetCoords.x + coords.x}px`,
          opacity,
          fontSize: FontSizeValues[fontSizeType],
        }}
      >
        {renderComponents(node)}
        {subNodeIds &&
          subNodeIds.map((subNodeId) => {
            // the div is used to position the subNode in the center of the current node
            return (
              <NodeView
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
export default NodeView;
