import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { movieVoterReducer, moviesToVoteReducer } from './movieVoter'
import { moviePredictorReducer } from './moviePredictor'

let rootReducer = combineReducers({
  movieVoter: movieVoterReducer,
  moviesToVote: moviesToVoteReducer,
  moviePredictor: moviePredictorReducer,
})

let store = createStore(rootReducer, applyMiddleware(thunk));
export type RootState = ReturnType<typeof store.getState>
export default store;
