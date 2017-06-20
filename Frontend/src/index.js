import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App';
import { Provider } from 'react-redux';
import { configureStore } from './app/store';

// create-react-app requirement
import registerServiceWorker from './registerServiceWorker';

import 'react-widgets/dist/css/react-widgets.css'
// import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

const store = configureStore();

const rootEl = document.getElementById('root')

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootEl
);

// Hot reloading for development
if (module.hot) {
  module.hot.accept('./app/App', () => {
    const NextApp = require('./app/App').default
    ReactDOM.render(
      <Provider store={store}>
        <NextApp />
      </Provider>,
      rootEl
    )
  })
}

registerServiceWorker();
