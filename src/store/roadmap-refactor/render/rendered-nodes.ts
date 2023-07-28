import { atom } from 'nanostores';

const renderNodesStore = atom({
  nodesIds: [], // ids of all the nodes currently rendered on the screen
} as {
  nodesIds: string[];
});

export function checkDiff(newNodes: string[]) {
  // checks if the ids are identical even if the order is different

  const oldNodes = renderNodesStore.get().nodesIds;
  if (oldNodes.length !== newNodes.length) return true;
  for (let i = 0; i < oldNodes.length; i += 1) {
    if (!newNodes.includes(oldNodes[i])) return true;
  }
  return false;
}
export function setNodes(newNodes: string[]) {
  if (checkDiff(newNodes)) {
    renderNodesStore.set({ nodesIds: newNodes });
  }
}

export function getNodes() {
  return renderNodesStore.get().nodesIds;
}

export default renderNodesStore;
