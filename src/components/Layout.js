import React, { Component } from 'react';
import { NavMenu } from './NavMenu';
import { AuthProvider } from './Context/AuthProvider';

export class Layout extends Component {
  static displayName = Layout.name;
  render() {
    return (
        <AuthProvider>
          <NavMenu />
          {this.props.children}
        </AuthProvider>
    );
  }
}
