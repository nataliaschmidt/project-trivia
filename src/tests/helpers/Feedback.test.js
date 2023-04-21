import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './renderWithRouterAndRedux';
import App from '../../App';
import Feedback from '../../pages/Feedback';

describe('Feedback page', () => {
    it('testando a renderização do componente', () => {
      const { container } = renderWithRouterAndRedux(<Feedback />);
      expect(container).toBeInTheDocument();
    });
  });

  it(' testar se o texto "Could be better..." é exibido quando o número de acertos é menor que 3', () => {
    const initialState = {
        token: "mockedToken",
        player: {
          name: 'Player Name',
          gravatarEmail: 'player@email.com',
          score: 10,
          assertions: 2,
        }
      }
    renderWithRouterAndRedux(<App />, initialState, "/feedback");

    const feedbackText = screen.getByTestId('feedback-text');
    expect(feedbackText).toHaveTextContent('Could be better...');
  });

  it('testar se o texto "Well Done!" é exibido quando o número de acertos é igual ou maior que 3', () => {
    const initialState = {
        token: "mockedToken",
        player: {
          name: 'Player Name',
          gravatarEmail: 'player@email.com',
          score: 10,
          assertions: 3,
        }
      }
    renderWithRouterAndRedux(<App />, initialState, "/feedback");
    const feedbackText = screen.getByTestId('feedback-text');
    expect(feedbackText).toHaveTextContent('Well Done!');
  });

  it('testar se o placar final é exibido corretamente', () => {
    const initialState = {
        token: "mockedToken",
        player: {
          name: 'Player Name',
          gravatarEmail: 'player@email.com',
          score: 10,
          assertions: 2,
        }
      }
    renderWithRouterAndRedux(<App />, initialState, "/feedback");

    const finalScore = screen.getByTestId('feedback-total-score');
    expect(finalScore).toHaveTextContent('10');
  });

  it('testar se o número de respostas corretas é exibido corretamente', () => {
    const initialState = {
        token: "mockedToken",
        player: {
          name: 'Player Name',
          gravatarEmail: 'player@email.com',
          score: 10,
          assertions: 3,
        }
      }
    renderWithRouterAndRedux(<App />, initialState, "/feedback");

    const totalQuestion = screen.getByTestId('feedback-total-question')
    expect(totalQuestion).toHaveTextContent('3');
  });

  it('testar se o botão "Play Again" funciona corretamente', async () => {
    const initialState = {
        token: "mockedToken",
        player: {
          name: 'Player Name',
          gravatarEmail: 'player@email.com',
          score: 10,
          assertions: 3,
        }
      }
    const { history } = renderWithRouterAndRedux(<App />, initialState, "/feedback");

    const playAgainButton = screen.getByTestId('btn-play-again');
    userEvent.click(playAgainButton);
    await waitFor(() => expect(history.location.pathname).toBe('/'));
  });

  it('testar se o botão "Ranking" funciona corretamente', async () => {
    const initialState = {
        token: "mockedToken",
        player: {
          name: 'Player Name',
          gravatarEmail: 'player@email.com',
          score: 10,
          assertions: 3,
        }
      }
    const { history } = renderWithRouterAndRedux(<App />, initialState, "/feedback");

    const rankingButton = screen.getByTestId('btn-ranking');
    userEvent.click(rankingButton);
    await waitFor(() => expect(history.location.pathname).toBe('/ranking'));
  });
  