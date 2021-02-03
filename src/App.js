import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout/Layout'
import { SignUp} from './components/Views/SignUp';
import { SignIn} from './components/Views/SignIn';
import { Home} from './components/Views/Home';
import { ManageEndPoints } from './components/Views/ManageEndPoints';
import { Deauthorize } from './components/Authorization/Deauthorize';
import { ResultLogs } from './components/Views/ResultLogs';
import { Performance } from './components/Views/Performance';
import { Profile } from './components/Views/Profile';

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/SignUp' component={SignUp} />
        <Route exact path='/SignIn' component={SignIn} />
        <Route exact path='/Deauthorize' component={Deauthorize} />
        <Route exact path='/Logs' component={ResultLogs} />
        <Route exact path='/' component={Home} />
        <Route exact path='/ManageEndPoints' component={ManageEndPoints} />
        <Route exact path='/Performance' component={Performance} />
        <Route exact path='/Profile' component={Profile} />
      </Layout>
    );
  }
}
