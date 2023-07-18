import { ITabComponentProperties } from '@type/roadmap/node/tab-types';
import { IAttachmentOptions } from '@type/roadmap/node/options-types';
import { generateId } from '@typescript/roadmap_ref/node/core/misc';
import { IAction } from '@type/roadmap/node/actions-types';

export class Attachment {
  name = '';

  id = '';

  type: IAttachmentOptions;
}

export class AttachmentTab extends Attachment {
  // contains strictly the components specific to a tab-attachment
  components: ITabComponentProperties[] = [];

  availableActions: IAction[] = [
    {
      type: 'Open Tab',
      action: () => {
        // dispatching the current tab Id to a store to set
      },
    },
  ];

  constructor() {
    super();
    this.id = generateId();
    this.type = 'Tab';
  }
}
