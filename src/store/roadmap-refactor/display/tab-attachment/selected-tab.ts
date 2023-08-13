import { atom } from 'nanostores';

export const selectedTabNode = atom({
  nodeId: '', // id of the node that is currently selected
} as {
  nodeId: string;
});

export function setTabNode(nodeId: string) {
  const originalStore = selectedTabNode.get();
  selectedTabNode.set({
    ...originalStore,
    nodeId,
  });
}
