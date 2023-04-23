import Game from "../pages/Game"
import { renderWithRouterAndRedux } from "./helpers/renderWithRouterAndRedux";
import mockFetchQuestions from "./helpers/mockFetchQuestions";
import { act } from 'react-dom/test-utils';
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

describe('Testa a página "Game"', () => {
  beforeEach(() => {
    mockFetchQuestions()
  });

  test('Verifica se todos os elementos da página são renderizados', async () => {
    const initialEntries = ['/game']
    renderWithRouterAndRedux(<App />, {initialEntries});
    const timer = await screen.findByTestId('timer');
    const questionCategory = await screen.findByTestId('question-category');
    const questionText = await screen.findByTestId('question-text');
    const answerTrue = await screen.findByText('True');
    const answerFalse = await screen.findByText('False');
    expect(screen.queryByTestId('btn-next')).toBe(null)
    expect(questionCategory.innerHTML).toBe('Geography');
    expect(questionText.innerHTML).toBe('The Republic of Malta is the smallest microstate worldwide.')
    expect(answerTrue.innerHTML).toBe('True');
    expect(answerFalse.innerHTML).toBe('False');
    expect(timer.innerHTML).toBe('30');
    await waitFor(() => {
      expect(timer.innerHTML).toBe('29')
    }, 1000)
    expect(answerFalse.style.border).toBe('3px solid');
    userEvent.click(answerFalse);
    await waitFor(() => {
      // expect(screen.getByText(/correto/i)).toBeInTheDocument();
      expect(answerFalse.style.border).toBe('3px solid rgb(6, 240, 15)');
      expect(answerTrue.style.border).toBe('3px solid red');
      expect(screen.getByRole('button', {
        name: /next/i
      })).toBeInTheDocument();
    })
  })

  test('Verifica se ao clicar no botão next é renderizada a próxima pergunta', async () => {
    const initialEntries = ['/game']
    const { history } = renderWithRouterAndRedux(<App />, { initialEntries });
    const questionText = await screen.findByTestId('question-text');
    const answerFalse = await screen.findByText('False');
    const timer = await screen.findByTestId('timer');
    expect(questionText.innerHTML).toBe('The Republic of Malta is the smallest microstate worldwide.')
    userEvent.click(answerFalse);
    await waitFor(() => {
      const btnNext = screen.getByRole('button', {
        name: /next/i
      });
      userEvent.click(btnNext);
      expect(questionText.innerHTML).toBe('In quantum physics, which of these theorised sub-atomic particles has yet to be observed?')
      expect(timer.innerHTML).toBe('30');
      const correctAnswer = screen.getByTestId('correct-answer');
      userEvent.click(correctAnswer);

      const btnNext2 = screen.getByRole('button', {
        name: /next/i
      });
      userEvent.click(btnNext2);
      expect(questionText.innerHTML).toBe("Generally, which component of a computer draws the most power?")
      const correctAnswer3 = screen.getByTestId('correct-answer');
      userEvent.click(correctAnswer3);
      const btnNext3 = screen.getByRole('button', {
        name: /next/i
      });
      userEvent.click(btnNext3);
      expect(questionText.innerHTML).toBe("What is the most expensive weapon in Counter-Strike: Global Offensive?")
      const correctAnswer4 = screen.getByTestId('correct-answer');
      userEvent.click(correctAnswer4);
      const btnNext4 = screen.getByRole('button', {
        name: /next/i
      });
      userEvent.click(btnNext4);

      expect(questionText.innerHTML).toBe("Who was the Author of the manga Uzumaki?");
      const correctAnswer5 = screen.getByTestId('correct-answer');
      userEvent.click(correctAnswer5);
      const btnNext5 = screen.getByRole('button', {
        name: /next/i
      });
      userEvent.click(btnNext5);
      expect(history.location.pathname).toBe('/feedback')
      expect(screen.getByRole('button', {
        name: /play again/i
      })).toBeInTheDocument();
    });
  });

test('Verifica se quando o timer chegar em 0, desabilita os botões de resposta', async () => {
  jest.useFakeTimers();
  const initialEntries = ['/game'];
  renderWithRouterAndRedux(<App />, { initialEntries });
  await waitFor(() => {
    expect(screen.getByTestId('correct-answer')).toBeEnabled();
    expect(screen.getByText('True')).toBeEnabled();
    expect(screen.getByTestId('correct-answer').style.border).toBe('3px solid');
    expect(screen.getByText('True').style.border).toBe('3px solid');
  });
  const timer = await screen.findByTestId('timer');
  await act(async () => {
    jest.advanceTimersByTime(30000);
  });
  expect(timer.innerHTML).toBe('0');
  expect(screen.getByTestId('correct-answer')).toBeDisabled();
  expect(screen.getByTestId('correct-answer').style.border).toBe('3px solid rgb(6, 240, 15)');
  expect(screen.getByText('True').style.border).toBe('3px solid red');
  expect(screen.getByText('True')).toBeDisabled();
  jest.useRealTimers();
});

  

  test('Verifica se o token for inválido se retorna para a página de Login', async () => {
    jest.clearAllMocks()
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: () => Promise.resolve(
        {
          "response_code": 3,
          "results": []
        }
      ),
    });
    const initialEntries = ['/game']
    const { history } = renderWithRouterAndRedux(<App />, { initialEntries });

    await waitFor(() => {
      expect(history.location.pathname).toBe('/')
    });

  });

});