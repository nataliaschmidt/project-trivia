import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { triviaCategories, fetchToken } from '../services';
import { actionGetUser, actionSettings } from '../redux/actions';

class Login extends Component {
  state = {
    loginName: '',
    loginEmail: '',
    isDisabled: true,
    displaySettings: false,
    confNumber: '5',
    confCategory: '0',
    confDifficulty: '0',
    confType: '0',
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
    const { loginName,
      loginEmail, confNumber, confCategory, confDifficulty, confType } = this.state;
    const { history, dispatch } = this.props;
    const data = await fetchToken();
    localStorage.setItem('token', data.token);
    const settings = {
      number: confNumber,
      category: confCategory,
      difficulty: confDifficulty,
      type: confType,
    };
    const user = {
      name: loginName,
      email: loginEmail,
    };
    dispatch(actionGetUser(user));
    dispatch(actionSettings(settings));
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
    const { loginName,
      loginEmail,
      isDisabled,
      displaySettings, confNumber, confCategory, confDifficulty, confType } = this.state;
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
              <label htmlFor="confNumber">
                Number of Questions:
                <input
                  type="number"
                  value={ confNumber }
                  name="confNumber"
                  max={ 50 }
                  onChange={ this.handleChange }
                />
              </label>
              <label>
                Category:
                <select
                  name="confCategory"
                  id="confCategory"
                  value={ confCategory }
                  onChange={ this.handleChange }
                >
                  {triviaCategories.map((item) => (
                    <option key={ item.name } value={ item.id }>
                      {item.name}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Difficulty:
                <select
                  name="confDifficulty"
                  value={ confDifficulty }
                  id="confDifficulty"
                  onChange={ this.handleChange }
                >
                  <option value="0">Default</option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </label>
              <label>
                Type:
                <select
                  name="confType"
                  value={ confType }
                  id="confType"
                  onChange={ this.handleChange }
                >
                  <option value="0">Default</option>
                  <option value="multiple">Multiple Questions</option>
                  <option value="boolean">True/False</option>
                </select>
              </label>
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
