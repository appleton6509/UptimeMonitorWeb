import React, { Component } from 'react';
import { NavMenu } from './NavMenu';
import { AuthProvider } from '../Authorization/AuthProvider';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container } from 'reactstrap';

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
          {isLoaded ? <Container className="mb-2 mt-2 pl-5 pr-5" fluid={true}>{this.props.children}</Container> : ""}
      </AuthProvider>
    );
  }
}
