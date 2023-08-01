import {
  IAttachmentTabComponentProperties,
  IAttachmentTabDescriptionProperties,
  IAttachmentTabTitleProperties,
  IAttachmentTabLinkProperties,
  typeGuardTabDescriptionProperties,
  typeGuardTabTitleProperties,
  typeGuardTabLinkProperties,
} from '@type/roadmap/node/tab-types';
import DescriptionAttachment from '@components/roadmap/displayers/editor/components/attachment/DescriptionAttachment';
import {
  mutateAttachmentTabDescription,
  mutateAttachmentTabTitle,
} from '@src/typescript/roadmap_ref/node/attachments/tab/mutate';
import TitleAttachment from '@components/roadmap/displayers/editor/components/attachment/TitleAttachment';
import React from 'react';
import ResourceAttachment from './ResourceAttachment';

export const descriptionBuilder = (
  component: IAttachmentTabDescriptionProperties
) => {
  return (
    <DescriptionAttachment
      value={component.descriptionText}
      onChange={(field: string, newValue: any) => {
        mutateAttachmentTabDescription(component, 'descriptionText', newValue);
      }}
    />
  );
};

export const titleBuilder = (component: IAttachmentTabTitleProperties) => {
  return (
    <TitleAttachment
      value={component.titleText}
      onChange={(field: string, newValue: any) => {
        mutateAttachmentTabTitle(component, 'titleText', newValue);
      }}
    />
  );
};

export const resourceBuilder = (component: IAttachmentTabLinkProperties) => {
  return <ResourceAttachment value={component.linkURL} onChange={() => {}} />;
};

export function componentMapper(component: IAttachmentTabComponentProperties) {
  if (component.type === 'Title') {
    if (!typeGuardTabTitleProperties(component)) {
      throw new Error('Component type not found');
    }
    return titleBuilder(component);
  }
  if (component.type === 'Description') {
    if (!typeGuardTabDescriptionProperties(component)) {
      throw new Error('Component type not found');
    }
    return descriptionBuilder(component);
  }

  if (component.type === 'Link') {
    if (!typeGuardTabLinkProperties(component)) {
      throw new Error('Component type not found');
    }
    return resourceBuilder(component);
  }
  throw new Error('Component type not found');
}
