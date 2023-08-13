import React from 'react';
import BulletPointsComponentTab from '@components/roadmap/displayers/tab-attachment/components/BulletPointsComponentTab';
import { rightWrapper } from '@components/roadmap/displayers/Wrappers';
import { useStore } from '@nanostores/react';
import { selectedTabNode } from '@store/roadmap-refactor/display/tab-attachment/selected-tab';
import { getNodeByIdRoadmapSelector } from '@store/roadmap-refactor/roadmap-data/roadmap-selector';
import { setDisplayPageType } from '@store/roadmap-refactor/display/display-manager';
import { tailwindTransitionClass } from '@src/UI-library/tailwind-utils';
import StatusDropdown from '@components/roadmap/displayers/tab-attachment/StatusDropdown';
import {
  IAttachmentTabComponentProperties,
  typeGuardTabBulletListProperties,
  typeGuardTabDescriptionProperties,
  typeGuardTabLinkProperties,
  typeGuardTabTitleProperties,
} from '@type/roadmap/node/tab-types';
import TitleComponentTab from '@components/roadmap/displayers/tab-attachment/components/TitleComponentTab';
import DescriptionComponentTab from '@components/roadmap/displayers/tab-attachment/components/DescriptionComponentTab';
import LinkComponentTab from '@components/roadmap/displayers/tab-attachment/components/LinkComponentTab';

const TabAttachmentView = () => {
  const { nodeId } = useStore(selectedTabNode);
  const node = getNodeByIdRoadmapSelector(nodeId);
  const attachment = node.attachments[0]; // for the moment
  const { components } = attachment;

  function componentMapper(component: IAttachmentTabComponentProperties) {
    if (typeGuardTabTitleProperties(component)) {
      return <TitleComponentTab key={component.id} component={component} />;
    }

    if (typeGuardTabDescriptionProperties(component)) {
      return (
        <DescriptionComponentTab key={component.id} component={component} />
      );
    }

    if (typeGuardTabBulletListProperties(component)) {
      return (
        <BulletPointsComponentTab key={component.id} component={component} />
      );
    }

    if (typeGuardTabLinkProperties(component)) {
      return <LinkComponentTab key={component.id} component={component} />;
    }

    throw new Error('Component type not found');
  }

  console.log(components);
  return (
    <div className='w-full h-full flex-col px-9'>
      <div className='flex justify-between  mt-7'>
        <h2 className='text-3xl text-black font-medium font-kanit-text'>
          Node Title
        </h2>
        <button
          type='button'
          onClick={() => {
            setDisplayPageType('closed');
          }}
          className={`hover:bg-gray-200 ${tailwindTransitionClass}`}
        >
          <img
            src='/editor/close.svg'
            className='w-8 h-8'
            alt='Close button for editor'
          />
        </button>
      </div>
      <StatusDropdown attachment={attachment} />
      {components.map((component) => {
        return componentMapper(component);
      })}
    </div>
  );
};

export default rightWrapper(TabAttachmentView);
