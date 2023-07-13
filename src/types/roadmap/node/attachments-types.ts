import { ITabComponentProperties } from '@type/roadmap/node/tab-types';
import { TabAttachment } from '@typescript/roadmap_ref/node/attachments/tab';

export type IAttachmentOptions = 'Tab';

export type IAttachmentBuilder =
  | ({
      type: 'Tab';
    } & {
      components: ITabComponentProperties[];
    })
  | ({
      type: 'ultra mega fine attachment';
    } & {
      onClick: () => void;
      properties: {
        ceva1: string;
        ceva2: string;
        arr: string[];
      };
      anotherfunc: () => void;
    });

export type IAttachmentObject =
  | ({
      type: 'Tab';
    } & {
      tabAttachment: TabAttachment;
    })
  | ({
      type: 'Tabelse2';
    } & {
      someotherprop242: string;
    });
