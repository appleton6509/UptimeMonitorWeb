import React, { Component, Fragment } from 'react';
import { Route } from 'react-router';
import { SignUp } from './components/Views/SignUp';
import { SignIn } from './components/Views/SignIn';
import { Home } from './components/Views/Home';
import { ManageEndPoints } from './components/Views/ManageEndPoints';
import { Deauthorize } from './components/Authorization/Deauthorize';
import { ResultLogs } from './components/Views/ResultLogs';
import { Performance } from './components/Views/Performance';
import { Profile } from './components/Views/Profile';
import { ConfirmEmailSuccess } from 'components/Views/ConfirmEmailSuccess';
import { ConfirmEmailFailure } from 'components/Views/ConfirmEmailFailure';
import { ForgotPassword } from 'components/Views/ForgotPassword';
import { ResetPassword } from 'components/Views/ResetPassword';

export class CustomRoutes extends Component {
  render() {
    return (
      <Fragment>
        <Route exact path='/SignUp' component={SignUp} />
        <Route exact path='/SignIn' component={SignIn} />
        <Route exact path='/Deauthorize' component={Deauthorize} />
        <Route exact path='/Logs' component={ResultLogs} />
        <Route exact path='/' component={Home} />
        <Route exact path='/ManageEndPoints' component={ManageEndPoints} />
        <Route exact path='/Performance' component={Performance} />
        <Route exact path='/Profile' component={Profile} />
        <Route exact path='/ConfirmEmailSuccess' component={ConfirmEmailSuccess} />
        <Route exact path='/ConfirmEmailFailure' component={ConfirmEmailFailure} />
        <Route exact path='/ForgotPassword' component={ForgotPassword} />
        <Route exact path='/ResetPassword' component={ResetPassword} />
      </Fragment>
    );
  }
}
