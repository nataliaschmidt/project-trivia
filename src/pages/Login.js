import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchToken } from '../services';
import { actionGetUser } from '../redux/actions';

class Login extends Component {
  state = {
    loginName: '',
    loginEmail: '',
    isDisabled: true,
    displaySettings: false,
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

  handlePlay = async () => {
    const { loginName, loginEmail } = this.state;
    const { history, dispatch } = this.props;
    const data = await fetchToken();
    localStorage.setItem('token', data.token);
    const user = {
      name: loginName,
      email: loginEmail,
    };
    dispatch(actionGetUser(user));
    history.push('/game');
  };

  handleSettings = () => {
    const { displaySettings } = this.state;
    if (!displaySettings) {
      this.setState({
        displaySettings: true,
      });
    } else {
      this.setState({
        displaySettings: false,
      });
    }
  };

  render() {
    const { loginName, loginEmail, isDisabled, displaySettings } = this.state;
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
            onClick={ this.handlePlay }
          >
            Play

          </button>
          <button
            type="button"
            onClick={ this.handleSettings }
            data-testid="btn-settings"
          >
            Configurações

          </button>
          {displaySettings && (
            <section>
              <h3 data-testid="settings-title">Configurações</h3>
            </section>
          )}
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
