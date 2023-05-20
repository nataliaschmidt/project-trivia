import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { actionResetScore } from '../redux/actions';
import './Feedback.css';

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
      <>
        <Header />
        <div className="container-feedback">
          <h1
            className={ assertions < number ? 'text-result-bad' : 'text-result-good' }
          >
            {assertions < number ? 'Could be better...' : 'Well Done!'}

          </h1>

          <div className="bg-border">
            <div className="container-score-info">
              <p>
                {`Final score: ${score}`}
              </p>
              <p>
                {`Correct Answers: ${assertions}`}
              </p>
            </div>
          </div>

          <div className="container-buttons">
            <button
              className="button is-link is-outlined"
              type="button"
              data-testid="btn-play-again"
              onClick={ this.handlePlayBtn }
            >
              Play Again

            </button>
            <button
              className="button is-link is-outlined"
              type="button"
              data-testid="btn-ranking"
              onClick={ () => history.push('/ranking') }
            >
              Ranking

            </button>
          </div>
        </div>
      </>
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
