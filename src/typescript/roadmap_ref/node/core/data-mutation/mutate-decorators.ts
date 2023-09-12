import { recalculateNodeCenter } from '@src/typescript/roadmap_ref/node/core/calculations/general';

type TriggerFunction<T extends any[]> = (...args: T) => any;
type TriggerFunctionListener<T extends any[]> = (...args: T) => any;

export function triggerCenterRecalculationDecorator<T extends any[]>(
  func: TriggerFunction<T>
): TriggerFunction<T> {
  return (...args) => {
    func(...args);
    recalculateNodeCenter(args[0]);
  };
}
