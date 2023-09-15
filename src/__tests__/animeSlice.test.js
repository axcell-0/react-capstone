import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { fetchAnimeDetailsById, fetchAnimeListByCategory } from '../redux/anime/AnimeSlice';

const mockStore = configureMockStore([thunk]);
const store = mockStore();

describe('fetchAnimeListByCategory', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('should fetch anime list by category and return anime data', async () => {
    const category = 'action';
    const expectedAnimeList = [
      {
        id: '1',
        title: 'Anime 1',
        description: 'This is Anime 1',
      },
      {
        id: '2',
        title: 'Anime 2',
        description: 'This is Anime 2',
      },
    ];

    jest.spyOn(axios, 'get').mockResolvedValue({
      data: {
        data: expectedAnimeList.map((anime) => ({
          id: anime.id,
          attributes: { ...anime },
        })),
      },
    });

    await store.dispatch(fetchAnimeListByCategory(category));

    expect(store.getActions()).toMatchSnapshot();
  });

  it('should handle error if anime list fetch by category fails', async () => {
    const category = 'action';

    jest.spyOn(axios, 'get').mockRejectedValue(new Error('Anime list fetch failed'));

    await store.dispatch(fetchAnimeListByCategory(category));

    expect(store.getActions()).toMatchSnapshot();
  });
});

describe('fetchAnimeDetailsById', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('should fetch anime by ID and return anime data', async () => {
    const animeId = '1';
    const expectedAnimeData = {
      id: animeId,
      title: 'Test Anime',
      description: 'test anime',
    };

    jest.spyOn(axios, 'get').mockResolvedValue({
      data: {
        data: {
          id: animeId,
          attributes: { ...expectedAnimeData },
        },
      },
    });

    await store.dispatch(fetchAnimeDetailsById(animeId));

    expect(store.getActions()).toMatchSnapshot();
  });
});
