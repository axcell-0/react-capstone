import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRightLong } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner } from '@material-tailwind/react';
import categories from './categoriesData';
import { fetchAnimeListByCategory, fetchAnimeDetailsById } from '../redux/HomePage.Slice';

const AnimeCard = () => {
  const dispatch = useDispatch();
  const animeList = useSelector((store) => store.anime.animeList);
  const isLoading = useSelector((store) => store.anime.loading);

  const [selectedCategory, setSelectedCategory] = useState('Action');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(fetchAnimeListByCategory(selectedCategory));
  }, [dispatch, selectedCategory]);

  const filteredAnimeList = animeList.filter(
    (anime) => anime.canonicalTitle.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-screen h-screen">
        <Spinner className="h-12 w-12 text-sky-700" />
      </div>
    );
  }

  return (
    <div>
      <div className="bg-gradient-to-b from-sky-500 to-sky-700 p-4 grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-6 text-white">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-1 border-2 border-white ease-in rounded-md text-sky-700"
        >
          {categories.map((category) => (
            <option value={category} key={category}>
              {category}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Search anime by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: '300px' }}
          className="w-100 p-1 border-2 border-white ease-in rounded-md text-sky-700"
        />
      </div>
      <p className="text-white bg-sky-800 p-1 font-lato">Anime by Category</p>
      <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {filteredAnimeList.map((anime) => (
          <li key={anime.id} className="relative odd:bg-sky-700 even:bg-sky-600 text-white">
            <img
              src={anime.posterImage.tiny}
              alt={anime.canonicalTitle}
              className="w-64 md:w-72"
            />
            <div className="p-2 flex flex-col items-end">
              <Link
                to="Details"
                className="absolute top-2 left-38 p-2 font-bold bg-white text-sky-600 rounded-full hover:bg-sky-600 hover:text-white"
              >
                <FaArrowRightLong onClick={() => dispatch(fetchAnimeDetailsById(anime.id))} className="h-6 w-6" />
              </Link>
              <h1 className="font-bold text-2xl uppercase">{anime.canonicalTitle.slice(0, 10)}</h1>
              <p className="flex gap-1">
                {anime.popularityRank}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AnimeCard;
