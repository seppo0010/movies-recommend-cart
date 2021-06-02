import React, { useState, useEffect } from 'react'
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

import { Movie, getMoviePosterURL, getAllGenres } from './movies'
import { updateMovieVote } from './movieVoter'
import { movieToRow } from './moviePredictor'
import { RootState } from './store'

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

function format(n: number) {
    return Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n)
}
function ShowMovie(props: {movie: Movie}) {
  const { movie } = props
  const genres = getAllGenres()
  const [posterURL, setPosterURL] = useState<string | null>()
  const moviePredictor = useSelector((state: RootState) => state.moviePredictor)

  useEffect(() => {
    let isMounted = true;
    getMoviePosterURL(movie).then(data => {
      if (isMounted) setPosterURL(data);
    })
    return () => { isMounted = false };
  }, [movie])


  const classes = useStyles();
  const dispatch = useDispatch()

  async function vote(vote: number) {
    dispatch(updateMovieVote(movie.id, vote))
  }
  const prediction = moviePredictor.model ? moviePredictor.model.predict([movieToRow(movie, genres)])[0] : 0.5
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
          <Typography variant="body2" component="p">
            {format(prediction)}
          </Typography>
        </CardContent>
        <CardActions>
          <IconButton aria-label="me gustó" onClick={() => vote(1)}>
            <ThumbUpIcon style={prediction > 0.5 ? {backgroundColor: 'rgba(0, 255, 0, 0.7)', borderRadius: '50%'} : {}}/>
          </IconButton>
          <IconButton aria-label="no me gustó" onClick={() => vote(-1)}>
            <ThumbDownIcon style={prediction < 0.5 ? {backgroundColor: 'rgba(255, 0, 0, 0.7)', borderRadius: '50%'} : {}}/>
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
