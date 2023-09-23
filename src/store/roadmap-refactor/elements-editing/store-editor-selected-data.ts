import { atom } from 'nanostores';

const storeEditorSelectedData = atom({
  triggerRender: false,
  selectedNodeId: '0',
} as {
  triggerRender: boolean;
  selectedNodeId: string;
});

export const setSelectedNodeId = (id: string) => {
  storeEditorSelectedData.set({
    ...storeEditorSelectedData.get(),
    selectedNodeId: id,
  });
};

export const getSelectedNodeId = () => {
  return storeEditorSelectedData.get().selectedNodeId;
};

export const triggerRerenderEditor = () => {
  const originalStore = storeEditorSelectedData.get();
  storeEditorSelectedData.set({
    ...originalStore,
    triggerRender: !originalStore.triggerRender,
  });
};
export default storeEditorSelectedData;
