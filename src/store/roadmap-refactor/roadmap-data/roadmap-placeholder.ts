import { atom } from 'nanostores';
import { IRoadmap } from '@type/roadmap/stores/IRoadmap';

const roadmapPlaceholder = atom({
  nodes: {
    // '0': classicNodeFactoryBoilerplate(),
  }, // the nodes-page json will contain only the nodes-page currently in elements-editing mode
  // if you want to get the node just search it by id
  connections: {},
  chunks: {},
} as IRoadmap);

export default roadmapPlaceholder;
