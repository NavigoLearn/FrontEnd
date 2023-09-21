import { type INodeData } from '@src/to-be-organized/undo-redo/undo-types';
import { getNodeByIdRoadmapSelector } from '@src/typescript/roadmap_ref/roadmap-data/services/get';
import {
  endEventRecording,
  startEventRecording,
} from '@src/to-be-organized/undo-redo/store-undo-functionality';

export function startRecordResizeOrDrag(nodeId) {
  const node = getNodeByIdRoadmapSelector(nodeId);
  const initialData: INodeData = {
    x: node.data.coords.x,
    y: node.data.coords.y,
    width: node.data.width,
    height: node.data.height,
  };

  startEventRecording(nodeId, initialData, 'node-resize');
}

export function endRecordResizeOrDrag(nodeId) {
  const node = getNodeByIdRoadmapSelector(nodeId);
  const finalData: INodeData = {
    x: node.data.coords.x,
    y: node.data.coords.y,
    width: node.data.width,
    height: node.data.height,
  };

  endEventRecording(nodeId, finalData, 'node-resize');
}
