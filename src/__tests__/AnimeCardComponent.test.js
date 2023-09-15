import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../redux/store';
import AnimeCard from '../components/AnimeCardComponent';

describe('renders AnimeCardComponent', () => {
  it('matches the snapshot', () => {
    const { container } = render(
      <Provider store={store}>
        <AnimeCard />
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });
});
