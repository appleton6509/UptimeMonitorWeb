import React, { Component } from 'react';
import { NavMenu } from './NavMenu';
import { AuthProvider } from './Authorization/AuthProvider';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure({
   position:"bottom-center",
    autoClose:5000,
    hideProgressBar: true,
    newestOnTop:false,
    closeOnClick: true,
    rtl: false,
    pauseOnFocusLoss : true,
    draggable: true,
    pauseOnHover: true
})

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
          {isLoaded ? <NavMenu /> : ""}
          {isLoaded ? this.props.children : ""}
      </AuthProvider>
    );
  }
}
