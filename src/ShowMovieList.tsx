import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'

import { getMoviesToRank } from './movies'
import { setMoviesToVote } from './movieVoter'
import './App.css';
import ShowMovie from './ShowMovie';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { RootState } from './store'
import { updateMovieVote } from './movieVoter'

export default function ShowMovieList() {
  const movies = useSelector((state: RootState) => state.moviesToVote);
  const votes = useSelector((state: RootState) => state.movieVoter);
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      if (!movies.length) {
        dispatch(setMoviesToVote(await getMoviesToRank([], Object.keys(votes))))
      }
    })()
  })
  const hideAll = () => {
    movies.forEach((movie) => dispatch(updateMovieVote(movie.id, 0)))
  }
  return (
    <div>
      {movies && movies.length > 0 && <Button onClick={() => hideAll()}>Hide all</Button>}
      {<Grid container spacing={3}>
        {movies.map((m) => (
          <Grid item key={m.id} xs={4}>
            <ShowMovie key={m.id.toString()} movie={m} />
          </Grid>
        ))}
      </Grid>}
    </div>
  );
}
