import React from 'react';
import { render } from 'react-dom';
import App from './components/App';
// Router
import { BrowserRouter as Router } from 'react-router-dom';
// Redux
import configureStore from './redux/configureStore';
import { Provider as ReduxProvider } from 'react-redux';
// Styles
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

const store = configureStore();

render(
  <ReduxProvider store={store}>
    <Router>
      <App />
    </Router>
  </ReduxProvider>,
  document.getElementById('app'),
);
