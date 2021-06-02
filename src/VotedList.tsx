import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from './store'
import { Movie, getAllMovies } from './movies'
import { updateMovieVote } from './movieVoter'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import CancelIcon from '@material-ui/icons/Cancel';

export default function VotedList() {
  const votes = useSelector((state: RootState) => state.movieVoter);
  const dispatch = useDispatch()
  const [movies, setMovies] = useState<{[id: string]: Movie}>({})
  useState(() => {
    (async () => {
      const ms = await getAllMovies()
      setMovies(Object.fromEntries(ms.map((m) => [m.id.toString(), m])))
    })()
  })
  const moviesToVote = useSelector((state: RootState) => state.moviesToVote);
  if (!moviesToVote || moviesToVote.length === 0) return <></>
  async function unvote(movieId: string) {
    dispatch(updateMovieVote(parseInt(movieId), undefined))
  }
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Movie</TableCell>
            <TableCell>Vote</TableCell>
            <TableCell>Cancel</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.entries(votes).sort((m1, m2) => movies[m1[0]].title.localeCompare(movies[m2[0]].title)).map(([movieId, vote]) => (
            movies[movieId] && <TableRow key={movieId}>
              <TableCell component="th" scope="row">
                {movies[movieId].title}
              </TableCell>
              <TableCell scope="row">
                {vote === 1 && <ThumbUpIcon />}
                {vote === 0 && <VisibilityOffIcon />}
                {vote === -1 && <ThumbDownIcon />}
              </TableCell>
              <TableCell scope="row">
                <IconButton aria-label="me gustó" onClick={() => unvote(movieId)}>
                  <CancelIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
