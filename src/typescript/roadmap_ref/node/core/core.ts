import { INodeData } from '@type/roadmap/node/core-types';
import { Flags } from '@src/typescript/roadmap_ref/node/core/flags';

import { Actions } from '@src/typescript/roadmap_ref/node/core/actions';
import { DraggingBehavior } from '@src/typescript/roadmap_ref/dragging/core';
import { Properties } from '@src/typescript/roadmap_ref/node/core/properties';
import { IAttachmentObject } from '@type/roadmap/node/attachments-types';
import { IComponentObject } from '@type/roadmap/node/components-types';

export class NodeClass {
  components: IComponentObject[] = []; // title, description, button and anything inside the node

  properties: Properties = new Properties(); // properties of the node itself

  nestedNodesIds: string[] = []; // reference to other NodeClasses from the roadmap

  attachments: IAttachmentObject[] = []; // special components that are much more customizable and special, meant for any kind of interraction

  actions: Actions = new Actions(); // the actions that are set on the node

  draggingBehavior: DraggingBehavior; // the dragging behavior of the node

  flags: Flags = new Flags(); // flags to indificate different behaviors of the node

  id = '0';

  name = 'Node';

  // @ts-ignore
  data: INodeData = {
    // used if there is dynamically injected data
  }; // roadmap-data related to parents, connection stuff and misc things I couldn't find a place general
}
