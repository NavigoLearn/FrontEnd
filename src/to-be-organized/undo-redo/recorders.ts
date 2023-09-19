import { INodeData } from '@src/to-be-organized/undo-redo/undo-types';
import { getNodeByIdRoadmapSelector } from '@src/typescript/roadmap_ref/roadmap-data/services/get';
import {
  endEventRecording,
  startEventRecording,
} from '@src/to-be-organized/undo-redo/store-undo-functionality';

export function startRecordDraggingNormal(nodeId) {
  const node = getNodeByIdRoadmapSelector(nodeId);
  const initialData: INodeData = {
    x: node.data.coords.x,
    y: node.data.coords.y,
    width: node.data.width,
    height: node.data.height,
  };

  console.log('startRecordData', initialData);
  startEventRecording(nodeId, initialData, 'node-resize');
}

export function endRecordDraggingNormal(nodeId) {
  const node = getNodeByIdRoadmapSelector(nodeId);
  const finalData: INodeData = {
    x: node.data.coords.x,
    y: node.data.coords.y,
    width: node.data.width,
    height: node.data.height,
  };
  console.log('endRecordDraggingNormal', finalData);
  endEventRecording(nodeId, finalData, 'node-resize');
}
