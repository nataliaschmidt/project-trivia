import React, { Component } from 'react';
import Header from '../components/Header';
import { fetchQuestions } from '../services';
// import PropTypes from 'prop-types';

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
  };

  componentDidMount() {
    this.getQuestions();
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
    this.setState({
      questions: questions.results,
      correctAnswer: questions.results[0].correct_answer,
      currentAnswers: [...questions.results[0].incorrect_answers,
        questions.results[0].correct_answer],
      currentQuestion: questions.results[0].question,
      currentCategory: questions.results[0].category,
    });
  };

  render() {
    const { currentAnswers,
      currentQuestion,
      currentCategory,
      isCorrect, result, correctAnswer, questions, currentIndex } = this.state;
    console.log(questions, currentIndex);
    return (
      <div>
        <Header />
        <section>
          <h3
            data-testid="question-category"
          >
            {currentCategory}

          </h3>
          {result && (
            isCorrect ? (
              <p>Correto</p>
            ) : (
              <p>Errado</p>
            )
          )}
          <p
            dangerouslySetInnerHTML={ { __html: currentQuestion } }
            data-testid="question-text"
          />
          <section data-testid="answer-options">
            {currentAnswers
              .sort(() => Math.random() - sortNumber)
              .map((item, index) => (
                <button
                  key={ item }
                  type="button"
                  dangerouslySetInnerHTML={ { __html: item } }
                  data-testid={
                    item === correctAnswer ? 'correct-answer' : `wrong-answer-${index}`
                  }
                  aria-label={ item }
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
