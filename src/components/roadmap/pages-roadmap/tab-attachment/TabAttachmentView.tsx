import React from 'react';
import BulletPointsComponentTab from '@components/roadmap/pages-roadmap/tab-attachment/components/BulletPointsComponentTab';
import { rightWrapper } from '@components/roadmap/pages-roadmap/Wrappers';
import { useStore } from '@nanostores/react';
import { selectedTabNode } from '@store/roadmap-refactor/display/tab-attachment/selected-tab';
import { getNodeByIdRoadmapSelector } from '@src/typescript/roadmap_ref/roadmap-data/services/get';
import { setDisplayPageType } from '@store/roadmap-refactor/display/display-manager';
import { tailwindTransitionClass } from '@src/UI-library/tailwind-utils';
import {
  type IAttachmentTabComponentProperties,
  typeGuardTabBulletListProperties,
  typeGuardTabDescriptionProperties,
  typeGuardTabLinkProperties,
  typeGuardTabTitleProperties,
} from '@type/roadmap/node/tab-types';
import TitleComponentTab from '@components/roadmap/pages-roadmap/tab-attachment/components/TitleComponentTab';
import DescriptionComponentTab from '@components/roadmap/pages-roadmap/tab-attachment/components/DescriptionComponentTab';
import LinkComponentTab from '@components/roadmap/pages-roadmap/tab-attachment/components/LinkComponentTab';
import { usePressEsc } from '@hooks/usePressEsc';
import closeSvg from '@assets/cross.svg';

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

  usePressEsc(() => {
    setDisplayPageType('closed');
  });

  return (
    <div className='w-full h-full flex-col overflow-y-auto overflow-x-hidden'>
      <div className='flex justify-between mt-7'>
        <h2 className='text-3xl text-black font-medium font-kanit-text'>
          {componentMapper(components[0])}
        </h2>
        <div className='pr-9'>
          <button
            type='button'
            onClick={() => {
              setDisplayPageType('closed');
            }}
            className={`hover:bg-gray-200 ${tailwindTransitionClass}`}
          >
            <img
              src={closeSvg.src}
              className='w-8 h-8'
              alt='Close button for editor'
            />
          </button>
        </div>
      </div>
      {/* <div className='px-9'> */}
      {/*  <StatusDropdown nodeId={nodeId} attachment={attachment} /> */}
      {/* </div> */}
      {components.slice(1).map((component) => {
        return componentMapper(component);
      })}
    </div>
  );
};

export default rightWrapper(TabAttachmentView);
