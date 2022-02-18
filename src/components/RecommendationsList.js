import React, {Component} from "react";
import axios from "axios";
import {Card, CardActionArea, CardContent, CardMedia, CircularProgress, Rating, Typography} from "@mui/material";
import {Grid} from "swiper";

const TMDB_KEY = process.env.REACT_APP_TMDB_API_KEY
const POSTER_ROOT = process.env.REACT_APP_TMDB_POSTER

class RecList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "React"
    };
    this.getTodos = this.getTodos.bind(this);
  }

  componentDidMount() {
    this.getTodos();
  }
  async getTodos() {
    let data
    const link = `https://api.themoviedb.org/3/find/${this.props.movie[1]}?api_key=${TMDB_KEY}&external_source=imdb_id`
    let js, title, rating, poster_path
    await axios.get(link).then(r => js = r.data)
    for (const jsKey in js) {
      if (js[jsKey].length !== 0) {
        if (jsKey === "movie_results") {
          // release_date = js[jsKey][0]["release_date"]
          title = js[jsKey][0]["title"]
        } else if (jsKey === "tv_results") {
          // release_date = js[jsKey][0]["first_air_date"]
          title = js[jsKey][0]["name"]
        }
        // overview = js[jsKey][0]["overview"]
        rating = js[jsKey][0]["vote_average"]
        poster_path = js[jsKey][0]["poster_path"]
        // if (js[jsKey][0]["backdrop_path"] !== null) {
        //   backdrop_path = js[jsKey][0]["backdrop_path"]
        // }
      }
    }
    data =  [title, rating, poster_path]
    this.setState({ arr: data});
  }


  render() {
    const {arr} = this.state
    return (
      <div style={{width:"inherit"}}>
      {arr ? <CardActionArea
        style={{height: "100%", display: "flex", flexDirection: 'column', width:"100%"}}
      >
        <Card style={{height: "100%", display: "flex", flexDirection: 'column', width:"100%"}}>
          <CardMedia
            image={POSTER_ROOT + arr[2]}
            title={arr[0]}
            style={{paddingTop: '100%', width:"100%"}}
          />
          <CardContent>
            {/*<Typography gutterBottom variant='h5' component='h2'>*/}
            {/*  {info.display}*/}
            {/*</Typography>*/}
            {/*<Typography>{post.excerpt}</Typography>*/}
          </CardContent>
        </Card>
      </CardActionArea> : <div/>}
    </div>
    )
  }
}

export default RecList