import * as React from 'react';
import { IFile, SelectFile } from '../components-ui/SelectFile';
import { IEncWallet } from '../utils/crypto';
import { readJsonFile } from '../utils/readJsonFile';

interface IProps {
  onSelect(encWallet: IEncWallet | null): void;
  onFileError(message: string): void;
}

interface IState {
  file: IFile;
}

export class UploadEncWalletInput extends React.Component<IProps, IState> {
  public state = {
    file: null
  };

  public fileError = (message: string) => this.props.onFileError(message);

  public onSelectFile = async (file: File | null) => {
    this.fileError('');
    this.setState({ file });
    if (!file) {
      this.props.onSelect(null);
      return;
    }
    try {
      const encWallet: IEncWallet = await readJsonFile(file);
      if (!encWallet.address || !encWallet.crypto) {
        this.fileError('File needs to have valid wallet structure');
      }
      this.props.onSelect(encWallet);
    } catch (e) {
      this.fileError('It needs to be valid .json file');
    }
  };

  public render() {
    const { file } = this.state;
    return (
      <React.Fragment>
        <SelectFile file={file} onSelect={this.onSelectFile} />
      </React.Fragment>
    );
  }
}
