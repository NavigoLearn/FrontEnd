import { factorySubNode } from '@src/typescript/roadmap_ref/node/core/factories/base-templates-factories/sub-node';
import {
  deleteNodeFromRootNodes,
  deleteNodeFromChunks,
  deleteTemplate,
  deleteNodeFromRoadmapNodes,
} from '@src/typescript/roadmap_ref/roadmap-data/services/delete';
import { deleteNodeFromRoadmap } from '@src/typescript/roadmap_ref/roadmap-data/protocols/delete';
import {
  appendChildNodeId,
  appendConnectionNode,
  appendSubNodeId,
} from '@src/typescript/roadmap_ref/node/core/data-mutation/append';
import { draggableElementProtocol } from '@components/roadmap/pages-roadmap/editor/editor-pages/utils';
import { triggerNodeRerender } from '@store/roadmap-refactor/render/rerender-triggers-nodes';
import { NodeClass } from '@src/typescript/roadmap_ref/node/core/core';
import {
  addDraggingBehaviorNodeProtocol,
  factoryNodeClassicCustomizable,
} from '@src/typescript/roadmap_ref/node/core/factories/base-templates-factories/classic';
import {
  injectNewId,
  injectNewRandomId,
  injectParentData,
} from '@src/typescript/roadmap_ref/node/core/factories/data-mutation/inject';
import { factoryConnectionBoilerplate } from '@src/typescript/roadmap_ref/node/connections/factories';
import { triggerChunkRerender } from '@store/roadmap-refactor/render/rendered-chunks';
import { applyRoadmapElementsDraggability } from '@src/typescript/roadmap_ref/dragging/misc';
import { setDisplayPageType } from '@store/roadmap-refactor/display/display-manager';
import { removeAllEffects } from '@store/roadmap-refactor/elements-editing/element-effects';
import {
  appendNodeToChunks,
  appendRootNodeId,
} from '@src/typescript/roadmap_ref/roadmap-data/services/append';
import {
  injectRoadmapConnection,
  injectRoadmapNode,
} from '@src/typescript/roadmap_ref/roadmap-data/services/inject';
import {
  getNodeByIdRoadmapSelector,
  getRoadmapSelector,
  getTemplateById,
} from '@src/typescript/roadmap_ref/roadmap-data/services/get';
import { deepCopy } from '@src/typescript/roadmap_ref/utils';
import { HashMap } from '@type/roadmap/misc';
import { roadmapSelector } from '@store/roadmap-refactor/roadmap-data/roadmap-selector';
import { applyTemplateToNewNode } from '@src/typescript/roadmap_ref/node/core/data-mutation/protocol';
import {
  recalculateNodeCenter,
  recalculateNodeChunks,
} from '@src/typescript/roadmap_ref/node/core/calculations/general';
import { afterEventLoop, getRandomId } from '@src/typescript/utils/misc';
import { addDragabilityProtocol } from '@src/typescript/roadmap_ref/render/dragging';
import { addDraggingBehaviorComponentProtocol } from '@src/typescript/roadmap_ref/node/components/text/factories';
import { mutateConnectionsIds } from '@src/typescript/roadmap_ref/roadmap-data/services/mutate';

export function appendSubNode(node: NodeClass) {
  const newNestedNode = factorySubNode(node.id, 120, 40, 0, 0); // creates node
  appendSubNodeId(node, newNestedNode.id); // appends to the parent of nesting
  injectRoadmapNode(newNestedNode);
  draggableElementProtocol(newNestedNode.draggingBehavior, newNestedNode.id);
  triggerNodeRerender(node.id);
}

export function appendClassicNodeToRoadmap(parentNode: NodeClass) {
  const node = parentNode;

  const newNode = factoryNodeClassicCustomizable(
    node.data.coords.x + node.data.width,
    node.data.coords.y + node.data.height,
    150,
    50
  );

  injectParentData(newNode, node.id);
  appendChildNodeId(node, newNode.id);

  const connection = factoryConnectionBoilerplate(node.id, newNode.id);
  appendConnectionNode(node, connection.id);
  appendConnectionNode(newNode, connection.id);

  injectRoadmapNode(newNode);
  appendRootNodeId(newNode.id);
  injectRoadmapConnection(connection);

  triggerChunkRerender();
  applyRoadmapElementsDraggability();
  removeAllEffects();
  setDisplayPageType('closed');
}

export function mutateNodesIds(nodes: HashMap<NodeClass>, baseNodeId: string) {
  const baseNode = nodes[baseNodeId];
  const queue = [baseNode];
  let newBaseNodeId = baseNodeId;

  while (queue.length > 0) {
    const node = queue.shift();
    const oldId = node.id;
    injectNewRandomId(node);
    addDraggingBehaviorNodeProtocol(node); // overrides old dragging behavior to not bug from id
    if (oldId === baseNodeId) {
      newBaseNodeId = node.id;
    }
    node.components.forEach((component) => {
      component.id = getRandomId();
      addDraggingBehaviorComponentProtocol(component, node.id);
    });

    if (node.flags.subNodeFlag) {
      const parent = nodes[node.properties.nestedWithin];
      const newIdIndex = parent.subNodeIds.indexOf(oldId);
      parent.subNodeIds[newIdIndex] = node.id;
    }

    node.subNodeIds.forEach((subNodeId) => {
      const subNode = nodes[subNodeId];
      subNode.properties.nestedWithin = node.id;
      queue.push(subNode);
    });
    nodes[node.id] = node;
    delete nodes[oldId];
  }
  return {
    nodes,
    baseNodeId: newBaseNodeId,
  };
}

export function appendSubNodesToRoadmap(
  nodes: HashMap<NodeClass>,
  baseNodeId: string
) {
  const nodesIds = Object.keys(nodes);
  const roadmap = getRoadmapSelector();
  const roadmapNodes = roadmap.nodes;
  nodesIds.forEach((nodeId) => {
    const node = nodes[nodeId];
    if (node.id === baseNodeId) return; // base node needs chunking so it cannot simply be dumped in the roadmap
    const newNode = deepCopy(node);
    roadmapNodes[newNode.id] = newNode;
  });
  roadmapSelector.set({ ...roadmap });
}

export function appendNodeTemplateBase(
  parentNode: NodeClass,
  baseNodeTemplate: NodeClass
) {
  const newNode = factoryNodeClassicCustomizable(
    parentNode.data.coords.x + parentNode.data.width,
    parentNode.data.coords.y + parentNode.data.height,
    150,
    50
  );
  applyTemplateToNewNode(newNode, baseNodeTemplate);
  deleteNodeFromChunks(newNode); // factory adds node to chunks, we need to delete it and add it correctly
  // after applying the properties of the template
  newNode.id = injectNewId(newNode, baseNodeTemplate.id);

  recalculateNodeChunks(newNode);
  recalculateNodeCenter(newNode);
  appendNodeToChunks(newNode);

  addDraggingBehaviorNodeProtocol(newNode); // same reason as the chunks

  injectParentData(newNode, parentNode.id);
  appendChildNodeId(parentNode, newNode.id);

  const connection = factoryConnectionBoilerplate(parentNode.id, newNode.id);
  appendConnectionNode(parentNode, connection.id);
  appendConnectionNode(newNode, connection.id);

  injectRoadmapNode(newNode);
  appendRootNodeId(newNode.id);
  injectRoadmapConnection(connection);

  triggerChunkRerender();
  removeAllEffects();
  setDisplayPageType('closed');
}

export function addChildTemplateToRoadmap(
  parentNodeId: string,
  templateId: string
) {
  const template = getTemplateById(templateId);
  const { nodes } = template.roadmapImage;

  const { nodes: newNodes, baseNodeId: newBaseId } = mutateNodesIds(
    deepCopy(nodes),
    template.baseNodeId
  );

  appendSubNodesToRoadmap(newNodes, template.baseNodeId);
  const parentNode = getNodeByIdRoadmapSelector(parentNodeId);
  appendNodeTemplateBase(parentNode, deepCopy(newNodes[newBaseId]));
}

export function appendNodeToRoadmapNodes(node: NodeClass) {
  const roadmap = getRoadmapSelector();
  roadmap.nodes[node.id] = node;
  roadmapSelector.set({ ...roadmap });
}

export function applyTemplateToNode(targetNodeId: string, templateId: string) {
  const template = getTemplateById(templateId);
  const { nodes } = template.roadmapImage;
  const { nodes: newNodes, baseNodeId: newBaseId } = mutateNodesIds(
    deepCopy(nodes),
    template.baseNodeId
  );
  const roadmap = getRoadmapSelector();

  appendSubNodesToRoadmap(newNodes, template.baseNodeId);

  const targetNode: NodeClass = deepCopy(
    getNodeByIdRoadmapSelector(targetNodeId)
  );
  targetNode.subNodeIds.forEach((subNodeId) => {
    deleteNodeFromRoadmapNodes(subNodeId);
  });

  applyTemplateToNewNode(targetNode, deepCopy(newNodes[newBaseId]));

  deleteNodeFromChunks(targetNode);
  deleteNodeFromRootNodes(targetNode);
  deleteNodeFromRoadmapNodes(targetNodeId);

  const newId = injectNewId(targetNode, newBaseId);
  addDraggingBehaviorNodeProtocol(targetNode);
  appendNodeToChunks(targetNode);
  appendRootNodeId(newId);
  appendNodeToRoadmapNodes(targetNode);

  const connectionsIds = targetNode.connections;
  const connections = connectionsIds.map((id) => roadmap.connections[id]);
  mutateConnectionsIds(connections, targetNodeId, newId);

  triggerChunkRerender();
}
