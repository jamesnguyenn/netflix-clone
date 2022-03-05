import "./App.css";
import requests from "./request";
import Nav from "./Nav/Nav";
import Banner from "./Banner/Banner";
import Row from "./Row/Row";
import { useState } from "react";
import movieTrailer from "movie-trailer";
import Modal from "./Modal/Modal";
import Footer from "./Footer";
import axios from "./axios";
console.log(
  axios.get(
    "/discover/tv/?api_key=0485495faa4cd8869fabf9998fc6f049&with_networks=213"
  )
);
function App() {
  const [trailerUrl, setTrailerUrl] = useState("");
  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };
  function handleClick(movie) {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.name || movie?.title || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log(error));
    }
  }
  function handleModalClick() {
    document.body.addEventListener("click", (e) => {
      if (e.target.matches(".modal")) {
        setTrailerUrl("");
        return () => {
          document.body.removeEventListener("click");
        };
      }
    });
  }
  return (
    <div className="App">
      <Nav />
      <Banner />
      <Row
        title="NETFLIX ORIGINALS"
        fetchURL={requests.fetchNetflixOriginals}
        isLargeRow
        onClick={handleClick}
      />
      <Row
        title="Trending Now"
        fetchURL={requests.fetchTrending}
        onClick={handleClick}
      />
      <Row
        title="Top Rated"
        fetchURL={requests.fetchTopRated}
        onClick={handleClick}
      />
      <Row
        title="Action Movies"
        fetchURL={requests.fetchActionMovies}
        onClick={handleClick}
      />
      <Row
        title="Comedy Movies"
        fetchURL={requests.fetchComedyMovies}
        onClick={handleClick}
      />
      <Row
        title="Horror Movies"
        fetchURL={requests.fetchHorrorMovies}
        onClick={handleClick}
      />
      <Row
        title="Romance Movies"
        fetchURL={requests.fetchRomanceMovies}
        onClick={handleClick}
      />
      <Row
        title="Documentaries"
        fetchURL={requests.fetchDocumentaries}
        onClick={handleClick}
      />
      {trailerUrl && (
        <Modal onclick={handleModalClick} opts={opts} trailerUrl={trailerUrl} />
      )}
      <Footer></Footer>
    </div>
  );
}

export default App;
