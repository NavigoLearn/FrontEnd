import { atom } from 'nanostores';
import { NodeClass } from '@typescript/roadmap_ref/node/core/core';
import { classicNodeFactoryBoilerplate } from '@typescript/roadmap_ref/node/core/factories/templates/classic';

const editorDisplayManager = atom({
  triggerRender: false,
  node: classicNodeFactoryBoilerplate(),
  selectedNodeId: null,
} as {
  triggerRender: boolean;
  node: NodeClass;
  selectedNodeId: string;
});

export const setSelectedNode = (node: NodeClass) => {
  editorDisplayManager.set({
    ...editorDisplayManager.get(),
    selectedNodeId: node.data.id,
    node,
  });
};

export const setSelectedNodeId = (id: string) => {
  editorDisplayManager.set({
    ...editorDisplayManager.get(),
    selectedNodeId: id,
  });
};
export const triggerRerenderEditor = () => {
  const originalStore = editorDisplayManager.get();
  editorDisplayManager.set({
    ...originalStore,
    triggerRender: !originalStore.triggerRender,
  });
};
export default editorDisplayManager;
