import React, { Component, Fragment } from 'react';
import { NavMenu } from './NavMenu';
import { AuthProvider } from './Authorization/AuthProvider';

export class Layout extends Component {
  static displayName = Layout.name;
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false
    }
  }
  handleLoadChange = (value) => {
    this.setState({ isLoaded: value });
  }

  render() {
    const { isLoaded } = this.state;
    return (
      <AuthProvider isLoaded={this.handleLoadChange}>
          {isLoaded ? <Fragment><NavMenu /> {this.props.children}</Fragment> : ""}
      </AuthProvider>
    );
  }
}
