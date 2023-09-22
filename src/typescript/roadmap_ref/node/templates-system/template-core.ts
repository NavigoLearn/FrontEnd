import { type HashMap } from '@type/roadmap/misc';
import { NodeClass } from '@src/typescript/roadmap_ref/node/core/core';

export type IRoadmapImage = {
  nodes: HashMap<NodeClass>;
};

export class TemplateNode {
  id: string;

  name: string;

  baseNodeId: string;

  roadmapImage: IRoadmapImage; // an minified image of the roadmap containing only components needed for the template
}
