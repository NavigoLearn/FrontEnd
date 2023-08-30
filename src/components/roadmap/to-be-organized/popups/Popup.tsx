import React, { useState } from 'react';
import { divWrapper } from '@components/roadmap/to-be-organized/utils/logic';

interface PopupProps {
  title: string;
  confirmText: string;
  cancelText: string;
  onConfirm: () => void;
  onCancel: () => void;
  showTextField?: boolean;
  textFieldValue?: string;
  textFieldPlaceholder?: string;
  onTextFieldChange?: (newValue: string) => void;
}

const Popup = ({
  title,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
  showTextField = false,
  textFieldValue = '',
  textFieldPlaceholder = '',
  onTextFieldChange = () => {},
}: PopupProps) => {
  const [ inputValue, setInputValue ] = useState(textFieldValue || '');

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    if (onTextFieldChange) {
      onTextFieldChange(newValue);
    }
  };

  return (
    <div
      className="relative z-40 rounded-lg w-full  md:w-[600px] h-[200px] shadow-standard bg-white pointer-events-auto ">

      {divWrapper(
        <div className="mt-4 text-main font-semibold text-lg text-center">
          {title}
        </div>
      )}
      {showTextField && (
        <div
          className="bg-gray-300 shadow-standard w-full h-32 rounded-2xl p-2">
          <input
            className="w-full h-full bg-transparent border-none outline-none text-main align-top text-left py-1"
            placeholder={textFieldPlaceholder}
            value={inputValue}
            onChange={handleInputChange}
          />
        </div>
      )}
      <div className="w-full absolute bottom-8 flex justify-center gap-4">
        <button
          type="button"
          className="bg-main text-white rounded-xl px-6 py-1 bg-primary font-medium"
          onClick={onConfirm}
        >
          {confirmText}
        </button>
        <button
          type="button"
          className="text-secondary font-medium text-sm"
          onClick={onCancel}
        >
          {cancelText}
        </button>
      </div>
    </div>
  );
};

export default Popup;
