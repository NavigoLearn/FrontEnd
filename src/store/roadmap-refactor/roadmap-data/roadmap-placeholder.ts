import { atom } from 'nanostores';
import { Roadmap } from '@type/roadmap/stores/roadmap';
import { classicNodeFactoryBoilerplate } from '@typescript/roadmap_ref/node/core/factories/templates/classic';

const roadmapPlaceholder = atom({
  nodes: {
    '0': classicNodeFactoryBoilerplate(),
  }, // the nodes json will contain only the nodes currently in elements-editing mode
  // if you want to get the node just search it by id
  connections: {},
  chunks: {},
} as Roadmap);

export default roadmapPlaceholder;
