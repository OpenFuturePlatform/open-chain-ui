import * as React from 'react';

export const withStartBackground = <P extends object>(Component: React.ComponentType<P>) => (props: P) => (
  <React.Fragment>
    <div className="main-background" />
    <Component {...props} />
  </React.Fragment>
);
