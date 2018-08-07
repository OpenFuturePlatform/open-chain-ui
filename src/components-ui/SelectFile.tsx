import * as React from 'react';
import { DndArea } from './DndArea';
import { UploadedFileInput } from './UploadedFileInput';

export type IFile = File | null;

interface IProps {
  file: IFile;
  onSelect(file: IFile): void;
}

interface IState {
  isHover: boolean;
}

export class SelectFile extends React.Component<IProps, IState> {
  public state = {
    file: null,
    isHover: false
  };

  public onFileCancel = () => this.props.onSelect(null);

  public render() {
    const { file } = this.props;

    if (file) {
      return <UploadedFileInput file={file as File} onCancel={this.onFileCancel} />;
    }

    return <DndArea onSelect={this.props.onSelect} />;
  }
}
