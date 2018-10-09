import * as React from 'react';
import { PopupBackgroundArea } from '../components-ui/PopupBackgroundArea';

interface IProps {
  isVisible: boolean;
  errorMessage: string;
  onClose(): void;
}

export const ErrorPopup = ({ isVisible, errorMessage, onClose }: IProps) => {
  if (!isVisible) {
    return null;
  }

  return (
    <PopupBackgroundArea onClick={onClose}>
      <div className="popup error-popup">
        <span className="error-popup-message">{errorMessage}</span>
        <button className="button mini" onClick={onClose}>
          <div />
          <span>OK</span>
        </button>
      </div>
    </PopupBackgroundArea>
  );
};
