import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import routes from '../routes';

// Root component that holds the provider and nested router.
// This class exists so that Hot Reloader has something to reinstance.
export default class Root extends Component {
  render() {
    const { store, history } = this.props;
    return (
        <Provider store={store}>
          <div>
            <Router history={history} routes={routes} />
          </div>
        </Provider>
    );
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};