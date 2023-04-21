import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actionResetScore } from '../redux/actions';

class Ranking extends Component {
  state = {
    rankings: [],
  };

  componentDidMount() {
    const rankings = JSON.parse(localStorage.getItem('ranking'));
    this.setState({
      rankings,
    });
  }

  handleHome = () => {
    const { history, dispatch } = this.props;
    dispatch(actionResetScore());
    history.push('/');
  };

  render() {
    const { rankings } = this.state;
    return (
      <div>
        <h1 data-testid="ranking-title">Xablau</h1>
        {rankings && rankings
          .sort((a, b) => b.score - a.score).map((item, index) => (
            <div key={ index }>
              <img src={ item.image } alt={ item.image } />
              <p data-testid={ `player-name-${index}` }>{item.name}</p>
              <p data-testid={ `player-score-${index}` }>{item.score}</p>
            </div>
          ))}
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.handleHome }
        >
          Página Inicial

        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Ranking);
