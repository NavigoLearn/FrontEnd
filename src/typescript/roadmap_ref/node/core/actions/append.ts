import { NodeClass } from '@src/typescript/roadmap_ref/node/core/core';
import { type IActionTypes } from '@src/typescript/roadmap_ref/node/core/actions/core';

export function appendAction(node: NodeClass, action: IActionTypes) {
  const { actions } = node;
  actions.possibleActions.push(action);
}
