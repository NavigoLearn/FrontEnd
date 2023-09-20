export type IEventTypes = 'node-resize';

export type INodeData = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export const defaultNodeRecordingData: INodeData = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
};

export type INodeResizeEvent = {
  eventType: 'node-resize';
  nodeId: string;
  initialData: INodeData;
  finalData: INodeData;
};

export type IRoadmapEvents = INodeResizeEvent;
