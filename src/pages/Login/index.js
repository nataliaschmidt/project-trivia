import React, { Component } from 'react';
// import PropTypes from 'prop-types';

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
          >
            Play

          </button>
        </form>
      </div>
    );
  }
}

// Login.propTypes = {

// };

export default Login;
