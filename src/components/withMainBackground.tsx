import * as React from 'react';

export const withMainBackground = <P extends object>(Component: React.ComponentType<P>) => (props: P) => (
  <React.Fragment>
    <div className="main-background" />
    <Component {...props} />
  </React.Fragment>
);
