import React from 'react';
import { Provider } from 'react-redux'

import './App.css';
import ShowMovieList from './ShowMovieList';
import Container from '@material-ui/core/Container';
import store from './store'

function App() {
  return (
    <Container maxWidth="sm">
      <Provider store={store}>
        <ShowMovieList />
      </Provider>
    </Container>
  );
}

export default App;
