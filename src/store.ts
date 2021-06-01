import { combineReducers, createStore } from 'redux'
import { movieVoterReducer, moviesToVoteReducer } from './movieVoter'

let rootReducer = combineReducers({
  movieVoter: movieVoterReducer,
  moviesToVote: moviesToVoteReducer,
})

let store = createStore(rootReducer);
export type RootState = ReturnType<typeof store.getState>
export default store;
