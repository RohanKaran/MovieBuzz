import './App.css';
import React, {useEffect, useState} from "react";
import axios from "axios";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import {
  Button,
  CircularProgress,
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
  Typography
} from "@mui/material";
import MovieList from "./components/movieList";
import Select from "react-select";


function App() {

  const [list, setList] = useState(null)

  useEffect(() => {
    async function fetchData(){
      await axios.get('https://moviebuzz-backend.herokuapp.com/movies').then(r => {
        // console.log(r.data)
        setList(JSON.parse(r.data))
      })
    }
    fetchData()
  }, [])




  const responsive = {
      superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 8
      },
      desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 6
      },
      tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 3.5
      },
      mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 2.5
      }
    }

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  const options = list?.allm.map((props) => {
  // Ideally you can change the value to something different that is easier to keep track of like the UTC offset
  return {
      value: props[0],
      label: props[2]
    }
  }
);

  return (

    <ThemeProvider theme={darkTheme}>
      <CssBaseline/>
      <Container>
        <Typography component={'h1'} variant={"h1"}>
          FilmyBuzz
        </Typography>
      </Container>
      <Container>
        {list ? <Select
          options={options}
          theme={(theme) => ({
            ...theme,
            colors: {
              ...theme.colors,
              primary: "#FFFF00",
              primary25: "grey",
              neutral0: "black",
              neutral80: "#FFFF008A",
            },
          })}
        /> : <Select/>}
      </Container>

      <Container className={"all-cont"}>
        <div>
          <Typography component={"h1"} variant={"h4"}>
            Trending Movies
          </Typography>
        </div>
        <div>
          {list ? <Carousel
            swipeable={true}
            draggable={true}
            showDots={false}
            responsive={responsive}
            ssr={true} // means to render carousel on server-side.
            infinite={true}
            autoPlay={true}
            keyBoardControl={true}
            arrows={false}
            customTransition="transform 2000ms ease-in"
            autoPlaySpeed={5000}
            containerClass="carousel-container"
            itemClass="carousel-item-padding-40-px"
          >
            {list.trm?.map(data =>
              <Button className={"all"}>
                <MovieList movie={data}/>
              </Button>
            )
            }
          </Carousel> : <div><CircularProgress /></div> }
        </div>
      </Container>
      <Container className={"all-cont"}>
        <div>
          <Typography component={"h1"} variant={"h4"}>
            Trending Webseries
          </Typography>
        </div>
        <div>
          {list ? <Carousel
            swipeable={true}
            draggable={true}
            showDots={false}
            responsive={responsive}
            ssr={true} // means to render carousel on server-side.
            infinite={true}
            autoPlay={true}
            keyBoardControl={true}
            customTransition="transform 2000ms ease-in"
            autoPlaySpeed={5000}
            itemClass="carousel-item-padding-40-px"
            arrows={false}
          >
            {list.trs?.map(data =>
              <Button className={"all"}>
                <MovieList movie={data}/>
              </Button>
            )
            }
          </Carousel> : <div><CircularProgress /></div>}
        </div>
      </Container>

      <Container className={"all-cont"}>
        <div>
          <Typography component={"h1"} variant={"h4"}>
            Popular Movies
          </Typography>
        </div>
        <div>
          {list ? <Carousel
            swipeable={true}
            draggable={true}
            showDots={false}
            responsive={responsive}
            ssr={true} // means to render carousel on server-side.
            infinite={true}
            autoPlay={true}
            keyBoardControl={true}
            arrows={false}
            customTransition="transform 2000ms ease-in"
            autoPlaySpeed={5000}
            containerClass="carousel-container"
            itemClass="carousel-item-padding-40-px"
          >
            {list.tm?.map(data =>
              <Button className={"all"}>
                <MovieList movie={data}/>
              </Button>
            )
            }
          </Carousel> : <div><CircularProgress /></div>}
        </div>
      </Container>

      <Container className={"all-cont"}>
        <div>
          <Typography component={"h1"} variant={"h4"}>
            Popular Webseries
          </Typography>
        </div>
        <div>
          {list ? <Carousel
            swipeable={true}
            draggable={true}
            showDots={false}
            responsive={responsive}
            ssr={true} // means to render carousel on server-side.
            infinite={true}
            autoPlay={true}
            keyBoardControl={true}
            arrows={false}
            customTransition="transform 2000ms ease-in"
            autoPlaySpeed={5000}
          >
            {list.ts?.map(data =>
              <Button className={"all"}>
                <MovieList movie={data}/>
              </Button>
            )
            }
          </Carousel> : <div><CircularProgress /></div>}
        </div>
      </Container>
    </ThemeProvider>
  );
}
export default App