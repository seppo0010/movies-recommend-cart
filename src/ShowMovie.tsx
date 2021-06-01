import React, { useState } from 'react'
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';

import { Movie, getMoviePosterURL } from './movies'


function ShowMovie(props: {movie: Movie}) {
  const { movie } = props
  const [posterURL, setPosterURL] = useState<string | null>()
  useState(() => {
    (async () => {
      setPosterURL(await getMoviePosterURL(movie))
    })()
  })
  return (
    <div>
      <Card>
        {movie.title}
        {posterURL && <CardMedia
          component="img"
          alt=""
          height="140"
          image={posterURL}
          title=""
          />}
      </Card>
    </div>
  )
}
export default ShowMovie
