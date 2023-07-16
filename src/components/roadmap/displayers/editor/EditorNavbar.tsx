import { IEditorDisplayPageType } from '@store/roadmap-refactor/display/editor/editor-display-manager';
import React from 'react';
import onChangeStore from '@src/HOC-library/store-based-hoc/OnChangeStore';

type IEditorPageButtonProps = {
  page: IEditorDisplayPageType;
  callback: (page: IEditorDisplayPageType) => void;
};

const EditorPageButton = ({ page, callback }: IEditorPageButtonProps) => {
  return (
    <button
      type='button'
      key={page}
      className='flex justify-center  items-center rounded-full border-2 border-black text-black bg-white hover:text-white hover:bg-black transition-all duration-200 h-6 px-4 py-4 cursor-pointer'
      onClick={() => {
        callback(page);
      }}
    >
      {page}
    </button>
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
    'actions',
    'properties',
    'nodes',
  ];

  return (
    <section className='w-full grid grid-cols-3 gap-3 px-4  mt-4'>
      {pages.map((page) => {
        return (
          <EditorPageButton
            key={page}
            page={page}
            callback={(newPage) => {
              onChange(newPage);
            }}
          />
        );
      })}
    </section>
  );
};

export default onChangeStore(EditorNavbarPagination);
