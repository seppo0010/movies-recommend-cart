import moviesMetadata from './movies_metadata.csv'
import * as d3 from "d3";

export interface Movie {
  budget: number
  popularity: number
  genres: number[]
  title: string
  runtime: number
  voteAverage: number
}

export interface Genre {
  id: number
  name: string
}
const genresIdToGenre: {[key: string]: Genre} = {}

function getGenresId(genres: Genre[]): number[] {
  return genres.map((g) => {
    genresIdToGenre[g.id.toString()] = g
    return g.id
  })
}

export function getGenres(genres: number[]): Genre[] {
  return genres.map((g) => genresIdToGenre[g.toString()])
}

async function getMovies(): Promise<Movie[]> {
  const df = (await d3.csv(moviesMetadata)).map((m) => { 
  return {
    budget: parseInt(m.budget || '0'),
    popularity: parseInt(m.popularity || '0'),
    genres: getGenresId(JSON.parse((m.genres || '[]').replace(/'/g, '"'))),
    title: m.title || '',
    runtime: parseFloat(m.runtime || '0'),
    voteAverage: parseFloat(m.vote_average || '0'),
  }})
  df.sort((a, b) => d3.descending(a.popularity, b.popularity))
  return df
}
export { getMovies }
