import React from 'react';
import { cancelEditingProtocol } from '@src/typescript/roadmap_ref/roadmap-data/protocols/roadmap-state-protocols';
import { setConfirmCancel } from '@store/roadmap-refactor/popups/popup';
import Popup from '@components/roadmap/to-be-organized/popups/Popup';

const ConfirmCancel = () => {
  return (
    <Popup
        title={'Are you sure you want to discard the changes you made to this roadmap?'}
        confirmText={'Discard Changes'}
        cancelText={'Go back'}
        onConfirm={() => {
            cancelEditingProtocol();
            setConfirmCancel();
        }}
        onCancel={() => {
            setConfirmCancel();
        }}
    />
  );
};

export default ConfirmCancel;
