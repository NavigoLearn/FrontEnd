import { atom } from 'nanostores';

const renderConnectionsStore = atom({
  connections: [], // ids of all the nodes currently rendered on the screen
} as {
  connections: string[];
});

export function checkDiff(newConnections: string[]) {
  // checks if the ids are identical even if the order is different
  const oldNodes = renderConnectionsStore.get().connections;
  if (oldNodes.length !== newConnections.length) return true;
  for (let i = 0; i < oldNodes.length; i += 1) {
    if (!newConnections.includes(oldNodes[i])) return true;
  }
  return false;
}

export function setConnections(newConnections: string[]) {
  const nonDuplicateConnections = [];
  for (let i = 0; i < newConnections.length; i += 1) {
    if (!nonDuplicateConnections.includes(newConnections[i])) {
      nonDuplicateConnections.push(newConnections[i]);
    }
  }
  if (checkDiff(nonDuplicateConnections)) {
    // eliminates duplicate connections
    renderConnectionsStore.set({ connections: nonDuplicateConnections });
  }
}

export function getConnections() {
  return renderConnectionsStore.get().connections;
}

export default renderConnectionsStore;
