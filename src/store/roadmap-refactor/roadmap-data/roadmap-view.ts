import { atom } from 'nanostores';
import { Roadmap } from '@type/roadmap/stores/roadmap';
import { nodeFactoryClassicBoilerplate } from '@src/typescript/roadmap_ref/node/core/factories/templates/classic';

export const roadmapView = atom({
  rootNodesIds: ['0'],
  nodes: {
    '0': nodeFactoryClassicBoilerplate(),
  },
  connections: {},
  chunks: {},
} as Roadmap);
