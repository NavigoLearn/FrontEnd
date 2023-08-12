import { factorySubNode } from '@src/typescript/roadmap_ref/node/core/factories/templates/sub-node';
import { appendSubNode } from '@src/typescript/roadmap_ref/node/core/data-mutation/append';
import { appendNodeRoadmapSelector } from '@store/roadmap-refactor/roadmap-data/roadmap-selector';
import { draggableElementProtocol } from '@components/roadmap/displayers/editor/pages/utils';
import { triggerNodeRerender } from '@store/roadmap-refactor/render/rerender-triggers-nodes';
import { NodeClass } from '@src/typescript/roadmap_ref/node/core/core';

export function appendNestedNode(node: NodeClass) {
  const newNestedNode = factorySubNode(node.id, 100, 100, 0, 0); // creates node
  appendSubNode(node, newNestedNode.id); // appends to the parent of nesting
  appendNodeRoadmapSelector(newNestedNode);
  draggableElementProtocol(newNestedNode.draggingBehavior, newNestedNode.id);
  triggerNodeRerender(node.id);
}
