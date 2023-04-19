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
    const { name } = this.props;
    return (
      <header>
        <img src={ savedImg } alt={ savedImg } data-testid="header-profile-picture" />
        <span data-testid="header-player-name">{name}</span>
        <span data-testid="header-score">0</span>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.user.name,
  email: state.user.email,
});

Header.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
