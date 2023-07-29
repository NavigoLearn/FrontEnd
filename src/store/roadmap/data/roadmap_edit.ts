import { atom } from 'nanostores';
import { v4 as uuidv4 } from 'uuid';
import { Roadmap } from '@type/roadmap/old/roadmap';
import {
  generateStarterNode,
  generateTabInfo,
} from '@src/typescript/roadmap/generators';
import { cacheTabInfo } from '@store/roadmap/cache/cached-tabs';
import { diffTabInfoNew } from '@store/roadmap/cache/diff-tabs';

export const generateInitialEditCreate = (): Roadmap => {
  // generates the initial state for the create roadmap
  const rootNodeTabId = uuidv4();
  const initialTab = generateTabInfo(
    rootNodeTabId,
    'tab1 Title',
    false,
    '',
    [],
    ''
  );
  cacheTabInfo(rootNodeTabId, initialTab);
  diffTabInfoNew(rootNodeTabId, initialTab);

  return {
    // has the boilerplate for the create roadmap
    nodes: generateStarterNode(rootNodeTabId, 300, 150, 'root', []).nodes,
    connections: {
      // list of all connections
    },
    resources: {
      // list of all resource nodes
    },
    chunks: generateStarterNode(
      rootNodeTabId,
      300,

      150,
      'parent',
      []
    ).chunkNodes,
    info: {
      // list of all tab-attachment info
      tab1: initialTab,
    },
  };
};

const roadmapEdit = atom({} as Roadmap);

export default roadmapEdit;
