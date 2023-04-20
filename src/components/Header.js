import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchImage } from '../services';

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
        <img src={ savedImg } alt={ savedImg } data-testid="header-profile-picture" />
        <span data-testid="header-player-name">{name}</span>
        <span data-testid="header-score">{score}</span>
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
