import { NodeClass } from '@src/typescript/roadmap_ref/node/core/core';
import chunksStore from '@store/roadmap-refactor/render/rendered-chunks';
import { injectChunkData } from '@src/typescript/roadmap_ref/node/core/factories/data-mutation/inject';

export function recalculateNodeCenter(node: NodeClass) {
  const { width, height } = node.data;
  node.data.center = {
    x: width / 2,
    y: height / 2,
  };
}

export function recalculateNodeChunks(node: NodeClass) {
  const { width, height } = node.data;
  const { x, y } = node.data.coords;
  const { chunkSize } = chunksStore.get();

  // calculates all chunks that are occupied by the node
  const chunks = [];
  const xStart = Math.floor(x / chunkSize);
  const yStart = Math.floor(y / chunkSize);

  const xEnd = Math.floor((x + width) / chunkSize);
  const yEnd = Math.floor((y + height) / chunkSize);

  for (let i = xStart; i <= xEnd; i += 1) {
    for (let j = yStart; j <= yEnd; j += 1) {
      chunks.push(`${i}_${j}`);
    }
  }
  injectChunkData(node, chunks);
}
