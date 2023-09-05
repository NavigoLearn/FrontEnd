import React from 'react';

type ButtonsProps = {
  edit: boolean;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
};

const ButtonsEdit = ({ edit, onEdit, onSave, onCancel }: ButtonsProps) => {
  return (
    <>
      {!edit && (
        <button onClick={onEdit} type='button'>
          <div className='text-md hover:underline text-white font-normal py-2 px-16 bg-primary rounded-3xl mt-4 font-roboto-text select-none'>
            Edit profile
          </div>
        </button>
      )}
      {edit && (
        <button onClick={onSave} type='button'>
          <div className='text-md hover:underline text-white font-normal py-2 px-16 bg-primary rounded-3xl mt-4 font-roboto-text select-none'>
            Save
          </div>
        </button>
      )}
      {edit && (
        <button onClick={onCancel} type='button'>
          <div className='text-md hover:underline text-white font-normal py-2 px-16 bg-primary rounded-3xl mt-4 font-roboto-text'>
            Cancel
          </div>
        </button>
      )}
    </>
  );
};

export default ButtonsEdit;
