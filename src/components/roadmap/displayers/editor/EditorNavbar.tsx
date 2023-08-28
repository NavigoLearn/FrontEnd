import editorDisplayManager, {
  IEditorDisplayPageType,
} from '@store/roadmap-refactor/display/editor/editor-display-manager';
import React, { useEffect, useState, useRef } from 'react';
import onChangeStore from '@src/HOC-library/store-based-hoc/OnChangeStore';
import { useStore } from '@nanostores/react';
import { closeEditorProtocol } from '@src/to-be-organized/nodeview/actions-manager';
import editorSelectedData, {
  triggerRerenderEditor,
} from '@store/roadmap-refactor/elements-editing/editor-selected-data';
import { getNodeByIdRoadmapSelector } from '@src/typescript/roadmap_ref/roadmap-data/services/get';
import { mutateNodeName } from '@src/typescript/roadmap_ref/node/core/data-mutation/mutate';
import { motion, AnimatePresence } from 'framer-motion';

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
  const { selectedNodeId } = useStore(editorSelectedData);
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
    <div className='flex justify-between px-9 mt-7 relative'>
      <div className='flex w-5/6 gap-6 '>
        {!edit && (
          <h2 className='text-3xl w-5/6 text-black font-medium font-kanit-text'>
            {name}
          </h2>
        )}
        {edit && (
          <input
            className='text-3xl text-black font-medium font-kanit-text outline-none border-2 border-gray-300'
            value={name}
            onChange={(e) => {
              mutateNodeName(node, e.target.value);
              triggerRerenderEditor();
            }}
          />
        )}
        <button
          onClick={() => {
            setEdit((prev) => !prev);
          }}
          type='button'
          className='w-6 h-6'
        >
          <img
            className='w-6 h-6'
            alt='edit button for node name'
            src='/editor/edit.svg'
          />
        </button>
      </div>
      <button
        type='button'
        onClick={() => {
          closeEditorProtocol();
        }}
        className='absolute top-0 right-8'
      >
        <img
          src='/editor/close.svg'
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
