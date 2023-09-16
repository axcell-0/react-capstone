import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../Store';
import AnimeCard from '../Components/AnimePage';

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
