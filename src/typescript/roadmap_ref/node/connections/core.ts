import { getRandomId } from '@src/typescript/utils/misc';

export type IConnectionTypes = 'continuous' | 'dashed';
export type IConnectionPositions =
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'
  | 'center'
  | 'left'
  | 'right'
  | 'top'
  | 'bottom';
export class ConnectionClass {
  id: string;

  from: string;

  to: string;

  type: IConnectionTypes = 'dashed';

  positionFrom: IConnectionPositions;

  positionTo: IConnectionPositions;

  constructor(from: string, to: string) {
    this.id = getRandomId();
    this.from = from;
    this.to = to;
    this.positionFrom = 'center';
    this.positionTo = 'center';
  }
}
