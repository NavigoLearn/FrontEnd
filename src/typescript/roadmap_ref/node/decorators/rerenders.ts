import { triggerRerenderEditor } from '@store/roadmap-refactor/elements-editing/store-editor-selected-data';

type TriggerFunctionGeneral<T extends any[]> = (...args: T) => any;

export function decoratorTriggerRerenderEditor<T extends any[]>(
  func: TriggerFunctionGeneral<T>
): TriggerFunctionGeneral<T> {
  return (...args: T) => {
    func(...args);
    triggerRerenderEditor();
  };
}
