import React, { useEffect, useRef, useState } from 'react';
import HOCOnChange from '@src/HOC-library/store-based-hoc/OnChangeStore';
import { componentMapper } from '@components/roadmap/displayers/editor/components/attachment/logic';
import { useStore } from '@nanostores/react';
import editorSelectedData, {
  triggerRerenderEditor,
} from '@store/roadmap-refactor/elements-editing/editor-selected-data';
import { getAttachmentByIndex } from '@src/typescript/roadmap_ref/node/core/data-get/attachments';
import { IAttachmentTabComponentTypes } from '@type/roadmap/node/tab-types';
import { IAttachmentPageStatus } from '@store/roadmap-refactor/display/editor/attachment-page-status';
import { getNodeByIdRoadmapSelector } from '@src/typescript/roadmap_ref/roadmap-data/services/get';
import { AnimatePresence, motion } from 'framer-motion';

type IMapper = {
  [key in IAttachmentTabComponentTypes]: React.ReactNode;
};

type ITabAttachmentProps = {
  onChange: (value: IAttachmentPageStatus) => void;
  value: IAttachmentPageStatus;
};

type IEditButtonProps = {
  onChange: () => void;
};

const EditButton = ({ onChange }: IEditButtonProps) => {
  return (
    <button
      type='button'
      className='px-10 py-2 bg-blue-600 text-white rounded-lg text-lg font-medium flex'
      onClick={() => {
        onChange();
      }}
    >
      Edit
    </button>
  );
};

type IPreviewButtonProps = {
  onChange: () => void;
};

const PreviewButton = ({ onChange }: IPreviewButtonProps) => {
  return (
    <button
      type='button'
      className='px-10 py-2 bg-blue-600 text-white rounded-lg text-lg font-medium'
      onClick={() => {
        onChange();
      }}
    >
      Save
    </button>
  );
};

const TabAttachmentEditor = ({ onChange, value }: ITabAttachmentProps) => {
  const { selectedNodeId } = useStore(editorSelectedData);
  const node = getNodeByIdRoadmapSelector(selectedNodeId);
  const attachment = getAttachmentByIndex(node, 0);
  const { isEditing } = value;
  const divRef = useRef(null);
  const [scrollable, setScrollable] = useState(false);

  const isScrollable = function () {
    if (!divRef.current) return false;
    const ele = divRef.current;
    const hasScrollableContent = ele.scrollHeight > ele.clientHeight;
    const overflowYStyle = window.getComputedStyle(ele).overflowY;
    const isOverflowHidden = overflowYStyle.indexOf('hidden') !== -1;

    return hasScrollableContent && !isOverflowHidden;
  };

  useEffect(() => {
    setScrollable(isScrollable());
  });

  return (
    <div className='w-full h-full pb-10 relative '>
      <div
        ref={divRef}
        className={`h-[calc(100%-80px)] overflow-auto pr-3 ${
          isEditing ? 'px-7' : 'none'
        }`}
      >
        {attachment.components.map((component, index) => {
          return (
            // eslint-disable-next-line react/no-array-index-key
            <div key={index} className={`${isEditing ? 'my-5' : 'none'}`}>
              {componentMapper(component)}
            </div>
          );
        })}
      </div>
      <AnimatePresence>
        {scrollable && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className='absolute w-full text-purple-500 font-semibold text-lg text-center bottom-16'
          >
            Scroll me
          </motion.div>
        )}
      </AnimatePresence>
      <div className='absolute bottom-4 right-4 pl-4'>
        {!isEditing && (
          <EditButton
            onChange={() => {
              onChange({ isEditing: true });
              triggerRerenderEditor();
            }}
          />
        )}
        {isEditing && (
          <PreviewButton
            onChange={() => {
              onChange({ isEditing: false });
              triggerRerenderEditor();
            }}
          />
        )}
      </div>
    </div>
  );
};

export default HOCOnChange(TabAttachmentEditor);
