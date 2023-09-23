import { atom } from 'nanostores';

const renderNodesStore = atom({
  nodesIds: [], // ids of all the nodes-page currently rendered on the screen
} as {
  nodesIds: string[];
});

export function checkDiff(newNodes: string[]) {
  // checks if the ids are identical even if the order is different

  const oldNodes = renderNodesStore.get().nodesIds;
  for (let i = 0; i < oldNodes.length; i += 1) {
    if (!newNodes.includes(oldNodes[i])) return true;
  }

  for (let i = 0; i < newNodes.length; i += 1) {
    if (!oldNodes.includes(newNodes[i])) return true;
  }
  return false;
}

export function setNodes(newNodes: string[]) {
  if (checkDiff(newNodes)) {
    const uniqueNodes = [];
    newNodes.forEach((nodeId) => {
      if (!uniqueNodes.includes(nodeId)) uniqueNodes.push(nodeId);
    });
    renderNodesStore.set({ nodesIds: uniqueNodes });
  }
}

export function getRenderedRootNodesIds() {
  return renderNodesStore.get().nodesIds;
}

export function deleteAllRenderedNodes() {
  renderNodesStore.set({ nodesIds: [] });
}

export default renderNodesStore;
