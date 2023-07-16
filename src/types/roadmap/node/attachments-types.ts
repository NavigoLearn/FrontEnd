import { AttachmentTab } from '@typescript/roadmap_ref/node/attachments/tab/core';
import { IIdentifiers } from '@type/roadmap/node/core-types';

export type IAttachmentOptions = 'Tab';

export type IAttachmentObject = IIdentifiers &
  (
    | {
        type: 'Tab';
        attachment: AttachmentTab;
      }
    | {
        type: 'Tabelse2';
        attachment: {
          placeholder: number;
        };
      }
  );
