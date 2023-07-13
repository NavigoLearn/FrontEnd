import { factoryTabAttachment } from '@typescript/roadmap_ref/node/attachments/factory';
import { IAttachmentOptions } from '@type/roadmap/node/attachments-types';

export class Attachment {
  type: IAttachmentOptions;
  constructor(type: IAttachmentOptions) {
    this.type = type;
    if (type === 'Tab') {
      factoryTabAttachment([
        {
          type: 'Title',
          titleText: 'My Title',
        },
        {
          type: 'Description',
          descriptionText: 'My Description',
        },
      ]);
    }
  }
}
