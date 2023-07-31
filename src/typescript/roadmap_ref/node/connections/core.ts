import { randomId } from '@src/typescript/roadmap_ref/node/core/calculations/general';

export type IConnectionTypes = 'continuous' | 'dashed';
export class Connection {
  id: string;

  from: string;

  to: string;

  type: IConnectionTypes = 'dashed';

  speed = 1;

  constructor(from: string, to: string) {
    this.id = randomId();
    this.from = from;
    this.to = to;
  }
}
