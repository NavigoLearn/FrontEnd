/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
import React, { useEffect, useRef } from 'react';
import { afterEventLoop } from '@src/typescript/utils/misc';
import { componentsRenderer } from '@src/to-be-organized/nodeview/ComponentsRenderer';
import { useTriggerRerender } from '@hooks/useTriggerRerender';
import { setTriggerRender } from '@store/roadmap-refactor/render/rerender-triggers-nodes';
import { getNodeByIdRoadmapSelector } from '@src/typescript/roadmap_ref/roadmap-data/services/get';
import {
  getOnClickAction,
  getOnMouseOutAction,
  getOnMouseOverAction,
} from '@src/to-be-organized/nodeview/actions-manager';
import {
  applyElementEffects,
  setElementEffectsEmpty,
} from '@store/roadmap-refactor/elements-editing/element-effects';
import { useIsLoaded } from '@hooks/useIsLoaded';
import { setElementDiv } from '@store/roadmap-refactor/elements-editing/elements-divs';
import { FontSizeValues } from '@src/types/roadmap/node/components-types';
import { deepCopy } from '@src/typescript/roadmap_ref/utils';

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
    const { color, width, height, opacity, fontSizeType } = node.data;
    console.log(deepCopy(color));
    node.data.center.x = width / 2;
    const { subNodeIds } = node;
    // Function to render each subnode

    const { flags } = node;
    const { subNodeFlag } = flags;

    // the offset for the nodes rendered directly on the roadmap is calculated directly
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
      afterEventLoop(() => {
        setTriggerRender(node.id, rerender);
      });
    }, []);

    const style = {
      backgroundColor: color,
      width: `${width}px`,
      height: `${height}px`,
      top: `${calculatedOffsetCoords.y + coords.y}px`,
      left: `${calculatedOffsetCoords.x + coords.x}px`,
      opacity,
      fontSize: FontSizeValues[fontSizeType],
    };
    const applyStyle = () => {
      const element = nodeDivRef.current;
      Object.assign(element.style, style);
    };

    afterEventLoop(() => {
      // runs all the effects after the node is rendered
      applyStyle();
      loaded && applyElementEffects(nodeId, nodeDivRef.current);
    });

    return (
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions,jsx-a11y/mouse-events-have-key-events
      <div
        className='drop-shadow-md rounded-xl absolute border-2 border-black transition-allNoTransform duration-300'
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
