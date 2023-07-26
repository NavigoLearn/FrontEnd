import {
  IAttachmentTabComponentProperties,
  IAttachmentTabDescriptionProperties,
  IAttachmentTabTitleProperties,
  typeGuardTabDescriptionProperties,
  typeGuardTabTitleProperties,
} from '@type/roadmap/node/tab-types';
import DescriptionAttachment from '@components/roadmap/displayers/editor/components/attachment/DescriptionAttachment';
import {
  mutateAttachmentTabDescription,
  mutateAttachmentTabTitle,
} from '@src/typescript/roadmap_ref/node/attachments/tab/mutate';
import TitleAttachment from '@components/roadmap/displayers/editor/components/attachment/TitleAttachment';
import React from 'react';

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
  throw new Error('Component type not found');
}
