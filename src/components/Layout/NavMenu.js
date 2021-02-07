import React, { Component, Fragment } from 'react';
import { Collapse, Navbar, Button, NavbarToggler, NavItem, NavLink, Nav } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import '../Settings/theme.css';
import { AuthConsumer } from '../Authorization/AuthProvider';
import { ProfileNavLink } from './ProfileNavLink';


export class NavMenu extends Component {
    static displayName = NavMenu.name;

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        };
    }
    toggleOpen = () => {
        this.setState({ isOpen: !this.state.isOpen });
    }

    authenticated = (auth) => (
        <Fragment>
            <Nav className="mr-auto" navbar>
                <NavItem>
                    <NavLink tag={Link} className="text-dark  pr-5" to="/Performance">
                        <i className="linkicon fa fa-bar-chart"></i>&nbsp;Performance</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={Link} className="text-dark  pr-5" to="/ManageEndPoints">
                        <i className="linkicon fa fa-cog"></i>&nbsp;Manage</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={Link} className="text-dark pr-5" to="/Logs">
                        <i className="linkicon fa fa-dashboard"></i>&nbsp;Logs</NavLink>
                </NavItem>
            </Nav>

            <Nav className="ml-auto" navbar>
                <NavItem className="pr-2">
                    <Button outline color="transparent" className="text-dark p-0" id="ProfileTrigger">
                    <div style={{ display: "inline-block" }}>
                    <NavItem style={{cursor:"pointer",fontSize:"0.7rem", display: "inline-block" ,verticalAlign: "middle" }}>
                        {auth.user.name}
                    </NavItem>
                </div>
                        <span className="fa-stack fa">
                            <i className="fa fa-circle fa-stack-2x"></i>
                            <i className="fa fa-user fa-stack-1x fa-inverse"></i>
                        </span>
                    </Button>
                    <ProfileNavLink target="ProfileTrigger" />
                </NavItem>
            </Nav>
        </Fragment>
    );
    notAuthenticated = () => (
        <Nav navbar className="ml-auto">
            <NavItem className="pr-4">
                <Button tag={Link} color="secondary" outline className="pl-3 pr-3" to="/SignIn">Login</Button>
            </NavItem>
            <NavItem >
                <Button tag={Link} color="primary" to="/SignUp">Get Started</Button>
            </NavItem>
        </Nav>
    );
    render() {
        const { isOpen } = this.state;
        return (
            <header>
                <Navbar light expand="sm" className="box-shadow">
                    <NavbarToggler onClick={this.toggleOpen} />
                    <AuthConsumer>
                        {(auth) => {
                            return (
                                <Collapse isOpen={isOpen} navbar >
                                    {auth.user.isAuthenticated ? this.authenticated(auth) : this.notAuthenticated()}
                                </Collapse>
                            );
                        }}
                    </AuthConsumer>
                </Navbar>
            </header>
        );
    }
}
