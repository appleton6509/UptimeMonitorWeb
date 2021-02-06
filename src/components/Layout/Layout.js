import React, { Component } from 'react';
import { NavMenu } from './NavMenu';
import { AuthProvider } from '../Authorization/AuthProvider';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container } from 'reactstrap';
import { ShadowBox } from 'components/Generic/Design/ShadowBox';

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
          {isLoaded ? <Container className="mb-2 mt-2 mr-10 ml-10" fluid={true}>{this.props.children}</Container> : ""}
      </AuthProvider>
    );
  }
}
