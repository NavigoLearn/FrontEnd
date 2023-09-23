import { type IMouseDragDirection } from '@src/to-be-organized/resize-dragging/stores-resize-node';
import {
  getResizeComponentInitialSize,
  getResizeComponentRef,
} from '@src/to-be-organized/resize-dragging/stores-resize-components';
import { mutateComponentWidth } from '@src/typescript/roadmap_ref/node/components/mutate';

type IMutateFunction = (deltaXMouse: number, deltaYMouse: number) => void;

export function getResizeComponentCallbacks(
  direction: IMouseDragDirection
): IMutateFunction {
  const component = getResizeComponentRef();
  return (deltaXMouse, deltaYMouse) => {
    const { width, height } = getResizeComponentInitialSize();
    mutateComponentWidth(component, width + deltaXMouse * 2);
  };
}
