import editorDisplayManager, {
  IEditorDisplayPageType,
} from '@store/roadmap-refactor/display/editor/editor-display-manager';
import React, { useEffect, useState } from 'react';
import onChangeStore from '@src/HOC-library/store-based-hoc/OnChangeStore';
import { useStore } from '@nanostores/react';
import { closeEditorProtocol } from '@src/to-be-organized/nodeview/actions-manager';
import editorSelectedData, {
  triggerRerenderEditor,
} from '@store/roadmap-refactor/elements-editing/editor-selected-data';
import { getNodeByIdRoadmapSelector } from '@src/typescript/roadmap_ref/roadmap-data/services/get';
import { mutateNodeName } from '@src/typescript/roadmap_ref/node/core/data-mutation/mutate';

type IEditorPageButtonProps = {
  page: IEditorDisplayPageType;
  callback: (page: IEditorDisplayPageType) => void;
  highlight: boolean;
};

const EditorPageButton = ({
  page,
  callback,
  highlight,
}: IEditorPageButtonProps) => {
  const pageUpperCase = page.charAt(0).toUpperCase() + page.slice(1);
  const transition = ' transition duration-400 ';
  return (
    <button
      type='button'
      key={page}
      className={`text-base text-darkBlue font-medium relative   ${transition} ${
        highlight && 'text-lightBlue'
      } `}
      onClick={() => {
        callback(page);
      }}
    >
      {pageUpperCase}

      <div
        className={`absolute w-full -bottom-1 left-0 border-b-0 ${
          highlight && 'border-lightBlue border-b-2'
        } ${transition}`}
      />
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
    <>
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
      <h3 className='text-lg text-secondary pl-9 font-roboto-text mt-2'>
        This is a helper text
      </h3>
    </>
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
    'attachments',
    'components',
    'nodes',
    'properties',
    'actions',
  ];

  useStore(editorDisplayManager); // used for rerendering mostly

  const selectedPage = value;

  return (
    <div className=''>
      <TitleAndExit />
      <section className='w-full flex justify-center px-4 gap-3 mt-6'>
        {pages.map((page: IEditorDisplayPageType) => {
          return (
            <EditorPageButton
              key={page}
              page={page}
              highlight={selectedPage === page}
              callback={(newPage) => {
                onChange(newPage);
              }}
            />
          );
        })}
      </section>
      <hr className='w-full bg-black h-[1px] mt-1' />
    </div>
  );
};

export default onChangeStore(EditorNavbarPagination);
