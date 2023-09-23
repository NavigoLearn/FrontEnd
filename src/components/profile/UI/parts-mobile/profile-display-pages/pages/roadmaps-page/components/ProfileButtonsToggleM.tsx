import React from 'react';

type IProfileButtonsToggleMProps = {
  selection: 'draft' | 'published';
  setIsDraftCb: () => void;
  setIsPublished: () => void;
};
const ProfileButtonsToggleM = ({
  selection,
  setIsDraftCb,
  setIsPublished,
}: IProfileButtonsToggleMProps) => {
  const selectedStyle = 'text-darkBlue font-medium';
  const unselectedStyle = 'text-secondaryDarkBlue hover:text-darkBlue';
  return (
    <div className='flex '>
      <button
        type='button'
        onClick={() => {
          setIsDraftCb();
        }}
        className={`${
          selection === 'draft' ? selectedStyle : unselectedStyle
        } border-2 rounded-l-md border-placeholderBlack px-4 py-1 w-24`}
      >
        Draft
      </button>
      <button
        type='button'
        onClick={() => {
          setIsPublished();
        }}
        className={`${
          selection === 'published' ? selectedStyle : unselectedStyle
        } border-2 border-l-0 rounded-r-md border-placeholderBlack w-28 px-4 py-1`}
      >
        Published
      </button>
    </div>
  );
};

export default ProfileButtonsToggleM;
