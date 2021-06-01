import React, {useState} from 'react';
import {getMovies} from './movies'
import './App.css';

function App() {
  useState(() => {
    (async () => console.log(await getMovies()))()
  })
  return (
    <div className="App">
    </div>
  );
}

export default App;
