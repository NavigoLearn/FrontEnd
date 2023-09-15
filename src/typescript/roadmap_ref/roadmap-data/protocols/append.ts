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
import {
  applyRoadmapElementsRechunkedDraggability,
  applyRoadmapElementsInitialDraggability,
} from '@src/typescript/roadmap_ref/dragging/misc';
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
import {
  addDragabilityProtocol,
  triggerAllConnectionsRerender,
} from '@src/typescript/roadmap_ref/render/dragging';
import { addDraggingBehaviorComponentProtocol } from '@src/typescript/roadmap_ref/node/components/text/factories';
import { mutateConnectionsIds } from '@src/typescript/roadmap_ref/roadmap-data/services/mutate';
import {
  mutateNodeColor,
  mutateNodeColorAndRerender,
} from '@src/typescript/roadmap_ref/node/core/data-mutation/mutate';
import { closeEditorProtocol } from '@src/to-be-organized/nodeview/actions-manager';

export function appendSubNode(node: NodeClass) {
  const newNestedNode = factorySubNode(node.id, 120, 40, 0, 0); // creates node
  if (node.data.colorType === 'tertiary') {
    mutateNodeColor(newNestedNode, 'secondary');
  } else {
    mutateNodeColor(newNestedNode, 'tertiary');
  }
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
  applyRoadmapElementsInitialDraggability();
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
      // binding current parent to the new subnode id
      const parent = nodes[node.properties.nestedWithin];
      const newIdIndex = parent.subNodeIds.indexOf(oldId);
      parent.subNodeIds[newIdIndex] = node.id;
    }

    node.subNodeIds.forEach((subNodeId) => {
      // binding subnodes to new parent id
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

export function appendSubNodesTemplateToRoadmap(
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

  applyRoadmapElementsRechunkedDraggability();
  closeEditorProtocol();
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

  appendSubNodesTemplateToRoadmap(newNodes, newBaseId);
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

  const targetNode: NodeClass = deepCopy(
    getNodeByIdRoadmapSelector(targetNodeId)
  );

  const queue = []; // deletes all subnodes without deleting target node+
  const auxQueue = [targetNode];
  while (auxQueue.length > 0) {
    const node = auxQueue.shift();
    node.subNodeIds.forEach((id) => {
      const subNode = roadmap.nodes[id];
      auxQueue.push(subNode);
      queue.push(id);
    });
  }

  console.log(deepCopy(queue), deepCopy(roadmap.nodes));
  while (queue.length > 0) {
    const subNodeId = queue.shift();
    deleteNodeFromRoadmapNodes(subNodeId);
  }

  applyTemplateToNewNode(targetNode, deepCopy(newNodes[newBaseId]));

  // because we essentially transfer ownership of the subnodes and components to a new node and
  // we have to take into account the ids
  targetNode.subNodeIds.forEach((id) => {
    const subNode = newNodes[id];
    subNode.properties.nestedWithin = targetNodeId;
  });

  targetNode.components.forEach((component) => {
    component.parentNodeId = targetNodeId;
    addDraggingBehaviorComponentProtocol(component, targetNodeId);
  });

  appendSubNodesTemplateToRoadmap(newNodes, newBaseId);

  injectRoadmapNode(targetNode);
  triggerNodeRerender(targetNodeId);
}
