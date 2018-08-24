import * as React from 'react';
import { PopupBackgroundArea } from '../components-ui/PopupBackgroundArea';

interface IProps {
  fee: string;
  onSubmit(): void;
  onClose(): void;
}

export const DelegateConfirmConfirmPopup = ({ fee, onClose, onSubmit }: IProps) => {
  const onSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <PopupBackgroundArea onClick={onClose}>
      <form className="popup" onSubmit={onSubmitHandler}>
        <h2>
          Become <br />a Delegate
        </h2>
        {/* <div className="info">
          <span className="title">from</span>
          <span>FF7508C54D3EF2141D05F7EB1A0CC71969</span>
        </div>
        <div className="info">
          <span className="title">to</span>
          <span>FF7508C54D3EF2141D05F7EB1A</span>
        </div> */}
        <div className="info">
          <span className="title">fee amount</span>
          <span>{fee} open</span>
        </div>
        <div className="button-area">
          <button className="button mini">
            <div />
            <span>Confirm</span>
          </button>
          <button className="button mini white" onClick={onClose}>
            <div />
            <span>Cancel</span>
          </button>
        </div>
      </form>
    </PopupBackgroundArea>
  );
};
