import * as React from 'react';
import background from '../img/background.png';

export const withBackground = <P extends object>(Component: React.ComponentType<P>) => (props: P) => (
  <React.Fragment>
    <img className="background" src={background} alt="background" />
    <Component {...props} />
  </React.Fragment>
);
