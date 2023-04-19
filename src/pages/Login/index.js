import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fetchToken } from '../../services';

class Login extends Component {
  state = {
    loginName: '',
    loginEmail: '',
    isDisabled: true,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.verifyLogin);
  };

  verifyLogin = () => {
    const { loginName, loginEmail } = this.state;
    if (loginName !== '' && loginEmail !== '') {
      this.setState({
        isDisabled: false,
      });
    } else {
      this.setState({
        isDisabled: true,
      });
    }
  };

  handleClick = async () => {
    const data = await fetchToken();
    localStorage.setItem('token', data.token);
    const { history } = this.props;
    history.push('/trivia');
  };

  render() {
    const { loginName, loginEmail, isDisabled } = this.state;
    return (
      <div>
        <form>
          <label>
            Nome:
            <input
              type="text"
              value={ loginName }
              name="loginName"
              onChange={ this.handleChange }
              data-testid="input-player-name"
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              value={ loginEmail }
              name="loginEmail"
              onChange={ this.handleChange }
              data-testid="input-gravatar-email"
            />
          </label>
          <button
            type="button"
            data-testid="btn-play"
            disabled={ isDisabled }
            onClick={ this.handleClick }
          >
            Play

          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
