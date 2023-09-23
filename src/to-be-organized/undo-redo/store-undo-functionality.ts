import { atom } from 'nanostores';
import {
  type INodeResizeEvent,
  type IRoadmapEvents,
  type INodeData,
  defaultNodeRecordingData,
  type IEventTypes,
} from '@src/to-be-organized/undo-redo/undo-types';

const MAXIMUM_UNDO_STACK_LENGTH = 100;

export const storeUndoStack = atom({
  stack: [],
} as {
  stack: IRoadmapEvents[];
});

export const storeRedoStack = atom({
  stack: [],
} as {
  stack: IRoadmapEvents[];
});

export const storeRecorder = atom({
  isRecording: false,
  eventType: 'node-resize',
  initialState: {},
  finalState: {},
} as {
  isRecording: boolean;
  eventType: IEventTypes;
  initialState: INodeData;
  finalState: INodeData;
});

export function startEventRecording(
  nodeId: string,
  initialData: INodeData,
  eventType: IEventTypes
) {
  const storeRecorderState = storeRecorder.get();

  storeRecorderState.isRecording = true;
  storeRecorderState.eventType = eventType;
  storeRecorderState.initialState = initialData;
  storeRecorderState.finalState = defaultNodeRecordingData;

  storeRecorder.set({
    ...storeRecorderState,
  });
}

export function endEventRecording(
  nodeId: string,
  finalData: INodeData,
  eventType: IEventTypes
) {
  const { initialState } = storeRecorder.get();

  const event: INodeResizeEvent = {
    eventType,
    nodeId,
    initialData: initialState,
    finalData,
  };

  const { stack } = storeUndoStack.get();
  // a maximum length of 100
  const newStack = [...stack, event];
  if (newStack.length > MAXIMUM_UNDO_STACK_LENGTH) {
    newStack.shift();
  }

  storeUndoStack.set({
    stack: [...stack, event],
  });

  storeRecorder.set({
    isRecording: false,
    eventType: 'node-resize',
    initialState: defaultNodeRecordingData,
    finalState: defaultNodeRecordingData,
  });
}
