import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.min.css';
import {Provider} from 'react-redux';
import store from './store';


ReactDOM.render(
      <Provider store = {store}>
        <App />
      </Provider>, document.getElementById('root'));
registerServiceWorker();
