import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from './store'
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function VotedList() {
  const moviesToVote = useSelector((state: RootState) => state.moviesToVote);
  if (moviesToVote && moviesToVote.length > 0) return <></>
  return (
    <Box alignItems="center">
      <CircularProgress style={{margin: '20px auto', }}/>
    </Box>
  )
}

