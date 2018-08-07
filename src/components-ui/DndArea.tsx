import * as React from 'react';

interface IProps {
  onSelect(file: File | null): void;
}

interface IState {
  isHover: boolean;
}

export class DndArea extends React.Component<IProps, IState> {
  public state = {
    isHover: false
  };

  private dropArea: React.RefObject<HTMLDivElement> = React.createRef();
  private hoverArea: React.RefObject<HTMLDivElement> = React.createRef();

  public componentDidMount() {
    const dropArea = this.dropArea.current;
    const hoverArea = this.hoverArea.current;
    if (!dropArea || !hoverArea) {
      return;
    }
    dropArea.ondragover = e => {
      e.preventDefault();
      this.setState({ isHover: true });
    };
    hoverArea.ondragover = e => {
      e.preventDefault();
      this.setState({ isHover: true });
    };
    hoverArea.ondragleave = e => {
      e.preventDefault();
      this.setState({ isHover: false });
    };
    hoverArea.ondrop = e => {
      e.preventDefault();
      e.stopPropagation();
      this.setState({ isHover: false });
      this.props.onSelect(e.dataTransfer.files[0]);
    };
  }

  public onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    this.props.onSelect(file);
  };
  public render() {
    const { isHover } = this.state;
    return (
      <React.Fragment>
        <div ref={this.hoverArea} className="dnd" style={{ display: isHover ? 'block' : 'none' }}>
          <span>Select file</span>
        </div>
        <div ref={this.dropArea} className="dnd hover" style={{ display: isHover ? 'none' : 'block' }}>
          <input type="file" onChange={this.onSelectFile} />
          <span>Select file</span>
        </div>
      </React.Fragment>
    );
  }
}
