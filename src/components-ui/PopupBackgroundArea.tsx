import * as React from 'react';

interface IProps {
  children: JSX.Element;
  onClick(): void;
}

export class PopupBackgroundArea extends React.Component<IProps> {
  private background: React.RefObject<HTMLDivElement> = React.createRef();

  public onBackground = (e: React.MouseEvent) => {
    const target = e.target;
    const background = this.background.current;
    if (target === background) {
      this.props.onClick();
    }
  };

  public render() {
    return (
      <div ref={this.background} className="popup-area" onClick={this.onBackground}>
        {this.props.children}
      </div>
    );
  }
}
