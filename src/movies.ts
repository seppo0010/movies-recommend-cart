import moviesMetadata from './movies_metadata.csv'
import * as d3 from "d3";

export interface Movie {
  id: number
  budget: number
  popularity: number
  genres: number[]
  title: string
  runtime: number
  voteAverage: number
  posterPath: string | undefined
}

export interface Genre {
  id: number
  name: string
}
const apiBaseURL = 'https://api.themoviedb.org/3/'
const apiKey = 'e930b9cc0693a6cff131c4a9ca0bd15f'
const genresIdToGenre: {[key: string]: Genre} = {}
const configuration = (async () => {
  const req = await fetch(`${apiBaseURL}configuration?api_key=${apiKey}`)
  return await req.json()
})()

export async function getMoviePosterURL(m: Movie): Promise<string> {
  const req = await fetch(`https://api.themoviedb.org/3/movie/${m.id}?api_key=${apiKey}`)
  const path = (await req.json()).poster_path
  const config = await configuration
  return `${config.images.secure_base_url}/${config.images.poster_sizes[4]}${path}`
}
function getGenresId(genres: Genre[]): number[] {
  return genres.map((g) => {
    genresIdToGenre[g.id.toString()] = g
    return g.id
  })
}

export function getGenres(genres: number[]): Genre[] {
  return genres.map((g) => genresIdToGenre[g.toString()])
}

export async function getMovies(): Promise<Movie[]> {
  const df = (await d3.csv(moviesMetadata)).map((m) => { 
  return {
    id: parseInt(m.id || '0'),
    budget: parseInt(m.budget || '0'),
    popularity: parseInt(m.popularity || '0'),
    genres: getGenresId(JSON.parse((m.genres || '[]').replace(/'/g, '"')).map((g: Genre) => {
      g.name = g.name.replace(/"/g, "'")
      return g
    })),
    title: m.title || '',
    runtime: parseFloat(m.runtime || '0'),
    voteAverage: parseFloat(m.vote_average || '0'),
    posterPath: m.poster_path,
  }})
  return df.sort((a, b) => d3.descending(a.popularity, b.popularity))
}
