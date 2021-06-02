import { DecisionTreeClassifier as DTClassifier, TreeNode } from 'ml-cart';
import { Movie, Genre } from './movies'

const ACTION_UPDATE_MODEL = 'update_model'

const options = {
  gainFunction: 'gini',
  maxDepth: 10,
  minNumSamples: 3,
};

export function moviePredictorReducer(state: {
  model: DTClassifier,
  tree: TreeNode,
} = {
  model: new DTClassifier(options),
  tree: { distribution: { data: [0, 0 ] } },
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
    const X = Object.keys(votes).map((movieId) => {
      const movie = action.movies.find((m) => m.id.toString() === movieId)
      return action.genres.map((g) => movie && movie.genres.includes(g.id) ? 1 : 0)
    })
    const y = Object.values(votes)
    state.model.train(X, y)
    state.tree = state.model.toJSON().root
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
