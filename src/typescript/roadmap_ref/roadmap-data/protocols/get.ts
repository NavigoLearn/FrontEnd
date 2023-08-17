import {
  getIsRenderedOnRoadmap,
  getNodeByIdRoadmapSelector,
} from '@src/typescript/roadmap_ref/roadmap-data/services/get';

export const getChildrenRenderedTraceback = (nodeId: string) => {
  // only gets rendered children
  const traceback = [];
  const queue = [nodeId];
  while (queue.length > 0) {
    const currentNodeId = queue.shift();
    traceback.push(currentNodeId);
    const currentNode = getNodeByIdRoadmapSelector(currentNodeId);
    currentNode.properties.childrenIds.forEach((childId) => {
      if (getIsRenderedOnRoadmap(childId)) {
        queue.push(childId);
      }
    });
  }
  return traceback;
};
