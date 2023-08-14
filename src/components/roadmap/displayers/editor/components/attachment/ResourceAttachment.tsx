import React, { useRef, useState } from 'react';
import { deleteAttachmentBulletListNewItem } from '@src/typescript/roadmap_ref/node/attachments/tab/delete';
import {
  IAttachmentTabBulletListItem,
  IAttachmentTabBulletListProperties,
} from '@src/types/roadmap/node/tab-types';
import attachmentPageStatus from '@src/store/roadmap-refactor/display/editor/attachment-page-status';
import { useStore } from '@nanostores/react';
import addCircle from '@src/assets/add-circle.svg';
import { appendAttachmentBulletListNewItem } from '@src/typescript/roadmap_ref/node/attachments/tab/append';
import { triggerRerenderEditor } from '@store/roadmap-refactor/elements-editing/editor-selected-data';
import {
  mutateAttachmentTabBulletListItemLinkURL,
  mutateAttachmentTabBulletListItemText,
} from '@src/typescript/roadmap_ref/node/attachments/tab/mutate';
import { AnimatePresence, motion } from 'framer-motion';
import { useClickOutside } from '@hooks/useClickOutside';
import TrashIcon from '@src/UI-library/svg-anims';

type IResourceAttachmentProps = {
  component: IAttachmentTabBulletListProperties;
};

export const ResourceAttachmentView = ({
  component,
}: IResourceAttachmentProps) => {
  return (
    <div>
      <div className='text-gray-400 font-roboto-text'>Resources</div>
      {component.bulletListItems.map((item, index) => {
        return (
          <div
            key={item.id}
            className='w-full flex justify-between items-center my-1'
          >
            <a href={item.linkURL}>
              <div className='text-darkBlue text-lg font-semibold'>
                {item.text}
              </div>
              <div className='text-darkBlue text-sm font-medium'>
                {item.linkURL}
              </div>
            </a>
          </div>
        );
      })}
    </div>
  );
};

type IResourceBulletListItemDropdownProps = {
  component: IAttachmentTabBulletListProperties;
  listItem: IAttachmentTabBulletListItem;
};
const ResourceBulletListItemDropdown = ({
  component,
  listItem,
}: IResourceBulletListItemDropdownProps) => {
  return (
    <div className='w-full h-full p-4'>
      <input
        className='border-2 border-gray-300 outline-none'
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
        className='border-2 border-gray-300 outline-none'
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

  const myDiv = useRef(null);
  useClickOutside(myDiv, () => {
    setDropdown(false);
  });

  return (
    <div
      key={item.id}
      ref={myDiv}
      className='w-full flex relative justify-between items-center px-3 mt-3'
    >
      <section>
        <div className='text-darkBlue text-lg font-semibold'>{item.text}</div>
        <div className='text-darkBlue text-sm font-medium'>{item.linkURL}</div>
      </section>
      <div className='flex gap-4'>
        <button
          onClick={() => {
            setDropdown((prev) => !prev);
          }}
          type='button'
        >
          <img
            src='/editor/edit.svg'
            className='w-7 h-7'
            alt='Edit button for link'
          />
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
            className='absolute w-60 bg-white top-14 shadow-xl border-2 border-gray-200 rounded-lg z-20'
          >
            <ResourceBulletListItemDropdown
              component={component}
              listItem={item}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ResourceAttachmentEdit = ({ component }: IResourceAttachmentProps) => {
  return (
    <div className='flex gap-1 w-full relative flex-col border-2 border-gray-400 rounded-lg pb-4 '>
      <div className='flex justify-between px-4  w-full mt-4'>
        <h1 className='text-darkBlue font-roboto-text'>Resources</h1>
        <button
          onClick={() => {
            appendAttachmentBulletListNewItem(component);
            triggerRerenderEditor();
          }}
          type='button'
        >
          <img src={addCircle} alt='addingResources' className='h-7 w-7' />
        </button>
      </div>
      {component.bulletListItems.map((item, index) => {
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
