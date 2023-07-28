import { atom } from 'nanostores';
import { Roadmap } from '@type/roadmap/stores/roadmap';

export const roadmapCreate = atom({
  nodes: {},
  connections: {},
  chunks: {},
} as Roadmap);
