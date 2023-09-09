import { atom } from 'nanostores';

const chunksStore = atom({
  chunks: [], // ids of all the chunks currently visible on the screen
  chunkSize: 400,
  chunkRerenderTrigger: () => {
    // function for reRendering chunks if something like adding a new Node happens
    // is set from the Roadmap
  },
} as {
  chunks: string[];
  chunkSize: number;
  chunkRerenderTrigger: () => void;
});

export function setChunks(newChunks: string[]) {
  const original = chunksStore.get();
  chunksStore.set({
    ...original,
    chunks: newChunks,
  });
}

export function setChunkRerenderTrigger(newTrigger: () => void) {
  const original = chunksStore.get();
  chunksStore.set({
    ...original,
    chunkRerenderTrigger: newTrigger,
  });
}

export function triggerChunkRerender() {
  const original = chunksStore.get();
  if (!original.chunkRerenderTrigger)
    throw new Error('Chunk rerender trigger is not set');
  original.chunkRerenderTrigger();
}
export function getChunkRerenderTrigger() {
  const original = chunksStore.get();
  return original.chunkRerenderTrigger;
}

export default chunksStore;
