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
  original.chunkRerenderTrigger();
}

export function setChunkSize(newChunkSize: number) {
  const original = chunksStore.get();
  chunksStore.set({ ...original, chunkSize: newChunkSize });
}

export default chunksStore;
