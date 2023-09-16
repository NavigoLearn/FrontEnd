import { atom } from 'nanostores';
import { IAttachmentTabStatus } from '@src/typescript/roadmap_ref/node/attachments/tab/core';
import {
  fetchUpdateRoadmapProgress,
  IRoadmapProgress,
} from '@src/api-wrapper/roadmap/routes/routes-roadmaps';
import { deepCopy } from '@src/typescript/roadmap_ref/utils';

export const storeRoadmapProgress = atom({} as IRoadmapProgress);

export function getRoadmapProgress() {
  return storeRoadmapProgress.get();
}
export function setRoadmapProgress(progress: IRoadmapProgress) {
  storeRoadmapProgress.set(progress);
}

export function setRoadmapNodeProgress(
  nodeId: string,
  status: IAttachmentTabStatus
) {
  const progress = getRoadmapProgress();
  progress[nodeId] = status;
  storeRoadmapProgress.set(progress);
}

export function getRoadmapNodeProgress(nodeId: string) {
  if (!storeRoadmapProgress.get()[nodeId])
    setRoadmapNodeProgress(nodeId, 'Status');
  return storeRoadmapProgress.get()[nodeId];
}

export function setRoadmapNodeProgressAndFetchUpdate(
  nodeId: string,
  status: IAttachmentTabStatus
) {
  setRoadmapNodeProgress(nodeId, status);
  fetchUpdateRoadmapProgress(storeRoadmapProgress.get());
}
