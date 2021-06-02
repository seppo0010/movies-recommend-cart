import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { movieVoterReducer, moviesToVoteReducer } from './movieVoter'

let rootReducer = combineReducers({
  movieVoter: movieVoterReducer,
  moviesToVote: moviesToVoteReducer,
})

let store = createStore(rootReducer, applyMiddleware(thunk));
export type RootState = ReturnType<typeof store.getState>
export default store;
