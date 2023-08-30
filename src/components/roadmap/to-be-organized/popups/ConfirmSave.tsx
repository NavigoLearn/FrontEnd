import React from 'react';
import {
  saveEditingProtocol,
} from '@src/typescript/roadmap_ref/roadmap-data/protocols/roadmap-state-protocols';
import { setConfirmSave } from '@store/roadmap-refactor/popups/popup';
import Popup from '@components/roadmap/to-be-organized/popups/Popup';

const ConfirmSave = () => {
  return (
    <Popup
      title={'Are you sure you want to save the changes you made to this roadmap?'}
      confirmText={'Save Changes'}
      cancelText={'Go back'}
      onConfirm={() => {
        saveEditingProtocol();
        setConfirmSave();
      }}
      onCancel={() => {
        setConfirmSave();
      }}
    />
  );
};

export default ConfirmSave;
