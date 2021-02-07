import React, { Component, Fragment } from 'react';
import { Route } from 'react-router';
import { SignUp } from './components/Views/Accounts/SignUp';
import { SignIn } from './components/Views/Accounts/SignIn';
import { Home } from './components/Views/Home/Home';
import { ManageEndPoints } from './components/Views/Manage/ManageEndPoints';
import { Deauthorize } from './components/Authorization/Deauthorize';
import { ResultLogs } from './components/Views/Logs/ResultLogs';
import { Performance } from './components/Views/Performance/Performance';
import { Profile } from './components/Views/Accounts/Profile';
import { ConfirmEmailSuccess } from 'components/Views/Accounts/ConfirmEmailSuccess';
import { ConfirmEmailFailure } from 'components/Views/Accounts/ConfirmEmailFailure';
import { ForgotPassword } from 'components/Views/Accounts/ForgotPassword';
import { ResetPassword } from 'components/Views/Accounts/ResetPassword';
import { ChangePassword } from 'components/Views/Accounts/ChangePassword';

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
        <Route exact path='/Profile/ChangePassword' component={ChangePassword} />
      </Fragment>
    );
  }
}
