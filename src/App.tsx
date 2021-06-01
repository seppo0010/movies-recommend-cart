import React, {useState} from 'react';
import { getMovies, Movie } from './movies'
import './App.css';
import ShowMovie from './ShowMovie';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

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


function App() {
  const [movies, setMovies] = useState<Movie[] | null>(null)
  useState(() => {
    (async () => {
     const movies = await getMovies()
     setMovies(shuffle(movies.slice(0, 12)))
    })()
  })
  return (
    <Container maxWidth="sm">
      <div>
        {movies && <Grid container spacing={3}>
          {movies.map((m) => (
            <Grid item key={m.id} xs={4}>
              <ShowMovie key={m.id.toString()} movie={m} />
            </Grid>
          ))}
        </Grid>}
      </div>
    </Container>
  );
}

export default App;
