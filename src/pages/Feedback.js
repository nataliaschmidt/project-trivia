import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    const { assertions, score } = this.props;
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
      </div>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
});

export default connect(mapStateToProps)(Feedback);
