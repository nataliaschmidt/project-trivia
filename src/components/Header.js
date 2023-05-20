import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchImage } from '../services';
import LogoTrivia from '../assets/images/trivia-logo.png';
import './Header.css';

class Header extends Component {
  state = {
    savedImg: '',
  };

  componentDidMount() {
    const { email } = this.props;
    this.setState({
      savedImg: fetchImage(email),
    });
  }

  render() {
    const { savedImg } = this.state;
    const { name, score } = this.props;
    return (
      <header>
        <div className="user-info">
          <img src={ savedImg } alt={ savedImg } className="gravatar-img" />
          <span className="name-header">{name}</span>
        </div>
        <img
          src={ LogoTrivia }
          alt="Logo da trivia"
          className="logo-trivia-header"
        />
        <span className="score">{`Score: ${score}`}</span>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  email: state.player.gravatarEmail,
  score: state.player.score,
});

Header.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
