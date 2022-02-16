import React, {Component} from "react";
import axios from "axios";
import {Typography} from "@mui/material";

const TMDB_KEY = process.env.REACT_APP_TMDB_API_KEY
const POSTER_ROOT = process.env.REACT_APP_TMDB_POSTER
class MovieList extends Component {
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
        if (js[jsKey][0]["backdrop_path"].length !== 0) {
          backdrop_path = js[jsKey][0]["backdrop_path"]
        }
      }
    }
    data =  [title, overview, release_date, rating, poster_path, backdrop_path]
    this.setState({ arr: data });
  }

  render() {
    const {arr} = this.state
    return (
      <>
        <div >
          {arr &&
            <div style={{height:"auto", width:"150px"}}>
              <img src={POSTER_ROOT + arr[4]} width={"100%"} height={"200px"} alt={'poster'}/>
              <div align={'left'}>
                <Typography component={"text"} color={"whitesmoke"}>
                  {arr[0]}
                </Typography>
              </div>
            </div>
          }
          </div>
      </>
    )
  }

  // <>
      //   {arr && <div style={{height: "100px", width: "auto"}}>
      //
      //   </div>}
      //   <div>
      //     poster
      //   </div>
      // </>
}

export default MovieList