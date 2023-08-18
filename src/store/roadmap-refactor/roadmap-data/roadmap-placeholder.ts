import { atom } from 'nanostores';
import { Roadmap } from '@type/roadmap/stores/roadmap';

const roadmapPlaceholder = atom({
  nodes: {
    // '0': classicNodeFactoryBoilerplate(),
  }, // the nodes-page json will contain only the nodes-page currently in elements-editing mode
  // if you want to get the node just search it by id
  connections: {},
  chunks: {},
} as Roadmap);

export default roadmapPlaceholder;
