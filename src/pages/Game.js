import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { fetchQuestions } from '../services';

const sortNumber = 0.5;

class Game extends Component {
  state = {
    questions: [],
    correctAnswer: '',
    currentQuestion: '',
    currentAnswers: [],
    currentCategory: '',
    currentIndex: 0,
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
      timer: 0,
    });
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
        </section>
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Game;
