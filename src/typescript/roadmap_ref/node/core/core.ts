import { IDataKeys, IDataKeysFields } from '@type/roadmap/node/core-types';
import { Flags } from '@typescript/roadmap_ref/node/core/flags';

import { Actions } from '@typescript/roadmap_ref/node/core/actions';
import { DraggingBehavior } from '@typescript/roadmap_ref/dragging/core';
import { Properties } from '@typescript/roadmap_ref/node/core/properties';
import { IAttachmentObject } from '@type/roadmap/node/attachments-types';
import { IComponentsObject } from '@type/roadmap/node/components-types';

export class NodeClass {
  components: ({
    id: string;
  } & IComponentsObject)[] = []; // title, description, button and anything inside the node

  properties: Properties = new Properties(); // properties of the node itself

  nestedNodesIds: string[] = []; // reference to other NodeClasses from the roadmap

  attachments: {
    id: string;
    attachment: IAttachmentObject;
  }[] = []; // special components that are much more customizable and special, meant for any kind of interraction

  actions: Actions; // the actions that are set on the node

  availableActions: {
    [key: string]: () => void;
  }; // the actions that can be set on the node

  draggingBehavior: DraggingBehavior; // the dragging behavior of the node

  flags: Flags = new Flags(); // flags to indificate different behaviors of the node

  // @ts-ignore
  data: {
    id: string;
    centerCoords: {
      x: number;
      y: number;
    };
  } & {
    [key in IDataKeys]: IDataKeysFields[key];
  } = {
    id: '',
    centerCoords: {
      x: 0,
      y: 0,
    },
  }; // data related to parents, connection stuff in general
}

// Represents the Component class
