import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaArrowRightLong } from 'react-icons/fa6';

const Details = () => {
  const data = useSelector((store) => store.anime.anime);
  const isLoading = useSelector((store) => store.anime.loading);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const renderDetailItem = (label, value, unit = null, bgColorClass) => (
    <li className={`h-32 flex justify-between items-center pl-2 pr-2 text-lg ${bgColorClass}`}>
      <p>{label}</p>
      <p className="flex gap-4">
        <span>{value}</span>
        {unit && <span>{unit}</span>}
        <Link to="/" className="top-2 left-38 p-1 border-2 border-white text-white rounded-full">
          <FaArrowRightLong className="h-5 w-5" />
        </Link>
      </p>
    </li>
  );

  return (
    <div>
      <div className="flex justify-between items-center pl-2 pt-2 pb-2 pr-8 bg-sky-600 text-white">
        {data.posterImage?.tiny && (
          <img src={data.posterImage?.tiny} alt={data.canonicalTitle} className="w-32 border-white border-4 rounded" />
        )}
        <div className="flex flex-col items-end">
          <p className="font-bold text-2xl text-right uppercase">{data.canonicalTitle}</p>
          <p className="font-semibold text-lg flex items-center gap-1">
            <span>{data.popularityRank}</span>
            <span className="text-sm">rank</span>
          </p>
        </div>
      </div>
      <p className="pl-2 pt-1 pb-1 text-white bg-sky-800">More details - 2023</p>
      <ul className="bg-sky-800 text-white">
        {renderDetailItem('Episodes count', data.episodeCount, 'episodes', 'bg-sky-600')}
        {renderDetailItem('Episode length', data.episodeLength, 'minutes', 'bg-sky-800')}
        {renderDetailItem('Date of creation', data.createdAt ? data.createdAt.slice(0, 10) : 'N/A', null, 'bg-sky-600')}
        {renderDetailItem('Type', data.showType, null, 'bg-sky-800')}
        {renderDetailItem('First appearance', data.tba || 'N/A', null, 'bg-sky-600')}
        {renderDetailItem('Total length', data.totalLength, 'episodes', 'bg-sky-800')}
        {renderDetailItem('Subtype', data.subtype, null, 'bg-sky-600')}
        {renderDetailItem('Age Rating', data.ageRating, null, 'bg-sky-800')}
        {renderDetailItem('User Count', data.userCount, null, 'bg-sky-600')}
      </ul>
    </div>
  );
};

export default Details;
