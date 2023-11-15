import { atom } from 'nanostores';
import { type IAttachmentTabStatus } from '@src/typescript/roadmap_ref/node/attachments/tab/core';
import { getRoadmapNodeProgress } from '@store/roadmap-refactor/roadmap-data/misc-data/roadmap-progress';

export interface ContextMenu {
  nodeId: string;
  visible: boolean;
  x: string;
  y: string;
  progress: IAttachmentTabStatus;
}

export const contextMenuStore = atom<ContextMenu>({
  nodeId: '',
  visible: false,
  x: '0px',
  y: '0px',
  progress: 'Status',
});

export function hideContextMenu() {
  const original = contextMenuStore.get();
  contextMenuStore.set({
    ...original,
    visible: false,
  });
}

export function showContextMenu(nodeId: string, x: string, y: string) {
  hideContextMenu();
  // localStorage.setItem('firstProgress', 'true');
  setTimeout(() => {
    const original = contextMenuStore.get();
    contextMenuStore.set({
      ...original,
      nodeId,
      visible: true,
      x,
      y,
      progress: getRoadmapNodeProgress(nodeId),
    });
  }, 100);
}
