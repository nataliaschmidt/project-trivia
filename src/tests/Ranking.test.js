import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils'
import Ranking from '../pages/Ranking';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App'
import { arrayRankingLocalStorage } from './helpers/arrayRankingLocalStorage';

describe('testa a página Ranking', () => {
  beforeEach(() => {
    localStorage.setItem('ranking', JSON.stringify(arrayRankingLocalStorage))
  })

  test('Testa se a página é renderizada corretamente', () => {
    renderWithRouterAndRedux(<Ranking />)

    expect(screen.getByTestId('ranking-title')).toBeInTheDocument();
    expect(screen.getByTestId('btn-go-home')).toBeInTheDocument();
  });

  test('Testa se ao clickar no botão de "Página Inicial" o score é zerado e a página redirecionada para o Login ', async () => {
    const initialEntries = ['/ranking'];
    const { store, history } = renderWithRouterAndRedux(<App />, { initialEntries })
    const btnHome = screen.getByRole('button', {
      name: /página inicial/i
    });

    act(() => {
      userEvent.click(btnHome);
    });

    const state = store.getState();
    expect(state.player.score).toBe(0);
    await waitFor(() => {
      expect(history.location.pathname).toBe('/');
    });
  });

  test('Testa se o ranking renderiza corretamente os participantes', async() => {
    renderWithRouterAndRedux(<Ranking />);
    const player1 =  screen.getByTestId('player-score-0')
    expect(player1.innerHTML).toBe('170')
    const player2 =  screen.getByTestId('player-score-1')
    expect(player2.innerHTML).toBe('140')
  })
});