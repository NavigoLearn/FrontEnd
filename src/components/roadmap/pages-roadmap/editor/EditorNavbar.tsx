import { type IEditorDisplayPageType } from '@store/roadmap-refactor/display/editor/editor-display-manager';
import React, { useEffect, useState, useRef } from 'react';
import onChangeStore from '@src/HOC-library/store-based-hoc/OnChangeStore';
import { useStore } from '@nanostores/react';
import { closeEditorProtocol } from '@src/to-be-organized/node-rendering-stuff/actions-manager';
import storeEditorSelectedData, {
  triggerRerenderEditor,
} from '@store/roadmap-refactor/elements-editing/store-editor-selected-data';
import { getNodeByIdRoadmapSelector } from '@src/typescript/roadmap_ref/roadmap-data/services/get';
import { mutateNodeName } from '@src/typescript/roadmap_ref/node/core/data-mutation/mutate';
import { motion, AnimatePresence } from 'framer-motion';
import { clearSelectedConnection } from '@components/roadmap/connections/connection-editing/connection-store';
import { nodeNameSyncer } from '@src/typescript/roadmap_ref/node/misc';
import editSvg from '@assets/editor/edit.svg';
import closeSvg from '@assets/editor/close.svg';

const getButtonWidth = (buttonRef: React.RefObject<HTMLButtonElement>) => {
  if (buttonRef.current) {
    const width = buttonRef.current.offsetWidth;
    return width;
  }
  return 0;
};

type IEditorPageButtonProps = {
  page: IEditorDisplayPageType;
  callback: (page: IEditorDisplayPageType) => void;
  highlight: boolean;
  buttonRef: React.RefObject<HTMLButtonElement>; // Add a ref prop
};

const EditorPageButton = ({
  page,
  callback,
  highlight,
  buttonRef, // Receive the ref prop
}: IEditorPageButtonProps) => {
  const pageUpperCase = page.charAt(0).toUpperCase() + page.slice(1);
  const transition = ' transition duration-400 ';

  return (
    <button
      ref={buttonRef}
      type='button'
      key={page}
      className={`text-base text-darkBlue font-medium relative ${transition} ${
        highlight && 'text-lightBlue'
      } `}
      onClick={() => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const width = getButtonWidth(buttonRef); // React gets mad if I don't do this
        callback(page);
      }}
    >
      {pageUpperCase}
    </button>
  );
};

const TitleAndExit = () => {
  const { selectedNodeId } = useStore(storeEditorSelectedData);
  const node = getNodeByIdRoadmapSelector(selectedNodeId);
  const { name } = node;
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    // event listenr for enter keypress to save the name
    const handleEnter = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        setEdit(false);
      }
    };
    window.addEventListener('keydown', handleEnter);
  }, []);

  return (
    <div className='flex  px-9 mt-5 relative'>
      <div className='flex w-5/6 gap-5 items-center '>
        {!edit && (
          <h2 className='text-2xl text-black font-medium font-kanit-text'>
            {name}
          </h2>
        )}
        {edit && (
          <input
            className='text-2xl text-black font-medium font-kanit-text outline-none border-2 border-gray-300 w-5/6'
            value={name}
            onChange={(e) => {
              mutateNodeName(node, e.target.value);
              nodeNameSyncer(node.id, e.target.value);
              triggerRerenderEditor();
            }}
          />
        )}
      </div>

      {!edit && (
        <button
          onClick={() => {
            setEdit((prev) => !prev);
          }}
          type='button'
          className='w-6 h-6 opacity-70 absolute top-1 right-20'
        >
          <img
            className='w-full h-full'
            alt='edit button for node name'
            src={editSvg.src}
          />
        </button>
      )}
      <button
        type='button'
        onClick={() => {
          closeEditorProtocol();
          clearSelectedConnection();
        }}
        className='absolute top-0 right-8'
      >
        <img
          src={closeSvg.src}
          className='w-8 h-8'
          alt='Close button for editor'
        />
      </button>
    </div>
  );
};

type IEditorNavbarPaginationProps = {
  value: IEditorDisplayPageType;
  onChange: (value: IEditorDisplayPageType) => void;
};

const EditorNavbarPagination = ({
  value,
  onChange,
}: IEditorNavbarPaginationProps) => {
  const pages: IEditorDisplayPageType[] = [
    'attachment',
    'components',
    'nodes',
    'properties',
    'operations',
  ];

  const selectedPage = value;

  const buttonRefs: Record<
    IEditorDisplayPageType,
    React.RefObject<HTMLButtonElement>
  > = {
    attachment: useRef(null),
    components: useRef(null),
    nodes: useRef(null),
    properties: useRef(null),
    operations: useRef(null),
  };

  const [underlineStyle, setUnderlineStyle] = useState({
    left: 0,
    width: 0,
  });

  useEffect(() => {
    const selectedButtonRef = buttonRefs[selectedPage].current;
    if (selectedButtonRef) {
      const rect = selectedButtonRef.getBoundingClientRect();
      const parentRect =
        selectedButtonRef.parentElement.getBoundingClientRect();
      const leftOffset = rect.left - parentRect.left; // Adjust for parent's offset
      setUnderlineStyle({
        left: leftOffset,
        width: getButtonWidth(buttonRefs[selectedPage]),
      });
    }
  }, [selectedPage]);

  return (
    <div className='overflow-x-hidden'>
      <TitleAndExit />
      <section className='w-full flex relative justify-center px-4 gap-3 mt-6'>
        {pages.map((page: IEditorDisplayPageType, index: number) => (
          <EditorPageButton
            buttonRef={buttonRefs[page]}
            key={page}
            page={page}
            highlight={selectedPage === page}
            callback={(newPage) => {
              onChange(newPage);
            }}
          />
        ))}
        <AnimatePresence>
          <motion.div
            className='border-lightBlue border-b-2 bottom-[-3px] absolute'
            style={{
              width: `${underlineStyle.width}px`,
            }}
            key='underline'
            initial={{ width: 0 }}
            animate={{
              left: `${underlineStyle.left}px`,
              width: `${underlineStyle.width}px`,
            }}
            transition={{ duration: 0.2 }}
          />
        </AnimatePresence>
      </section>
      <hr className='border-dotted border-t-2 bg-gray-400 mt-[2px]' />
    </div>
  );
};

export default onChangeStore(EditorNavbarPagination);
