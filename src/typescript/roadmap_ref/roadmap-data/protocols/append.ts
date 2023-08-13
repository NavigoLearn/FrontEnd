import { factorySubNode } from '@src/typescript/roadmap_ref/node/core/factories/templates/sub-node';
import {
  appendChildNodeId,
  appendConnectionNode,
  appendSubNode,
} from '@src/typescript/roadmap_ref/node/core/data-mutation/append';
import { draggableElementProtocol } from '@components/roadmap/displayers/editor/pages/utils';
import { triggerNodeRerender } from '@store/roadmap-refactor/render/rerender-triggers-nodes';
import { NodeClass } from '@src/typescript/roadmap_ref/node/core/core';
import { factoryNodeClassic } from '@src/typescript/roadmap_ref/node/core/factories/templates/classic';
import { injectParentData } from '@src/typescript/roadmap_ref/node/core/factories/data-mutation/inject';
import { factoryConnectionBoilerplate } from '@src/typescript/roadmap_ref/node/connections/factories';
import { triggerChunkRerender } from '@store/roadmap-refactor/render/rendered-chunks';
import { applyRoadmapDraggability } from '@src/typescript/roadmap_ref/dragging/misc';
import { setDisplayPageType } from '@store/roadmap-refactor/display/display-manager';
import { removeAllEffects } from '@store/roadmap-refactor/elements-editing/element-effects';
import {
  addConnectionRoadmapSelector,
  appendNodeRoadmapSelector,
  appendRootNodeId,
} from '@src/typescript/roadmap_ref/roadmap-data/services/append';

export function appendNestedNode(node: NodeClass) {
  const newNestedNode = factorySubNode(node.id, 100, 100, 0, 0); // creates node
  appendSubNode(node, newNestedNode.id); // appends to the parent of nesting
  appendNodeRoadmapSelector(newNestedNode);
  draggableElementProtocol(newNestedNode.draggingBehavior, newNestedNode.id);
  triggerNodeRerender(node.id);
}

export function appendClassicNodeToRoadmap(parentNode: NodeClass) {
  const node = parentNode;
  const newNode = factoryNodeClassic(
    node.data.coords.x + node.data.width,
    node.data.coords.y + node.data.height,
    200,
    200
  );
  injectParentData(newNode, node.id);
  appendChildNodeId(node, newNode.id);

  const connection = factoryConnectionBoilerplate(node.id, newNode.id);
  appendConnectionNode(node, connection.id);
  appendConnectionNode(newNode, connection.id);

  appendNodeRoadmapSelector(newNode);
  appendRootNodeId(newNode.id);
  addConnectionRoadmapSelector(connection);

  triggerChunkRerender();
  applyRoadmapDraggability();
  removeAllEffects();
  setDisplayPageType('closed');
}
