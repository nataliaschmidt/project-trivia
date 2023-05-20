/* eslint-disable max-lines */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { fetchImage, fetchQuestions } from '../services';
import { actionSetScore } from '../redux/actions';
import './Game.css';

const sortNumber = 0.5;

class Game extends Component {
  state = {
    questions: [],
    correctAnswer: '',
    currentQuestion: '',
    currentAnswers: [],
    currentCategory: '',
    currentIndex: 0,
    currentDifficulty: '',
    result: false,
    isCorrect: false,
    correctColor: '3px solid',
    wrongColor: '3px solid',
    timer: 30,
    // endTimer: false,
    isRunning: true,
  };

  componentDidMount() {
    const SET_INTERVAL = 1000;
    this.getQuestions();
    this.timerId = setInterval(() => this.handleTimer(), SET_INTERVAL);
    if (!JSON.parse(localStorage.getItem('ranking'))) {
      localStorage.setItem('ranking', JSON.stringify([]));
    }
  }

  componentDidUpdate() {
    const { timer, result } = this.state;
    if (timer === 0 && result === false) {
      this.setState({
        result: true,
        // endTimer: true,
        correctColor: '3px solid rgb(6, 240, 15)',
        wrongColor: '3px solid red',
      });
    }
  }

  getQuestions = async () => {
    const { history, settings } = this.props;
    const token = localStorage.getItem('token');
    const LOGOUT_CODE = 3;
    const questions = await fetchQuestions(token, settings);
    console.log(questions);
    if (questions.response_code === LOGOUT_CODE) {
      localStorage.removeItem('token');
      history.push('/');
      return;
    }
    const answers = [...questions.results[0].incorrect_answers,
      questions.results[0].correct_answer];
    this.setState({
      questions: questions.results,
      correctAnswer: questions.results[0].correct_answer,
      currentAnswers: answers.sort(() => Math.random() - sortNumber),
      currentQuestion: questions.results[0].question,
      currentCategory: questions.results[0].category,
      currentDifficulty: questions.results[0].difficulty,
    });
  };

  handleAnswers = (item) => {
    const { correctAnswer } = this.state;
    this.setState({
      result: true,
      isCorrect: item === correctAnswer,
      correctColor: '3px solid rgb(6, 240, 15)',
      wrongColor: '3px solid red',
      isRunning: false,
      // timer: 0,
    }, this.handleScore);
  };

  handleScore = () => {
    const { currentDifficulty, isCorrect, timer } = this.state;
    const { dispatch } = this.props;
    if (isCorrect) {
      let difficultyScore = 0;
      const hardScore = 3;
      if (currentDifficulty === 'hard') {
        difficultyScore = hardScore;
      }
      if (currentDifficulty === 'medium') {
        difficultyScore = 2;
      }
      if (currentDifficulty === 'easy') {
        difficultyScore = 1;
      }
      const initialScore = 10;
      const score = initialScore + (timer * difficultyScore);
      dispatch(actionSetScore(score));
    }
  };

  handleTimer = () => {
    const { timer, isRunning } = this.state;
    if (timer === 0 || !isRunning) {
      clearInterval(this.timerId);
    } else {
      this.setState((prevState) => ({
        timer: prevState.timer - 1,
      }));
    }
  };

  handlePulseTimer = () => {
    const FIVE = 5;

    const { isRunning, timer } = this.state;
    if (!isRunning || timer === 0) {
      return 'container-timer';
    }

    if (timer > FIVE) {
      return 'container-timer start-time';
    }
    if (timer <= FIVE && timer > 0) {
      return 'container-timer final-timer';
    }
  };

  handleNext = () => {
    const { currentIndex, questions } = this.state;
    const { history, name, email, score } = this.props;
    const nextIndex = currentIndex + 1;
    const SET_INTERVAL = 1000;
    if (nextIndex < questions.length) {
      const answers = [...questions[nextIndex].incorrect_answers,
        questions[nextIndex].correct_answer];
      this.setState({
        correctAnswer: questions[nextIndex].correct_answer,
        currentAnswers: answers.sort(() => Math.random() - sortNumber),
        currentQuestion: questions[nextIndex].question,
        currentCategory: questions[nextIndex].category,
        currentDifficulty: questions[nextIndex].difficulty,
        currentIndex: nextIndex,
        timer: 30,
        correctColor: '3px solid',
        wrongColor: '3px solid',
        isRunning: true,
        result: false,
        isCorrect: false,
        // endTimer: false,
      }, () => {
        this.timerId = setInterval(() => this.handleTimer(), SET_INTERVAL);
      });
    }
    if (nextIndex === questions.length) {
      history.push('/feedback');
      const ranking = JSON.parse(localStorage.getItem('ranking'));
      const newRanking = [...ranking, {
        name,
        image: fetchImage(email),
        score,
      }];
      localStorage.setItem('ranking', JSON.stringify(newRanking));
    }
  };

  render() {
    const { currentAnswers,
      currentQuestion,
      currentCategory,
      // isCorrect,
      result,
      correctAnswer,
      questions,
      correctColor,
      wrongColor,
      timer,
      // endTimer
    } = this.state;
    return (
      <>
        <Header />
        <main>
          {questions.length > 0 && (
            <>
              <div
                className={ this.handlePulseTimer() }
              >
                <p data-testid="timer">{timer}</p>
              </div>

              <div className="card-game">
                <h3
                  data-testid="question-category"
                >
                  {`Category: ${currentCategory}`}

                </h3>
                <p
                  dangerouslySetInnerHTML={ { __html: currentQuestion } }
                  data-testid="question-text"
                />
                <div className="container-answer-button">
                  {currentAnswers
                    // .sort(() => Math.random() - sortNumber)
                    .map((item, index) => (
                      <button
                        className="button is-link is-outlined btn-answer"
                        key={ item }
                        type="button"
                        dangerouslySetInnerHTML={ { __html: item } }
                        disabled={ result }
                        data-testid={
                          item === correctAnswer
                            ? 'correct-answer' : `wrong-answer-${index}`
                        }
                        aria-label={ item }
                        style={ {
                          border: item === correctAnswer ? correctColor : wrongColor,
                        } }
                        onClick={ () => this.handleAnswers(item) }
                      />
                    ))}
                </div>
                {result && (
                  <button
                    className="button is-link is-inverted is-outlined is-rounded"
                    type="button"
                    onClick={ this.handleNext }
                    data-testid="btn-next"
                  >
                    Next

                  </button>
                )}
              </div>
            </>
          )}
        </main>
      </>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  settings: PropTypes.shape({
    number: PropTypes.string,
    category: PropTypes.string,
    difficulty: PropTypes.string,
    type: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  name: state.player.name,
  email: state.player.gravatarEmail,
  score: state.player.score,
  settings: state.player.settings,
});
export default connect(mapStateToProps)(Game);
