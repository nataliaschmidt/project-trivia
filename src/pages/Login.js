/* eslint-disable max-lines */
/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable react/jsx-max-depth */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { AiOutlineSetting } from 'react-icons/ai';
import { triviaCategories, fetchToken } from '../services';
import { actionGetUser, actionSettings } from '../redux/actions';
import './Login.css';
import VideoMp4 from '../assets/video/bg1.mp4';
import VideoWebm from '../assets/video/bg1.webm';
import LogoTrivia from '../assets/images/trivia-logo.png';

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
    isLoading: false,
    playVideo: false,
  };

  componentDidMount() {
    this.setState({
      playVideo: true,
    });
  }

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
    this.setState({
      isLoading: true,
    });
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
    this.setState({
      isLoading: false,
    }, () => {
      dispatch(actionGetUser(user));
      dispatch(actionSettings(settings));
      history.push('/game');
    });
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
      displaySettings,
      confNumber,
      confCategory, confDifficulty, confType, isLoading, playVideo } = this.state;
    return (
      <div className="container-login">
        <img
          src={ LogoTrivia }
          alt="Logo da trivia"
          className="logo-trivia"
        />
        <video autoPlay={ playVideo } loop className="bg-video">
          <source src={ VideoMp4 } type="video/mp4" />
          <source src={ VideoWebm } type="video/webm" />
        </video>

        <form className="form-login">

          <div className="field">
            <div className="control has-icons-left has-icons-right">
              <input
                className="input"
                type="text"
                placeholder="Name"
                value={ loginName }
                name="loginName"
                onChange={ this.handleChange }
              />
              <span className="icon is-small is-left">
                <i className="fas fa-user" />
              </span>
            </div>
          </div>

          <div className="field">
            <div className="control has-icons-left has-icons-right">
              <input
                className="input"
                type="email"
                placeholder="Email"
                value={ loginEmail }
                name="loginEmail"
                onChange={ this.handleChange }
              />
              <span className="icon is-small is-left">
                <i className="fas fa-envelope" />
              </span>
            </div>
          </div>

          <button
            className={ isLoading
              ? 'button is-link is-loading is-responsive is-rounded'
              : 'button is-link is-rounded' }
            type="button"
            data-testid="btn-play"
            disabled={ isDisabled }
            onClick={ this.handlePlay }
          >
            Play

          </button>
          <button
            className="button is-link is-rounded"
            type="button"
            onClick={ this.handleSettings }
            data-testid="btn-settings"
          >
            <AiOutlineSetting className="icon-settings" />
            {' '}
            Settings

          </button>
          {displaySettings && (
            <section className="display-settings">
              <h3 data-testid="settings-title">Settings</h3>
              <div className="container-inputs">
                <label htmlFor="confNumber">
                  Number of Questions:
                  <input
                    className="input is-info"
                    type="number"
                    value={ confNumber }
                    name="confNumber"
                    max={ 50 }
                    onChange={ this.handleChange }
                  />
                </label>
                <label>
                  Category:
                  <div className="select is-info">
                    <select
                      className="select-settings"
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
                  </div>
                </label>

                <label>
                  Difficulty:
                  <div className="select is-info">
                    <select
                      className="select-settings"
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
                  </div>
                </label>

                <label>
                  Type:
                  <div className="select is-info">
                    <select
                      className="select-settings"
                      name="confType"
                      value={ confType }
                      id="confType"
                      onChange={ this.handleChange }
                    >
                      <option value="0">Default</option>
                      <option value="multiple">Multiple Questions</option>
                      <option value="boolean">True/False</option>
                    </select>
                  </div>
                </label>
              </div>
              <button
                className="button is-link is-rounded"
                type="button"
                onClick={ this.handleSettings }
              >
                Save

              </button>
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
