import React, { useState } from 'react'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';

import { Movie, getMoviePosterURL } from './movies'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      width: 120,
      padding: '0 30px',
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
        </CardContent>
        <CardActions>
          <IconButton aria-label="me gustó">
            <ThumbUpIcon />
          </IconButton>
          <IconButton aria-label="no me gustó">
            <ThumbDownIcon />
          </IconButton>
        </CardActions>
      </div>
    </Card>
  )
}
export default ShowMovie
