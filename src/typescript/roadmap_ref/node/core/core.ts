import { type INodeProperties } from '@type/roadmap/node/core-types';
import { Flags } from '@src/typescript/roadmap_ref/node/core/flags';

import { ActionsClass } from '@src/typescript/roadmap_ref/node/core/actions/core';
import { DraggingBehavior } from '@src/typescript/roadmap_ref/dragging/core';
import { Data } from '@src/typescript/roadmap_ref/node/core/data';
import { type IAttachmentObject } from '@type/roadmap/node/attachments-types';
import { type IComponentObject } from '@type/roadmap/node/components-types';

export type INodeTemplates = 'classic' | 'link';

export class NodeClass {
  components: IComponentObject[] = []; // title, description, button and anything inside the node

  data: Data = new Data(); // properties-page of the node itself

  subNodeIds: string[] = []; // reference to other NodeClasses from the roadmap

  attachments: IAttachmentObject[] = []; // special reusable-components-page that are much more customizable and special, meant for any kind of interraction

  actions: ActionsClass = new ActionsClass(); // the operations-page that are set on the node

  draggingBehavior: DraggingBehavior; // the dragging behavior of the node

  connections: string[] = []; // connections to other nodes-page

  flags: Flags = new Flags(); // flags to indicate different behaviors of the node

  id = '0';

  name = 'Node';

  // @ts-ignore
  properties: INodeProperties = {
    // used if there is dynamically injected data
  }; // roadmap-data related to parents, connection stuff and misc things I couldn't find a place general

  constructor(id?) {
    if (id) this.id = id;
  }
}
