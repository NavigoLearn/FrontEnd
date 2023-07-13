import { ITabComponentProperties } from '@type/roadmap/node/tab-types';
import {
  TabAttachment,
  TabComponent,
} from '@typescript/roadmap_ref/node/attachments/tab';
import {
  IAttachmentBuilder,
  IAttachmentObject,
} from '@type/roadmap/node/attachments-types';

function factoryTabComponent(
  componentProperties: ITabComponentProperties
): TabComponent {
  return new TabComponent(componentProperties);
}

export function factoryTabAttachment(components: ITabComponentProperties[]) {
  const attachment = new TabAttachment();
  for (const component of components) {
    attachment.components.push(factoryTabComponent(component));
  }
  return attachment;
}

export function factoryAttachment(
  attachment: IAttachmentBuilder
): IAttachmentObject {
  if (attachment.type === 'Tab') {
    return {
      type: 'Tab',
      tabAttachment: factoryTabAttachment(attachment.components),
    };
  }
  //.... other ifs for building other attachments
}
