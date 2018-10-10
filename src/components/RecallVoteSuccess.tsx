import * as React from 'react';
import { PopupBackgroundArea } from '../components-ui/PopupBackgroundArea';

interface IProps {
  isVisible: boolean;
  onClose(): void;
}

export const RecallVoteSuccess = ({ isVisible, onClose }: IProps) => {
  if (!isVisible) {
    return null;
  }

  return (
    <PopupBackgroundArea onClick={onClose}>
      <div className="popup success-recall-popup">
        <span className="success-popup-message">Recall vote sent successfully!</span>
        <button className="button mini" onClick={onClose}>
          <div />
          <span>OK</span>
        </button>
      </div>
    </PopupBackgroundArea>
  );
};
