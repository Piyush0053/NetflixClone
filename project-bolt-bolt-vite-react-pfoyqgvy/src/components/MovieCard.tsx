import { useState } from 'react'
import { motion } from 'framer-motion'
import { Play, Plus, ThumbsUp, Volume2, VolumeX } from 'lucide-react'
import { Movie } from '../types/movie'

interface MovieCardProps {
  movie: Movie
}

export default function MovieCard({ movie }: MovieCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isMuted, setIsMuted] = useState(true)

  return (
    <motion.div
      className="relative aspect-video min-w-[200px] cursor-pointer md:min-w-[280px]"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      initial={false}
      animate={isHovered ? { scale: 1.3, zIndex: 50 } : { scale: 1, zIndex: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative h-full w-full rounded-md">
        {isHovered && movie.videoUrl ? (
          <div className="absolute inset-0 overflow-hidden rounded-md">
            <video
              src={movie.videoUrl}
              poster={movie.imageUrl}
              autoPlay
              loop
              muted={isMuted}
              className="h-full w-full object-cover"
            />
          </div>
        ) : (
          <img
            src={movie.imageUrl}
            alt={movie.title}
            className="h-full w-full rounded-md object-cover"
          />
        )}

        {isHovered && (
          <div className="absolute inset-0 rounded-md bg-black/40">
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button className="rounded-full bg-white p-2 hover:bg-white/90">
                    <Play className="h-4 w-4 fill-black text-black" />
                  </button>
                  <button className="rounded-full border-2 border-gray-400 p-2 hover:border-white">
                    <Plus className="h-4 w-4 text-white" />
                  </button>
                  <button className="rounded-full border-2 border-gray-400 p-2 hover:border-white">
                    <ThumbsUp className="h-4 w-4 text-white" />
                  </button>
                </div>
                {movie.videoUrl && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setIsMuted(!isMuted)
                    }}
                    className="rounded-full border-2 border-gray-400 p-2 hover:border-white"
                  >
                    {isMuted ? (
                      <VolumeX className="h-4 w-4 text-white" />
                    ) : (
                      <Volume2 className="h-4 w-4 text-white" />
                    )}
                  </button>
                )}
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2">
                  {movie.match && (
                    <span className="text-sm font-semibold text-green-500">
                      {movie.match}% Match
                    </span>
                  )}
                  {movie.rating && (
                    <span className="border border-gray-400 px-1 text-xs text-white">
                      {movie.rating}
                    </span>
                  )}
                  {movie.duration && (
                    <span className="text-sm text-gray-400">{movie.duration}</span>
                  )}
                </div>
                {movie.genres && (
                  <div className="flex flex-wrap gap-2">
                    {movie.genres.map((genre, index) => (
                      <span key={index} className="text-sm text-gray-400">
                        {genre}
                        {index < movie.genres!.length - 1 && "•"}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}