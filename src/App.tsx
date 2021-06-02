import React from 'react';
import { Provider } from 'react-redux'

import './App.css';
import ShowMovieList from './ShowMovieList';
import ShowTree from './ShowTree';
import Container from '@material-ui/core/Container';
import store from './store'

function App() {
  return (
    <Container maxWidth="lg">
      <Provider store={store}>
        <div className="container">
          <Container maxWidth="sm">
            <ShowMovieList />
          </Container>
          <ShowTree />
        </div>
      </Provider>
    </Container>
  );
}

export default App;
