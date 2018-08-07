import * as React from 'react';
import close from '../img/close.svg';

interface IProps {
  file: File;
  onCancel(): void;
}

export const UploadedFileInput: React.SFC<IProps> = ({ file, onCancel }) => (
  <div className="uploaded-file">
    <span>{file.name}</span>
    <img src={close} onClick={onCancel} alt="x" />
  </div>
);
