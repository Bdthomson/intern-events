import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch
} from 'react-router-dom';

// All Routes
import Header from './Header';

// '/'
import Dashboard from '../dashboard//Dashboard';

// '/new'
import AddEvent from '../event/AddEvent';

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Header />
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <Switch>
                                    <Route exact path="/" component={Dashboard} />
                                    <Route exact path="/new" component={AddEvent} />
                                    <Route path="/logout" render={() => {
                                        delete localStorage.loggedIn;
                                        return <Redirect to="/login" />
                                    }} />

                                    <Route render={() => <h2>404</h2>} />

                                    {/* TODO: Create login route. */}
                                    {/*<Route path="/login" render={(props) => {
                                        return <Login {...props}/>;
                                    }}/>*/}

                                </Switch>
                            </div>
                        </div>
                    </div>
                </div>
            </Router >
        );
    }
}

export default App;
