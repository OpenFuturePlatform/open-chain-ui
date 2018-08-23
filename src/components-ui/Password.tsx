import * as React from 'react';

interface IProps {
  password: string;
  placeholder?: string;
  onChange(e: React.SyntheticEvent<HTMLInputElement>): void;
}

interface IState {
  isPasswordShown: boolean;
}

export class Password extends React.Component<IProps, IState> {
  public state = {
    isPasswordShown: false
  };

  public onShowPassword = () => this.setState(({ isPasswordShown }: IState) => ({ isPasswordShown: !isPasswordShown }));

  public render() {
    const { password, onChange, placeholder } = this.props;
    const { isPasswordShown } = this.state;
    const inputType = isPasswordShown ? 'text' : 'password';

    return (
      <React.Fragment>
        <input type={inputType} placeholder={placeholder || ''} value={password} onChange={onChange} />
        <label htmlFor="eye">
          <input id="eye" type="checkbox" checked={isPasswordShown} onChange={this.onShowPassword} />
          <div className="eye" />
        </label>
      </React.Fragment>
    );
  }
}
