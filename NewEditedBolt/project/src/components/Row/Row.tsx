import React, { useState, useEffect } from 'react';
import axios from '../../api/axios';
import { motion } from 'framer-motion';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';

const base_url = "https://image.tmdb.org/t/p/original/";

interface RowProps {
  title: string;
  fetchURL: string;
  isLargeRow?: boolean;
}

interface Movie {
  id: number;
  name: string;
  title: string;
  original_name: string;
  poster_path: string;
  backdrop_path: string;
}

const Row: React.FC<RowProps> = ({ title, fetchURL, isLargeRow = false }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [trailerUrl, setTrailerUrl] = useState<string | null>("");

  useEffect(() => {
    async function fetchData() {
      try {
        const request = await axios.get(fetchURL);
        setMovies(request.data.results);
      } catch (error) {
        console.error("Error fetching row data:", error);
      }
    }
    fetchData();
  }, [fetchURL]);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const handleClick = async (movie: Movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      try {
        const url = await movieTrailer(
          movie?.name || movie?.title || movie?.original_name || ""
        );
        const urlParams = new URLSearchParams(new URL(url).search);
        setTrailerUrl(urlParams.get("v"));
      } catch (error) {
        console.error("Error fetching trailer:", error);
      }
    }
  };

  return (
    <motion.div 
      className="row"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold text-white mb-4 ml-4">{title}</h2>
      <div className="flex overflow-x-scroll overflow-y-hidden p-4 scrollbar-hide">
        <div className="flex space-x-4">
          {movies.map((movie) => (
            <motion.img
              key={movie.id}
              onClick={() => handleClick(movie)}
              className={`object-contain cursor-pointer transition-transform duration-300 hover:scale-110 ${
                isLargeRow ? 'h-64 min-w-[200px]' : 'h-40 min-w-[150px]'
              }`}
              src={`${base_url}${
                isLargeRow ? movie.poster_path : movie.backdrop_path
              }`}
              alt={movie.name || movie.title || movie.original_name}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>
      </div>
      {trailerUrl && (
        <div className="relative pt-[56.25%] mt-4">
          <YouTube
            videoId={trailerUrl}
            opts={opts}
            className="absolute top-0 left-0 w-full h-full"
          />
        </div>
      )}
    </motion.div>
  );
};

export default Row;