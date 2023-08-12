import editorDisplayManager, {
  IEditorDisplayPageType,
} from '@store/roadmap-refactor/display/editor/editor-display-manager';
import React from 'react';
import onChangeStore from '@src/HOC-library/store-based-hoc/OnChangeStore';
import { useStore } from '@nanostores/react';
import { closeEditorProtocol } from '@src/to-be-organized/nodeview/actions-manager';

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
  return (
    <>
      <div className='flex justify-between px-9 mt-7'>
        <h2 className='text-3xl text-black font-medium font-kanit-text'>
          Node Title
        </h2>
        <button
          type='button'
          onClick={() => {
            closeEditorProtocol();
          }}
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
      <hr className='border-dotted border-t-2 bg-gray-400 mt-1' />
    </div>
  );
};

export default onChangeStore(EditorNavbarPagination);
