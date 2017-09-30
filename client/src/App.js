import React from 'react';
import { Fragment, Link } from 'redux-little-router';
import logo from './common/assets/images/logo.svg';
import './common/assets/styles/App.css';
import { connect } from 'react-redux';
import Login from './routes/Login';
import '../node_modules/font-awesome/fonts/fontawesome-webfont.svg';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import { withApollo } from 'react-apollo';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to graphql-baseline-webclient</h2>
        </div>
        <Fragment forRoute="/">
          <p>
            <Fragment forRoute="/">
              <div>
                <Link href="/login">Login</Link>
              </div>
            </Fragment>
            <Fragment forRoute="/login">
              <Login {...this.props} />
            </Fragment>
            <Fragment forRoute="/register">
              <div>TODO: Implement /register</div>
            </Fragment>
          </p>
        </Fragment>
        <Fragment forRoute="/dashboard">
          <p>
            TODO: Implement /dashboard
            <Fragment forRoute="/profile">
              <div>TODO: Implement /dashboard/profile</div>
            </Fragment>
          </p>
        </Fragment>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { router, auth, user } = state;
  return {
    router,
    user,
    auth
  };
};

export default connect(mapStateToProps)(withApollo(App));
