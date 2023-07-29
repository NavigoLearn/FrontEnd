import { atom } from 'nanostores';

const editorSelectedData = atom({
  triggerRender: false,
  selectedNodeId: '0',
} as {});

export default editorSelectedData;
