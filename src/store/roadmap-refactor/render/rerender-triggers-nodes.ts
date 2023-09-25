import { atom } from 'nanostores';

const nodeTriggers = atom({
  triggers: {}, // all the rerender triggers for the nodes-page
  disableTriggers: {}, // triggers for disabling the dragging
  enableTriggers: {}, // triggers for enabling the dragging
  tooltipTriggers: {}, // triggers for showing the tooltip
} as {
  triggers: any;
  disableTriggers: any;
  enableTriggers: any;
  tooltipTriggers: any;
});

export function setTriggerTooltip(id: string, cb: any) {
  const original = nodeTriggers.get();
  original.tooltipTriggers[id] = cb;
  nodeTriggers.set({
    ...original,
  });
}

export function getTriggerTooltip(id: string) {
  const original = nodeTriggers.get();
  return original.tooltipTriggers[id];
}

export function triggerNodeRerender(id: string) {
  const original = nodeTriggers.get();
  original.triggers[id]();
}

export function triggerAllNodesRerender() {
  const original = nodeTriggers.get();
  Object.keys(original.triggers).forEach((id) => {
    original.triggers[id]();
  });
}

export function setTriggerRender(id: string, cb: any) {
  const original = nodeTriggers.get();
  original.triggers[id] = cb;
  nodeTriggers.set({
    ...original,
  });
}

export function setTriggerDisable(id: string, cb: any) {
  const original = nodeTriggers.get();
  original.disableTriggers[id] = cb;
  nodeTriggers.set({
    ...original,
  });
}

export function setTriggerEnable(id: string, cb: any) {
  const original = nodeTriggers.get();
  original.enableTriggers[id] = cb;
  nodeTriggers.set({
    ...original,
  });
}

export function getNodeTriggerRender(id: string) {
  const original = nodeTriggers.get();
  return original.triggers[id];
}

export function getTriggerDisable(id: string) {
  const original = nodeTriggers.get();
  return original.disableTriggers[id];
}

export function getTriggerEnable(id: string) {
  const original = nodeTriggers.get();
  return original.enableTriggers[id];
}

export function getTriggersRenderAll() {
  const original = nodeTriggers.get();
  return original.triggers;
}

export default nodeTriggers;
