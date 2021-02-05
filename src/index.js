import 'bootstrap/dist/css/bootstrap.min.css';
import { Layout } from 'components/Layout/Layout';
import { CustomRoutes } from 'CustomRoutes';
import 'font-awesome/css/font-awesome.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

//import registerServiceWorker from './registerServiceWorker';

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');

ReactDOM.render(
  <BrowserRouter basename={baseUrl}>
    <Layout>
      <CustomRoutes/>
    </Layout>
  </BrowserRouter>,
  rootElement);

//registerServiceWorker();

