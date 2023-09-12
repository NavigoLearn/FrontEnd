import { atom } from 'nanostores';

const connectionsTriggers = atom({
  triggers: {}, // all the rerender triggers for the nodes-page
} as {
  triggers: any;
});

export function addConnectionTrigger(id: string, cb: any) {
  const original = connectionsTriggers.get();
  original.triggers[id] = cb;
  connectionsTriggers.set({
    ...original,
  });
}

export function triggerConnectionRerender(id: string) {
  const original = connectionsTriggers.get();
  original.triggers[id]();
}
