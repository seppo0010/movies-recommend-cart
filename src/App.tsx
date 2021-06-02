import React from 'react';
import { Provider } from 'react-redux'

import './App.css';
import ShowMovieList from './ShowMovieList';
import ShowTree from './ShowTree';
import VotedList from './VotedList';
import Loading from './Loading';
import Container from '@material-ui/core/Container';
import store from './store'

function App() {
  return (
    <Container maxWidth="lg">
      <Provider store={store}>
        <Loading />
        <div className="container">
          <Container maxWidth="sm">
            <ShowMovieList />
          </Container>
          <ShowTree />
        </div>
        <VotedList />
      </Provider>
    </Container>
  );
}

export default App;
