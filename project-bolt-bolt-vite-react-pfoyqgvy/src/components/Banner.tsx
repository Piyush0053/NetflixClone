import { Play, Info } from 'lucide-react'
import Button from './ui/Button'
import { truncate } from '../lib/utils'

const BANNER_DATA = {
  title: "Stranger Things",
  description: "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl.",
  imageUrl: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?auto=format&fit=crop&q=80&w=1920"
}

export default function Banner() {
  return (
    <div className="relative h-[85vh] w-full">
      <div className="absolute h-full w-full">
        <img
          src={BANNER_DATA.imageUrl}
          alt={BANNER_DATA.title}
          className="h-full w-full object-cover brightness-[60%]"
        />
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-gradient-to-t from-zinc-900/90 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-gradient-to-r from-zinc-900/90 via-zinc-900/50 to-transparent" />
      
      <div className="absolute bottom-[20%] left-8 max-w-xl md:left-16">
        <h1 className="text-4xl font-bold text-white md:text-6xl">
          {BANNER_DATA.title}
        </h1>
        <p className="mt-4 text-lg text-white">
          {truncate(BANNER_DATA.description, 200)}
        </p>
        <div className="mt-6 flex space-x-4">
          <Button className="px-8">
            <Play className="mr-2 h-5 w-5" /> Play
          </Button>
          <Button variant="secondary" className="px-8">
            <Info className="mr-2 h-5 w-5" /> More Info
          </Button>
        </div>
      </div>
    </div>
  )
}