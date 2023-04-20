import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { fetchQuestions } from '../services';
import { actionSetScore } from '../redux/actions';

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
    endTimer: false,
    isRunning: true,
  };

  componentDidMount() {
    const SET_INTERVAL = 1000;
    this.getQuestions();
    this.timerId = setInterval(() => this.handleTimer(), SET_INTERVAL);
  }

  componentDidUpdate() {
    const { timer, result } = this.state;
    if (timer === 0 && result === false) {
      this.setState({
        result: true,
        endTimer: true,
        correctColor: '3px solid rgb(6, 240, 15)',
        wrongColor: '3px solid red',
      });
    }
  }

  getQuestions = async () => {
    const { history } = this.props;
    const token = localStorage.getItem('token');
    const TOTAL_QUESTIONS = 5;
    const LOGOUT_CODE = 3;
    const questions = await fetchQuestions(TOTAL_QUESTIONS, token);
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
      switch (currentDifficulty) {
      case 'hard':
        difficultyScore = hardScore;
        break;
      case 'medium':
        difficultyScore = 2;
        break;
      case 'easy':
        difficultyScore = 1;
        break;
      default:
        break;
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

  handleNext = () => {
    const { currentIndex, questions } = this.state;
    const { history } = this.props;
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
        endTimer: false,
      }, () => {
        this.timerId = setInterval(() => this.handleTimer(), SET_INTERVAL);
      });
    }
    if (nextIndex === questions.length) {
      history.push('/feedback');
    }
  };

  render() {
    const { currentAnswers,
      currentQuestion,
      currentCategory,
      isCorrect,
      result,
      correctAnswer,
      questions, currentIndex, correctColor, wrongColor, timer, endTimer } = this.state;
    console.log(questions, currentIndex);
    return (
      <div>
        <Header />
        {questions.length > 0 && (
          <p>{timer}</p>
        )}
        <section>
          <h3
            data-testid="question-category"
          >
            {currentCategory}

          </h3>
          {result && !endTimer && (
            isCorrect ? (
              <p>Correto</p>
            ) : (
              <p>Errado</p>
            )
          )}
          {result && (
            endTimer && (
              <p>Acabou o tempo!</p>
            )
          )}
          <p
            dangerouslySetInnerHTML={ { __html: currentQuestion } }
            data-testid="question-text"
          />
          <section data-testid="answer-options">
            {currentAnswers
              // .sort(() => Math.random() - sortNumber)
              .map((item, index) => (
                <button
                  key={ item }
                  type="button"
                  dangerouslySetInnerHTML={ { __html: item } }
                  disabled={ result }
                  data-testid={
                    item === correctAnswer ? 'correct-answer' : `wrong-answer-${index}`
                  }
                  aria-label={ item }
                  style={ {
                    border: item === correctAnswer ? correctColor : wrongColor } }
                  onClick={ () => this.handleAnswers(item) }
                />
              ))}
          </section>
          {result && (
            <button
              type="button"
              onClick={ this.handleNext }
              data-testid="btn-next"
            >
              Next

            </button>
          )}
        </section>
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Game);
