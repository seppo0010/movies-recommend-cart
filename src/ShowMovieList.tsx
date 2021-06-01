import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux'

import { getMoviesToRank } from './movies'
import { setMoviesToVote } from './movieVoter'
import './App.css';
import ShowMovie from './ShowMovie';
import Grid from '@material-ui/core/Grid';
import { RootState } from './store'

export default function ShowMovieList() {
  const movies = useSelector((state: RootState) => state.moviesToVote);
  const votes = useSelector((state: RootState) => state.movieVoter);
  const dispatch = useDispatch();
  useState(() => {
    (async () => {
      if (!movies.length) {
        dispatch(setMoviesToVote(await getMoviesToRank([], Object.keys(votes))))
      }
    })()
  })
  return (
    <div>
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
