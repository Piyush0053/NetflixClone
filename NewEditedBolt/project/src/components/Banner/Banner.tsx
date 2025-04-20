import React, { useState, useEffect } from 'react';
import axios from '../../api/axios';
import requests from '../../api/requests';
import { Play, Info } from 'lucide-react';

function Banner() {
  const [movie, setMovie] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const request = await axios.get(requests.fetchNetflixOriginals);
        setMovie(
          request.data.results[
            Math.floor(Math.random() * request.data.results.length - 1)
          ]
        );
      } catch (error) {
        console.error("Error fetching banner data:", error);
      }
    }
    fetchData();
  }, []);

  function truncate(str: string, n: number) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  if (!movie) return null;

  return (
    <header 
      className="relative h-[448px] text-white object-contain"
      style={{
        backgroundSize: "cover",
        backgroundImage: `linear-gradient(180deg, transparent, rgba(37, 37, 37, 0.61), #111),
          url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        backgroundPosition: "center center",
      }}
    >
      <div className="ml-8 pt-32 h-48">
        <h1 className="text-5xl font-bold pb-3">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="flex gap-4 my-4">
          <button className="banner-button bg-white text-black">
            <Play className="h-5 w-5" />
            Play
          </button>
          <button className="banner-button bg-gray-500/70">
            <Info className="h-5 w-5" />
            More Info
          </button>
        </div>
        <h1 className="w-[45rem] leading-5 pt-4 text-sm max-w-[360px] h-20">
          {truncate(movie?.overview, 150)}
        </h1>
      </div>
    </header>
  );
}

export default Banner;