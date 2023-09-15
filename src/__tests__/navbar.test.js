import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter, BrowserRouter as Router } from 'react-router-dom';
import Navbar from '../components/Navbar';

describe('Navbar Component', () => {
  test('renders title correctly based on pathname', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/']}>
        <Navbar />
      </MemoryRouter>,
    );
    const titleForRoot = getByText('Most Animes');
    expect(titleForRoot).toBeInTheDocument();
    const { getByText: getByTextDetails } = render(
      <MemoryRouter initialEntries={['/anime-details']}>
        <Navbar />
      </MemoryRouter>,
    );
    const titleForDetails = getByTextDetails('Anime Details');
    expect(titleForDetails).toBeInTheDocument();
  });

  test('renders navbar', () => {
    const { container } = render(
      <Router>
        <Navbar />
      </Router>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
