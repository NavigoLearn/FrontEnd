import { NodeClass } from '@typescript/roadmap_ref/node/core/core';
import { IAttachmentBuilder } from '@type/roadmap/node/attachments-types';
import { factoryAttachment } from '@typescript/roadmap_ref/node/attachments/factory';
import { v4 as uuidv4 } from 'uuid';
import {
  DescriptionComponent,
  TitleComponent,
} from '@typescript/roadmap_ref/node/components/text/core';

export function appendAttachment(
  node: NodeClass,
  attachment: IAttachmentBuilder
): void {
  const attachmentObject = factoryAttachment(attachment);
  const id = uuidv4();
  node.attachments.push({
    id,
    attachment: attachmentObject,
  });
  // .... other ifs for building other attachments
}

export function appendSubnode(node: NodeClass, id: string) {
  node.nestedNodesIds.push(id);
}

export function appendComponentDescription(
  node: NodeClass,
  descriptionComponent: DescriptionComponent
) {
  const id = uuidv4();
  node.components.push({
    id,
    type: 'Description',
    component: descriptionComponent,
  });
  return id;
}

export function appendComponentTitle(
  node: NodeClass,
  titleComponent: TitleComponent
) {
  const id = uuidv4();
  node.components.push({
    id,
    type: 'Title',
    component: titleComponent,
  });
  return id;
}
