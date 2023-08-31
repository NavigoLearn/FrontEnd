import React, { useState } from 'react';
import Popup from '@components/roadmap/to-be-organized/popups/Popup';

const Report = () => {
  const [ text, setText ] = useState('');
  return (
    <Popup
      title={'Report roadmap'}
      confirmText={'Report'}
      cancelText={'Cancel'}
      onConfirm={() => {
      }}
      onCancel={() => {
      }}
      showTextField={true}
      textFieldValue={text}
      textFieldPlaceholder={'write issue here'}
      onTextFieldChange={(newValue) => {
        setText(newValue);
      }}
    />
  );
};

export default Report;
