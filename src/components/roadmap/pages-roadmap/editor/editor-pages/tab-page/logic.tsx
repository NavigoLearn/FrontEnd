import {
  type IAttachmentTabBulletListProperties,
  type IAttachmentTabComponentProperties,
  type IAttachmentTabDescriptionProperties,
  type IAttachmentTabLinkProperties,
  type IAttachmentTabTitleProperties,
  typeGuardTabBulletListProperties,
  typeGuardTabDescriptionProperties,
  typeGuardTabLinkProperties,
  typeGuardTabTitleProperties,
} from '@type/roadmap/node/tab-types';
import DescriptionAttachment from '@components/roadmap/pages-roadmap/editor/editor-pages/tab-page/components/DescriptionAttachment';
import {
  mutateAttachmentTabComponentDescription,
  mutateAttachmentTabComponentTitle,
} from '@src/typescript/roadmap_ref/node/attachments/tab/mutate';
import TitleAttachment from '@components/roadmap/pages-roadmap/editor/editor-pages/tab-page/components/TitleAttachment';
import React from 'react';
import { nodeNameSyncer } from '@src/typescript/roadmap_ref/node/misc';
import {
  getSelectedNodeId,
  triggerRerenderEditor,
} from '@store/roadmap-refactor/elements-editing/store-editor-selected-data';
import ResourceAttachment from './components/ResourceAttachment';

export const descriptionBuilder = (
  component: IAttachmentTabDescriptionProperties
) => {
  return (
    <DescriptionAttachment
      value={component.descriptionText}
      onChange={(field: string, newValue: any) => {
        mutateAttachmentTabComponentDescription(
          component,
          'descriptionText',
          newValue
        );
      }}
    />
  );
};

export const titleBuilder = (component: IAttachmentTabTitleProperties) => {
  return (
    <TitleAttachment
      value={component.titleText}
      onChange={(field: string, newValue: any) => {
        mutateAttachmentTabComponentTitle(component, 'titleText', newValue);
        triggerRerenderEditor();
        nodeNameSyncer(getSelectedNodeId(), newValue);
      }}
    />
  );
};

export const resourceBuilder = (
  component: IAttachmentTabBulletListProperties
) => {
  return <ResourceAttachment component={component} />;
};

export const linkBuilder = (component: IAttachmentTabLinkProperties) => {
  return <div>Link not implemented yet</div>;
};

export function componentMapper(component: IAttachmentTabComponentProperties) {
  if (component.type === 'Title') {
    if (!typeGuardTabTitleProperties(component)) {
      throw new Error('Component typeguard is wrong somewhere');
    }
    return titleBuilder(component);
  }
  if (component.type === 'Description') {
    if (!typeGuardTabDescriptionProperties(component)) {
      throw new Error('Component typeguard is wrong somewhere');
    }
    return descriptionBuilder(component);
  }

  if (component.type === 'BulletList') {
    if (!typeGuardTabBulletListProperties(component)) {
      throw new Error('Component typeguard is wrong somewhere');
    }
    return resourceBuilder(component);
  }

  if (component.type === 'Link') {
    if (!typeGuardTabLinkProperties(component)) {
      throw new Error('Component typeguard is wrong somewhere');
    }
    // lol eugene e mad pe alexander - Antonel
    // eugene e un mad kid in general - Alex
    return <div>Fucking rus didnt finish the task and I didnt check it</div>;
  }
  throw new Error('Component type not found');
}
