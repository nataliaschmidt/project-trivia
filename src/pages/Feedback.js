import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { actionResetScore } from '../redux/actions';

class Feedback extends Component {
  handlePlayBtn = () => {
    const { history, dispatch } = this.props;
    dispatch(actionResetScore());
    history.push('/');
  };

  render() {
    const { assertions, score, history } = this.props;
    const number = 3;
    return (
      <div>
        <Header />
        <p
          data-testid="feedback-text"
        >
          {assertions < number ? 'Could be better...' : 'Well Done!'}

        </p>
        <p>
          Placar final:
          <span data-testid="feedback-total-score">
            {score}
          </span>
        </p>
        <p>
          Respostas corretas:
          <span data-testid="feedback-total-question">
            {assertions}
          </span>
        </p>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ this.handlePlayBtn }
        >
          Play Again

        </button>
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ () => history.push('/ranking') }
        >
          Ranking

        </button>
      </div>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
});

export default connect(mapStateToProps)(Feedback);
