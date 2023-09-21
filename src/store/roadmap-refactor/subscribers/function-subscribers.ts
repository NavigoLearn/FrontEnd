import { atom } from 'nanostores';
import { type HashMapWithKeys } from '@type/roadmap/misc';

export type IHubs =
  | 'mutateNodeWidth'
  | 'mutateNodeHeight'
  | 'mutateNodeCoordX'
  | 'mutateNodeCoordY';
export const hubsSubscribers = atom(
  {} as HashMapWithKeys<IHubs, (() => void)[]>
);

export const subscribeToHub = (hub: IHubs, callback: () => void) => {
  const subscribers = hubsSubscribers.get();
  if (!subscribers[hub]) {
    subscribers[hub] = [];
  }
  subscribers[hub].push(callback);
  hubsSubscribers.set(subscribers);
};

export const unsubscribeFromHub = (hub: IHubs, callback: () => void) => {
  const subscribers = hubsSubscribers.get();
  if (!subscribers[hub]) {
    return;
  }
  subscribers[hub] = subscribers[hub].filter((cb) => cb !== callback);
  hubsSubscribers.set(subscribers);
};

export const triggerHub = (hub: IHubs) => {
  const subscribers = hubsSubscribers.get();
  if (!subscribers[hub]) {
    return;
  }
  subscribers[hub].forEach((cb) => cb());
};

type TriggerFunctionHubs<T extends any[]> = (...args: T) => any;

export function triggerHubListeners<T extends any[]>(
  hub: IHubs,
  func: TriggerFunctionHubs<T>
): TriggerFunctionHubs<T> {
  return (...args: T) => {
    func(...args);
    triggerHub(hub);
  };
}
