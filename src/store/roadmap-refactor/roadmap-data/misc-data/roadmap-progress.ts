import { atom } from 'nanostores';
import { type IAttachmentTabStatus } from '@src/typescript/roadmap_ref/node/attachments/tab/core';
import {
  fetchUpdateRoadmapProgress,
  type IRoadmapProgress,
} from '@src/api-wrapper/roadmap/routes/routes-roadmaps';
import { deepCopy } from '@src/typescript/roadmap_ref/utils';
import { dispatchAnalyticsEvent } from '@src/to-be-organized/analytics-module/stores/analytics';
import { getRoadmapAbout } from '@store/roadmap-refactor/roadmap-data/misc-data/roadmap-about.ts';

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
  storeRoadmapProgress.set({ ...progress });
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
  fetchUpdateRoadmapProgress(storeRoadmapProgress.get()).then(() => {
    dispatchAnalyticsEvent('roadmapInteraction', {
      actionType: 'marked-node',
    });
  });
}

export function getRoadmapMarkedNodes() {
  const progress = getRoadmapProgress();
  const markedNodes = [];
  const nodesIds = Object.keys(progress);
  nodesIds.forEach((nodeId) => {
    if (progress[nodeId] !== 'Status') markedNodes.push(nodeId);
  });
  return markedNodes;
}
