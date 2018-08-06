import * as React from 'react';

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

  private dropArea: React.RefObject<HTMLDivElement> = React.createRef();
  private innerArea: React.RefObject<HTMLDivElement> = React.createRef();

  public componentDidMount() {
    const dropArea = this.dropArea.current;
    const innerArea = this.innerArea.current;
    if (!dropArea || !innerArea) {
      return;
    }
    dropArea.ondragover = e => {
      e.preventDefault();
      this.setState({ isHover: true });
    };
    innerArea.ondragover = e => {
      e.preventDefault();
      this.setState({ isHover: true });
    };
    innerArea.ondragleave = e => {
      e.preventDefault();
      this.setState({ isHover: false });
    };
    innerArea.ondrop = e => {
      e.preventDefault();
      e.stopPropagation();
      this.props.onSelect(e.dataTransfer.files[0]);
      this.setState({ isHover: false });
    };
  }

  public onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    this.props.onSelect(file);
  };
  public onFileCancel = () => this.props.onSelect(null);

  public render() {
    const { file } = this.props;
    const { isHover } = this.state;
    const dragStyles = {
      background: 'red',
      display: isHover ? 'block' : 'none',
      height: '100%',
      position: 'absolute',
      width: '100%',
      zIndex: 5
    };
    const contentStyles = { display: !isHover ? 'block' : 'none', position: 'absolute' };

    if (file) {
      const file1 = file as File;
      return (
        <div>
          {file1.name} <span onClick={this.onFileCancel}>X</span>
        </div>
      );
    }

    return (
      <div
        ref={this.dropArea}
        style={{ border: 'solid 1px black', position: 'relative', overflow: 'hidden', height: '80px' }}
      >
        <div style={contentStyles as any}>
          <input type="file" onChange={this.onSelectFile} />
        </div>
        <div ref={this.innerArea} style={dragStyles as any}>
          drop
        </div>
      </div>
    );
  }
}
