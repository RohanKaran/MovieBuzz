import React, {Component} from "react";
import axios from "axios";
import {CircularProgress, Grid, Rating, Typography} from "@mui/material";

const TMDB_KEY = process.env.REACT_APP_TMDB_API_KEY
const POSTER_ROOT = process.env.REACT_APP_TMDB_POSTER

class SelectedMovie extends Component {
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
    let js, release_date, title, overview, backdrop_path, poster_path, rating
    await axios.get(link).then(r => js = JSON.parse(JSON.stringify(r.data)))
    for (const jsKey in js) {
      if (js[jsKey].length !== 0) {
        if (jsKey === "movie_results") {
          release_date = js[jsKey][0]["release_date"]
          title = js[jsKey][0]["title"]
        } else if (jsKey === "tv_results") {
          release_date = js[jsKey][0]["first_air_date"]
          title = js[jsKey][0]["name"]
        }
        overview = js[jsKey][0]["overview"]
        rating = js[jsKey][0]["vote_average"]
        poster_path = js[jsKey][0]["poster_path"]
        if (js[jsKey][0]["backdrop_path"] !== null) {
          backdrop_path = js[jsKey][0]["backdrop_path"]
        }
      }
    }
    data =  [title, rating, overview, release_date,  poster_path, backdrop_path]
    this.setState({ arr: data });
  }


  render() {
    const {arr} = this.state
    console.log(arr)
    return (
      <>
        {arr ? <div
            style={{
              width:"inherit", backgroundImage:`url(${POSTER_ROOT}${arr[5]})`, backgroundSize:"cover"
          }}>
          <div>
              <Grid container spacing={5} style={{opacity:1}}>
                <Grid item lg={4} xs={12} style={{textAlign:"right"}}>
                  <img src={POSTER_ROOT + arr[4]} alt={"poster"} width={"80%"}/>
                </Grid>
                <Grid item lg={8} xs={12} style={{paddingRight:"5rem"}}>
                  <Typography component={"h1"} variant={"h3"}>
                    {arr[0]}
                  </Typography>
                  <Rating defaultValue={(arr[1] * 1.0 )/ 2} precision={0.5}/>
                  <Typography component={"h2"} variant={"h5"}>
                    <br/> Overview
                  </Typography>
                  <Typography component={"tspan"} variant={"body1"}>
                    {arr[2]} <br/> <br/>
                  </Typography>
                  <Typography component={"tspan"} variant={"body1"}>
                    Release Date: {arr[3]}
                  </Typography>
                </Grid>
              </Grid>

            </div>

          </div>: <div/>}
      </>
    )
  }
}

export default SelectedMovie