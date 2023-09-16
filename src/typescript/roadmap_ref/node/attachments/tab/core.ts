import { IAttachmentTabComponentProperties } from '@type/roadmap/node/tab-types';
import { IAttachmentOptions } from '@type/roadmap/node/options-types';
import { generateId } from '@src/typescript/roadmap_ref/node/core/misc';

export class Attachment {
  name = '';

  id = '';

  type: IAttachmentOptions;
}

export type IAttachmentTabStatus =
  | 'Completed'
  | 'In Progress'
  | 'Skip'
  | 'Status';

export const attachmentTabStatusArray: IAttachmentTabStatus[] = [
  'Status',
  'In Progress',
  'Completed',
  'Skip',
];

export class AttachmentTab extends Attachment {
  // contains strictly the reusable-components-page specific to a tab-tab-page
  components: IAttachmentTabComponentProperties[] = [];

  constructor() {
    super();
    this.id = generateId();
    this.type = 'Tab';
  }
}
