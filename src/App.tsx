import React, {useState} from 'react';
import { getMovies, Movie } from './movies'
import './App.css';
import ShowMovie from './ShowMovie';

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
  const [movie, setMovie] = useState<Movie | null>(null)
  useState(() => {
    (async () => {
     const movies = await getMovies()
     setMovie(shuffle(movies.slice(0, 100))[0])
    })()
  })
  return (
    <div className="App">
      {movie && <ShowMovie movie={movie} />}
    </div>
  );
}

export default App;
