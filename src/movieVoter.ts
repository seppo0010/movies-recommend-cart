import { Movie, getMoviesToRank, getAllMovies, getAllGenres } from './movies'
import { RootState } from './store'
import { updateModel } from './moviePredictor'

const ACTION_MOVIE_VOTE = 'set_movie_vote'
const ACTION_SET_MOVIES_TO_VOTE = 'set_movies_to_vote'

export function movieVoterReducer(state: {[movieId: string]: number} = {}, action: any) {
  if (typeof state !== typeof undefined && action.type === ACTION_MOVIE_VOTE) {
    state = Object.fromEntries(Object.entries(state))
    const {movieId, vote} = action
    if (typeof vote === typeof undefined) {
      delete state[movieId.toString()]
    } else {
      state[movieId.toString()] = vote
    }
    return state
  }
  return state
}

function setMovieVote(movieId: number, vote: number | undefined) {
  return {
    type: ACTION_MOVIE_VOTE,
    movieId,
    vote,
  }
}

export function moviesToVoteReducer(state: Movie[] = [], action: any): Movie[] {
  if (typeof state !== typeof undefined && action.type === ACTION_SET_MOVIES_TO_VOTE) {
    return action.movies.slice()
  }
  return state
}

export function setMoviesToVote(movies: Movie[]) {
  return {
    type: ACTION_SET_MOVIES_TO_VOTE,
    movies,
  }
}

export function updateMovieVote(movieId: number, vote: number | undefined) {
  return function(dispatch: any, getState: () => RootState) {
    return (async () => {
      await dispatch(setMovieVote(movieId, vote))
      const state = getState()
      const movies = state.moviesToVote;
      const votes = state.movieVoter
      await dispatch(setMoviesToVote(await getMoviesToRank(movies, Object.keys(votes))))
      dispatch(updateModel(votes, await getAllMovies(), getAllGenres()))
    })()
  }
}
