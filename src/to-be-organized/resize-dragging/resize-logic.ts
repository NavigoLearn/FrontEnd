import {
  IElementType,
  IMouseDragDirection,
} from '@src/to-be-organized/resize-dragging/stores';
import { getResizeNodeCallbacks } from '@src/typescript/roadmap_ref/node/core/data-mutation/mutate-resize';
import { NodeClass } from '@src/typescript/roadmap_ref/node/core/core';

export function getResizeCallback(
  direction: IMouseDragDirection,
  type: IElementType,
  ref: NodeClass
) {
  if (type === 'node') {
    return (deltaXMouse, deltaYMouse) => {
      getResizeNodeCallbacks(direction)(ref, deltaXMouse, deltaYMouse);
    };
  }

  throw new Error('Not implemented yet');
}

// heightCallback={(height) => {
//     mutateNodeHeightWhileKeepingCenter(node, height);
//     triggerNodeRerender(nodeId);
//     triggerAllConnectionsRerender();
// }}
// widthCallback={(width) => {
//     mutateNodeWidthWhileKeepingCenter(node, width);
//     triggerNodeRerender(nodeId);
//     triggerAllConnectionsRerender();
// }}
// snappingCallback={(width, height) => {
//     setResizing(true);
//     const rootNode = node.flags.renderedOnRoadmapFlag;
//     const nodesToSnapTo = rootNode
//         ? getRootNodesIds()
//         : getNodeAdjacentNodesIds(nodeId);
//     // snapping node corners ( ͡° ͜ʖ ͡°) so width and height will also snap I hope
//     const { width: newWidth, height: newHeight } =
//         snapNodeWidthHeight(
//             node.id,
//             nodesToSnapTo,
//             width,
//             height
//         );
//     return {
//         width: newWidth,
//         height: newHeight,
//     };
// }}
