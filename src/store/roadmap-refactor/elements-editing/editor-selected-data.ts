import { atom } from 'nanostores';

const editorSelectedData = atom({
  triggerRender: false,
  selectedNodeId: '0',
} as {
  triggerRender: boolean;
  selectedNodeId: string;
});

export const setSelectedNodeId = (id: string) => {
  editorSelectedData.set({
    ...editorSelectedData.get(),
    selectedNodeId: id,
  });
};

export const getSelectedNodeId = () => {
  return editorSelectedData.get().selectedNodeId;
};

export const triggerRerenderEditor = () => {
  const originalStore = editorSelectedData.get();
  editorSelectedData.set({
    ...originalStore,
    triggerRender: !originalStore.triggerRender,
  });
};
export default editorSelectedData;
