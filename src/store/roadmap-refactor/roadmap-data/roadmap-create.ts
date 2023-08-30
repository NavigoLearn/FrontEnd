import { atom } from 'nanostores';
import { IRoadmap } from '@type/roadmap/stores/IRoadmap';

export const roadmapCreate = atom({
  nodes: {},
  connections: {},
  chunks: {},
} as IRoadmap);
