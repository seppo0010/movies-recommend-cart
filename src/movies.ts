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
export function getAllGenres(): Genre[] {
  return Object.values(genresIdToGenre)
}

let movies: null | Movie[] = null;
export async function getMovies(): Promise<Movie[]> {
  if (movies) return movies
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
  movies = df.sort((a, b) => d3.descending(a.popularity, b.popularity))
  return movies
}

// https://stackoverflow.com/a/2450976
function shuffle(array: any[]): any[] {
  var currentIndex = array.length, temporaryValue, randomIndex;
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

const moviesToRankNumForward = 100
const moviesToRankNumDisplay = 9
export async function getMoviesToRank(currentMoviesToRank: Movie[], rankedMovies: string[]): Promise<Movie[]> {
  const moviesToRank: (Movie | null)[] = currentMoviesToRank.slice()
  for (let i = 0; i < moviesToRankNumDisplay; i++) {
    if (moviesToRank[i]) {
      const id = (moviesToRank[i] as Movie).id
      if (rankedMovies.includes(id.toString())) {
        moviesToRank[i] = null
      }
    } else {
      moviesToRank[i] = null
    }
  }
  const nextMovies = shuffle((await getMovies())
    .filter((m) => !rankedMovies.includes(m.id.toString()))
    .filter((m) => !currentMoviesToRank.map((m) => m.id).includes(m.id))
    .slice(0, moviesToRankNumForward))
  for (let i = 0; i < moviesToRankNumDisplay; i++) {
    if (!moviesToRank[i]) {
      moviesToRank[i] = nextMovies.pop()
    }
  }
  return moviesToRank as Movie[]
}
