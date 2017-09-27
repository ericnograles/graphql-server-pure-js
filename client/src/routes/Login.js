import React from 'react';
import { graphql, gql } from 'react-apollo';
import { receive as receiveAuth } from '../common/actions/auth';
import { receive as receiveUser } from '../common/actions/user';
import { push } from 'redux-little-router';


class Login extends React.Component {
  state = {
    email: null,
    password: null
  };

  onTextChange = event => {
    let state = Object.assign({}, this.state);
    state[event.target.name] = event.target.value;
    this.setState(state);
  };

  login = async () => {
    const { mutate, dispatch } = this.props;
    try {
      let response = await mutate({
        variables: {
          email: this.state.email,
          password: this.state.password
        }
      });
      dispatch(receiveAuth(response.data.login.token, response.data.login.refresh_token));
      dispatch(receiveUser(response.data.login.profile));
      dispatch(push('/dashboard'));
    } catch (ex) {
      console.error(ex);
    }
  };

  render() {
    return (
      <div>
        <input
          type="text"
          name="email"
          onChange={this.onTextChange}
          placeholder="Email"
        />
        <input
          type="text"
          name="password"
          onChange={this.onTextChange}
          placeholder="Password"
        />
        <button onClick={this.login}>Login</button>
      </div>
    );
  }
}

const loginMutation = gql`
  mutation loginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      expires
      refresh_token
      profile {
        first_name
        last_name
        email
      }
    }
  }
`;

const LoginWithMutation = graphql(loginMutation)(Login);
export default LoginWithMutation;
