import './App.css';
import {Component, useEffect, useState} from "react";
import axios from "axios";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import {Button, Container, createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import MovieList from "./components/movieList";


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
  return (

    <ThemeProvider theme={darkTheme}>
      <CssBaseline/>
      <Container>
        <div className="App">
          {list && <Carousel
            swipeable={true}
            draggable={true}
            showDots={false}
            responsive={responsive}
            ssr={true} // means to render carousel on server-side.
            infinite={true}
            autoPlay={false}
            keyBoardControl={true}
            arrows={false}
            customTransition="transform 500ms ease-in-out"
            transitionDuration={500}
            containerClass="carousel-container"
            itemClass="carousel-item-padding-40-px"
          >
            {list.trm?.map(data =>
              <Button style={{height:"inherit", width:"auto"}}>
                <MovieList movie={data}/>
              </Button>
            )
            }
          </Carousel>}
        </div>
      </Container>
      <Container>
        <div className="App">
          {list && <Carousel
            swipeable={true}
            draggable={true}
            showDots={false}
            responsive={responsive}
            ssr={true} // means to render carousel on server-side.
            infinite={true}
            autoPlay={false}
            keyBoardControl={true}
            customTransition="transform 500ms ease-in-out"
            transitionDuration={500}
            itemClass="carousel-item-padding-40-px"
            arrows={false}
          >
            {list.trs?.map(data =>
              <Button style={{height:"inherit", maxWidth:"10rem", minWidth:'10rem'}}>
                <MovieList movie={data}/>
              </Button>
            )
            }
          </Carousel>}
        </div>
      </Container>
      <Container>
        <div className="App">
          {list && <Carousel
            swipeable={true}
            draggable={true}
            showDots={false}
            responsive={responsive}
            ssr={true} // means to render carousel on server-side.
            infinite={true}
            autoPlay={false}
            keyBoardControl={true}
            arrows={false}
            customTransition="transform 500ms ease-in-out"
            transitionDuration={500}
            containerClass="carousel-container"
            itemClass="carousel-item-padding-40-px"
          >
            {list.tm?.map(data =>
              <Button style={{height:"inherit", width:"auto"}}>
                <MovieList movie={data}/>
              </Button>
            )
            }
          </Carousel>}
        </div>
      </Container>
      <Container>
        <div className="App">
          {list && <Carousel
            swipeable={true}
            draggable={true}
            showDots={false}
            responsive={responsive}
            ssr={true} // means to render carousel on server-side.
            infinite={true}
            autoPlay={false}
            keyBoardControl={true}
            arrows={false}
            customTransition="transform 500ms ease-in-out"
            transitionDuration={500}
            containerClass="carousel-container"
            itemClass="carousel-item-padding-40-px"
          >
            {list.ts?.map(data =>
              <Button style={{height:"inherit", width:"auto"}}>
                <MovieList movie={data}/>
              </Button>
            )
            }
          </Carousel>}
        </div>
      </Container>
    </ThemeProvider>
  );
}
export default App