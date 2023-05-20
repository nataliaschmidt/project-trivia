import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actionResetScore } from '../redux/actions';
import Header from '../components/Header';
import './Ranking.css';

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
      <>
        <Header />
        <div className="container-ranking">
          <h1 className="ranking-title">Ranking</h1>
          <button
            className="button is-link is-outlined is-rounded btn-play-again"
            type="button"
            data-testid="btn-go-home"
            onClick={ this.handleHome }
          >
            Play again

          </button>
          <div className="container-card-ranking">
            {rankings && rankings
              .sort((a, b) => b.score - a.score).map((item, index) => (
                <div className="card-ranking" key={ index }>
                  <img
                    className="gravatar-img img-ranking"
                    src={ item.image }
                    alt={ item.image }
                  />
                  <div className="container-score-infos">
                    <p data-testid={ `player-name-${index}` }>{item.name}</p>
                    <p
                      data-testid={ `player-score-${index}` }
                    >
                      {`Score: ${item.score}`}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </>
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
