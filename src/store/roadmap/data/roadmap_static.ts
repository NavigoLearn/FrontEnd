import { atom } from 'nanostores';
import { Roadmap } from '@type/roadmap/old/roadmap';

const roadmapStatic = atom({} as Roadmap);

export function getNodeById(id: string) {
  const original = roadmapStatic.get();
  return original.nodes[id];
}

export default roadmapStatic;
