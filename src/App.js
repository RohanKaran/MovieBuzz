import './App.css';
import React, {useEffect, useState} from "react";
import axios from "axios";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import {
  CircularProgress,
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
  Typography
} from "@mui/material";
import MovieList from "./components/movieList";
import Select from "react-select";
import SelectedMovie from "./components/SelectedMovie";
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation, Scrollbar, A11y, Autoplay} from 'swiper';


function App() {

  const [list, setList] = useState(null)
  const [smovie, setSmovie] = useState(null)
  const [rec, setRec] = useState(null)

  useEffect(() => {
    async function fetchData(){
      await axios.get('https://moviebuzz-backend.herokuapp.com/movies').then(r => {
        // console.log(r.data)
        setList(JSON.parse(r.data))
      })
    }
    fetchData()
  }, [])

  async function fetchMovie(props){
    await axios.post('https://moviebuzz-backend.herokuapp.com/get-recommendations',
      {"id": props[0].toString(), "tconst": props[1]}
      ).then(r => setRec(r.data))
  }


  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  const options = list?.allm.map((props) => {
  // Ideally you can change the value to something different that is easier to keep track of like the UTC offset
  return {
      value: props.slice(0, 2),
      label: props[2]
    }
  }
);
  const [width, setWidth] = React.useState(window.innerWidth);
  const breakpoint = 620;

  useEffect(() => {
    window.addEventListener("resize", () => setWidth(window.innerWidth));
     }, []);





  return (

    <ThemeProvider theme={darkTheme}>
      <CssBaseline/>
      <Container>
        <Typography component={'h1'} variant={"h1"}>
          FilmyBuzz
        </Typography>
      </Container>
      <Container style={{marginBottom:"5rem"}}>
        {list ? <Select
          options={options}
          placeholder={"Search"}
          onChange={props => {
            fetchMovie(props.value).then(() => {
              setSmovie(null)
              setSmovie(props.value)
              console.log(props.value)
            })
          }}
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

      {smovie ?
        <Container>
          <SelectedMovie movie={smovie}/>
        </Container> : <span/>
      }

      {rec && <Container>
        Recommendations: <br/>{rec}
      </Container>}

      <Container className={"all-cont"}>
        <div style={{paddingTop:"10rem"}}>
          <Typography component={"h1"} variant={"h4"}>
            Trending Movies
          </Typography>
        </div>
        <div>
          {list ?
            <Swiper
              modules={[Navigation,Autoplay, Scrollbar, A11y]}
              spaceBetween={50}
              autoplay={{
                delay: 10000,
                disableOnInteraction: false,
              }}
              loop={true}
              slidesPerView={width > breakpoint ? 6 : 3}
              navigation
              pagination={{ clickable: true }}
              onSwiper={(swiper) => console.log(swiper)}
              onSlideChange={() => console.log('slide change')}
            >
              {list.trm?.map(data =>
                      <SwiperSlide>
                        <MovieList movie={data}/>
                      </SwiperSlide>
                    )
              }
          </Swiper> : <CircularProgress className={"primary-svg"}/>
          }
        </div>
      </Container>
      <Container className={"all-cont"}>
        <div>
          <Typography component={"h1"} variant={"h4"}>
            Trending Webseries
          </Typography>
        </div>
        <div>
          {list ?
            <Swiper
              modules={[Navigation,Autoplay, Scrollbar, A11y]}
              spaceBetween={50}
              autoplay={{
                delay: 10000,
                disableOnInteraction: false,
              }}
              loop={true}
              slidesPerView={width > breakpoint ? 6 : 3}
              navigation
              pagination={{ clickable: true }}
              onSwiper={(swiper) => console.log(swiper)}
              onSlideChange={() => console.log('slide change')}
            >
              {list.trs?.map(data =>
                      <SwiperSlide>
                        <MovieList movie={data}/>
                      </SwiperSlide>
                    )
              }
          </Swiper> : <CircularProgress className={"primary-svg"}/>
          }
        </div>
      </Container>

      <Container className={"all-cont"}>
        <div>
          <Typography component={"h1"} variant={"h4"}>
            Popular Movies
          </Typography>
        </div>
        <div>
          {list ?
            <Swiper
              modules={[Navigation,Autoplay, Scrollbar, A11y]}
              spaceBetween={50}
              autoplay={{
                delay: 10000,
                disableOnInteraction: false,
              }}
              loop={true}
              slidesPerView={width > breakpoint ? 6 : 3}
              navigation
              pagination={{ clickable: true }}
              onSwiper={(swiper) => console.log(swiper)}
              onSlideChange={() => console.log('slide change')}
            >
              {list.tm?.map(data =>
                      <SwiperSlide>
                        <MovieList movie={data}/>
                      </SwiperSlide>
                    )
              }
          </Swiper> : <CircularProgress className={"primary-svg"}/>
          }
        </div>
      </Container>

      <Container className={"all-cont"}>
        <div>
          <Typography component={"h1"} variant={"h4"}>
            Popular Webseries
          </Typography>
        </div>
        <div>
          {list ?
            <Swiper
              modules={[Navigation,Autoplay, Scrollbar, A11y]}
              spaceBetween={50}
              autoplay={{
                delay: 10000,
                disableOnInteraction: false,
              }}
              loop={true}
              slidesPerView={width > breakpoint ? 6 : 3}
              navigation
              pagination={{ clickable: true }}
              onSwiper={(swiper) => console.log(swiper)}
              onSlideChange={() => console.log('slide change')}
            >
              {list.ts?.map(data =>
                      <SwiperSlide>
                        <MovieList movie={data}/>
                      </SwiperSlide>
                    )
              }
          </Swiper> : <CircularProgress className={"primary-svg"}/>
          }
        </div>
      </Container>
    </ThemeProvider>
  );
}
export default App