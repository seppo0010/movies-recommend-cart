import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import Typography from '@material-ui/core/Typography';

import { Movie, getMoviePosterURL } from './movies'
import { setMovieVote } from './movieVoter'
import { RootState } from './store'
import { getMoviesToRank } from './movies'
import { setMoviesToVote } from './movieVoter'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      width: 174,
      height: 300
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
    },
    content: {
      flex: '1 0 auto',
    },
  })
)

function ShowMovie(props: {movie: Movie}) {
  const { movie } = props
  const [posterURL, setPosterURL] = useState<string | null>()
  useState(() => {
    (async () => {
      setPosterURL(await getMoviePosterURL(movie))
    })()
  })
  const classes = useStyles();
  const dispatch = useDispatch()
  const movies = useSelector((state: RootState) => state.moviesToVote);
  const votes = useSelector((state: RootState) => state.movieVoter);

  async function vote(vote: number) {
    dispatch(setMovieVote(movie.id, vote))
    // this ain't pretty, but it works
    dispatch(setMoviesToVote(await getMoviesToRank(movies, Object.keys(votes).concat([movie.id.toString()]))))
  }
  return (
    <Card className={classes.root}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          {posterURL && <CardMedia
            component="img"
            alt={movie.title}
            height="140"
            image={posterURL}
            title=""
            />}
          <Typography variant="body2" component="p">
            {movie.title}
          </Typography>
        </CardContent>
        <CardActions>
          <IconButton aria-label="me gustó" onClick={() => vote(1)}>
            <ThumbUpIcon/>
          </IconButton>
          <IconButton aria-label="no me gustó" onClick={() => vote(-1)}>
            <ThumbDownIcon />
          </IconButton>
          <IconButton aria-label="ocultar" onClick={() => vote(0)}>
            <VisibilityOffIcon />
          </IconButton>
        </CardActions>
      </div>
    </Card>
  )
}
export default ShowMovie
