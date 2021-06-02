import { DecisionTreeRegression as DTRegression, TreeNode } from 'ml-cart';
import { Movie, Genre } from './movies'

const ACTION_UPDATE_MODEL = 'update_model'


export function movieToRow(movie: undefined | Movie, genres: Genre[]) {
  return genres.map((g) => movie && movie.genres.includes(g.id) ? 1 : 0)
}

export function moviePredictorReducer(state: {
  model: DTRegression | null,
  tree: TreeNode,
  columns: string[],
} = {
  model: null,
  tree: { distribution: 0.5 },
  columns: [],
}, action: {
  type: string,
  movies: Movie[],
  genres: Genre[],
  votes: {[movieId: string]: number},
}) {
  if (action.type === ACTION_UPDATE_MODEL) {
    const votes = Object.fromEntries(
      Object.entries(action.votes)
        .filter(([_1, v]) => v !== 0)
        .map(([k, v]) => [k, (v + 1) / 2])
    )
    if (!Object.values(votes).length) {
      return state
    }
    const X = Object.keys(votes).map((movieId) => {
      const movie = action.movies.find((m) => m.id.toString() === movieId)
      return movieToRow(movie, action.genres)
    })
    const y = Object.values(votes)
    const columns = action.genres.map((g) => g.name)
    const model = new DTRegression()
    model.train(X, y)
    console.log(model.toJSON())
    return {
      model,
      tree: model.toJSON().root,
      columns,
    }
  }
  return state
}

export function updateModel(votes: {[movieId: string]: number} = {}, movies: Movie[], genres: Genre[]) {
  return {
    type: ACTION_UPDATE_MODEL,
    votes,
    movies,
    genres,
  }
}
