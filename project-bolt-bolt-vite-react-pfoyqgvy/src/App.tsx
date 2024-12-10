import Navbar from './components/Navbar'
import Banner from './components/Banner'
import MovieRow from './components/MovieRow'
import { movieData } from './data/movies'

function App() {
  return (
    <main className="relative min-h-screen bg-zinc-900">
      <Navbar />
      <Banner />
      <div className="relative space-y-8 px-4 pb-16 md:px-8">
        <MovieRow title="Trending Now" movies={movieData.trending} />
        <MovieRow title="Top Rated" movies={movieData.topRated} />
        <MovieRow title="Action Movies" movies={movieData.actionMovies} />
      </div>
    </main>
  )
}

export default App