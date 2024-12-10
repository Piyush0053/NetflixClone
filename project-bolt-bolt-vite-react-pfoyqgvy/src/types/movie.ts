export interface Movie {
  id: number
  title: string
  imageUrl: string
  videoUrl?: string
  description?: string
  duration?: string
  year?: number
  rating?: string
  genres?: string[]
  match?: number
}