import React, { Component } from 'react';
import axios from 'axios';
import {
  CircularProgress, Grid, Rating, Typography,
} from '@mui/material';

const TMDB_KEY = process.env.REACT_APP_TMDB_API_KEY;
const POSTER_ROOT = process.env.REACT_APP_TMDB_POSTER;

class SelectedMovie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'React',
    };
    this.getTodos = this.getTodos.bind(this);
  }

  componentDidMount() {
    this.getTodos();
  }

  async getTodos() {
    let data;
    const link = `https://api.themoviedb.org/3/find/${this.props.movie[1]}?api_key=${TMDB_KEY}&external_source=imdb_id`;
    let js; let release_date; let title; let overview; let backdrop_path; let poster_path; let
      rating;
    await axios
      .get(link)
      .then((r) => (js = JSON.parse(JSON.stringify(r.data))));
    for (const jsKey in js) {
      if (js[jsKey].length !== 0) {
        if (jsKey === 'movie_results') {
          release_date = js[jsKey][0].release_date;
          title = js[jsKey][0].title;
        } else if (jsKey === 'tv_results') {
          release_date = js[jsKey][0].first_air_date;
          title = js[jsKey][0].name;
        }
        overview = js[jsKey][0].overview;
        rating = js[jsKey][0].vote_average;
        poster_path = js[jsKey][0].poster_path;
        if (js[jsKey][0].backdrop_path !== null) {
          backdrop_path = js[jsKey][0].backdrop_path;
        }
      }
    }
    data = [title, rating, overview, release_date, poster_path, backdrop_path];
    this.setState({ arr: data });
  }

  render() {
    const { arr } = this.state;
    console.log(arr);
    return (
        arr ? (
          <div
            className="smovie-main"
            style={{
              width: 'inherit',
              backgroundImage: `url(${POSTER_ROOT}${arr[5]})`,
              borderRadius: '10px',
            }}
          >
            <div
              style={{
                backgroundImage:
                  'linear-gradient(to right, rgba(0, 0, 0, 0.90) 150px, rgba(0, 0, 0, 0.60) 100%)',
                borderRadius: '10px',
              }}
            >
              <Grid container spacing={6} className="smovie-grid">
                <Grid item lg={4} xs={12} style={{ textAlign: 'right' }}>
                  <img
                    src={POSTER_ROOT + arr[4]}
                    alt="poster"
                    width="75%"
                    style={{
                      boxShadow: '10px 10px 40px rgba(100,100,100,0.20)',
                      borderRadius: '2px',
                    }}
                  />
                </Grid>
                <Grid item lg={8} xs={12} style={{ paddingRight: '5rem' }}>
                  <Typography component="h1" variant="h3">
                    {arr[0]}
                  </Typography>
                  <Rating defaultValue={(arr[1] * 1.0) / 2} precision={0.5} />
                  <Typography
                    component="h1"
                    variant="h5"
                    style={{ paddingTop: 0 }}
                  >
                    <br />
                    {' '}
                    Overview
                  </Typography>
                  <Typography
                    component="h6"
                    variant="body1"
                    style={{ paddingBottom: '2rem' }}
                  >
                    {arr[2]}
                  </Typography>
                  <Typography component="tspan" variant="body1">
                    Release Date:
                    {' '}
                    {arr[3]}
                  </Typography>
                </Grid>
              </Grid>
            </div>
          </div>
        ) : (
          <div align="center">
            <CircularProgress />
          </div>
        )
    )
  }
}

export default SelectedMovie;
