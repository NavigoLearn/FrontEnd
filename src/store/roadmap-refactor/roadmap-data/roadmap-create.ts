import { atom } from 'nanostores';
import { Roadmap } from '@type/roadmap/stores/roadmap';

const roadmapPlaceholder = atom({
  nodes: {},
  connections: {},
  chunks: {},
} as Roadmap);
