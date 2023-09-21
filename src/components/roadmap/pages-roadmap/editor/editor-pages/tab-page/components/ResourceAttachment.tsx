import React, { useState } from 'react';
import { deleteAttachmentBulletListNewItem } from '@src/typescript/roadmap_ref/node/attachments/tab/delete';
import {
  type IAttachmentTabBulletListItem,
  type IAttachmentTabBulletListProperties,
} from '@type/roadmap/node/tab-types';
import attachmentPageStatus from '@store/roadmap-refactor/display/editor/attachment-page-status';
import { useStore } from '@nanostores/react';
import addCircle from '@assets/add-circle.svg';
import { appendAttachmentBulletListNewItem } from '@src/typescript/roadmap_ref/node/attachments/tab/append';
import { triggerRerenderEditor } from '@store/roadmap-refactor/elements-editing/store-editor-selected-data';
import {
  mutateAttachmentTabBulletListItemLinkURL,
  mutateAttachmentTabBulletListItemText,
} from '@src/typescript/roadmap_ref/node/attachments/tab/mutate';
import { AnimatePresence, motion } from 'framer-motion';
import linkpop from '@assets/linkpop.svg';
import TrashIcon from '@src/UI-library/svg-components/trash/TrashIcon';
import { openRoadmapLink } from '@src/typescript/utils/urlUtils';
import exit from '@assets/editor/close.svg';
import edit from '@assets/editor/edit.svg';

type IResourceAttachmentProps = {
  component: IAttachmentTabBulletListProperties;
};

export const ResourceAttachmentView = ({
  component,
}: IResourceAttachmentProps) => {
  if (!component.bulletListItems || component.bulletListItems.length === 0) {
    return (
      <div>
        <div className='text-gray-400 font-roboto-text mb-2 px-9'>
          Resources
        </div>
        <div className='text-darkBlue font-roboto-text px-9'>
          No resources available yet.
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className='text-gray-400 font-roboto-text mb-2 px-9'>Resources</div>
      {component.bulletListItems.map((item, index) => {
        const isLastItem = index === component.bulletListItems.length;

        return (
          <div
            key={item.id}
            className={`w-full flex justify-between items-center my-1 ${
              isLastItem ? '' : 'border-t border-gray-300'
            }`}
          >
            <button
              type='button'
              onClick={() => openRoadmapLink(item.linkURL)}
              className='px-9 my-2 flex flex-row items-center gap-12'
            >
              <div className='text-darkBlue text-lg font-semibold w-96 text-start break-words'>
                {item.text}
              </div>
              <img
                src={linkpop.src}
                alt='pressLinkButton'
                className='w-6 h-6 mt-1'
              />
            </button>
          </div>
        );
      })}
    </div>
  );
};

type IResourceBulletListItemDropdownProps = {
  component: IAttachmentTabBulletListProperties;
  listItem: IAttachmentTabBulletListItem;
  toggleDropdown: () => void;
};
const ResourceBulletListItemDropdown = ({
  component,
  listItem,
  toggleDropdown,
}: IResourceBulletListItemDropdownProps) => {
  return (
    <div className='w-full h-full p-4 flex flex-col gap-1 font-roboto-text text-darkBlue'>
      <button
        className='w-5 h-5 absolute top-1 right-1'
        type='button'
        onClick={() => toggleDropdown()}
      >
        <img src={exit.src} alt='exitBUtton' />
      </button>
      <input
        className='border p-1 border-placeholderBlack outline-none rounded-md mt-2 mr-2'
        value={listItem.text}
        onChange={(e) => {
          const newValue = e.target.value;
          mutateAttachmentTabBulletListItemText(
            component,
            listItem.id,
            newValue
          );
          triggerRerenderEditor();
        }}
      />
      <input
        className='border p-1 border-placeholderBlack outline-none rounded-md mr-2'
        value={listItem.linkURL}
        onChange={(e) => {
          const newValue = e.target.value;
          mutateAttachmentTabBulletListItemLinkURL(
            component,
            listItem.id,
            newValue
          );
          triggerRerenderEditor();
        }}
      />
    </div>
  );
};

type IResourceBulletListItemProps = {
  component: IAttachmentTabBulletListProperties;
  item: IAttachmentTabBulletListItem;
};
const ResourceBulletListItem = ({
  component,
  item,
}: IResourceBulletListItemProps) => {
  const [dropdown, setDropdown] = useState(false);
  const toggleDropdown = () => {
    setDropdown((prev) => !prev);
  };

  return (
    <div
      key={item.id}
      className='w-full flex relative justify-between items-center px-3 mt-1'
    >
      <section>
        <div
          className='text-darkBlue text-lg font-semibold w-80 break-words select-none'
          onDoubleClick={() => setDropdown(true)}
          onClick={() => {
            setDropdown(false);
          }}
        >
          {item.text}
        </div>
        <div
          className='text-darkBlue text-sm font-medium w-80 break-words select-none'
          onDoubleClick={() => setDropdown(true)}
          onClick={() => {
            setDropdown(false); // Close the dropdown with a single click if it's open
          }}
        >
          {item.linkURL}
        </div>
      </section>
      <div className='flex gap-4'>
        <button
          onClick={() => {
            setDropdown((prev) => !prev);
          }}
          type='button'
        >
          <img src={edit.src} className='w-7 h-7' alt='Edit button for link' />
        </button>
        <button
          onClick={() => {
            deleteAttachmentBulletListNewItem(component, item.id);
            triggerRerenderEditor();
          }}
          type='button'
        >
          <TrashIcon />
        </button>
      </div>
      <AnimatePresence>
        {dropdown && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className='absolute w-64 bg-white top-14 shadow-xl border-2 border-placeholderBlack rounded-lg z-20'
          >
            <ResourceBulletListItemDropdown
              component={component}
              listItem={item}
              toggleDropdown={toggleDropdown}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ResourceAttachmentEdit = ({ component }: IResourceAttachmentProps) => {
  return (
    <div className='flex gap-1 w-full relative flex-col border border-placeholderBlack rounded-lg pb-4'>
      <div className='flex justify-between px-4  w-full mt-4'>
        <h1 className='text-secondary font-roboto-text'>Resources</h1>
        <button
          onClick={() => {
            appendAttachmentBulletListNewItem(component);
            triggerRerenderEditor();
          }}
          type='button'
        >
          <img src={addCircle.src} alt='addingResources' className='h-7 w-7' />
        </button>
      </div>
      {component.bulletListItems.map((item) => {
        return (
          <ResourceBulletListItem
            key={item.id}
            component={component}
            item={item}
          />
        );
      })}
    </div>
  );
};

const ResourceAttachment = ({ component }: IResourceAttachmentProps) => {
  const { status } = useStore(attachmentPageStatus);
  const { isEditing } = status;

  return (
    <div>
      {isEditing && <ResourceAttachmentEdit component={component} />}
      {!isEditing && <ResourceAttachmentView component={component} />}
    </div>
  );
};

export default ResourceAttachment;
