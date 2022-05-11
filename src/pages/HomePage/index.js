import movieTrailer from 'movie-trailer';
import React, { useState } from 'react';
import Banner from '../../components/Banner/Banner';
import Footer from '../../components/Footer';
import Modal from '../../components/Modal/Modal';
import Nav from '../../components/Nav/Nav';
import Row from '../../components/Row/Row';
import requests from '../../request';

function HomePage() {
    const [trailerUrl, setTrailerUrl] = useState('');
    const opts = {
        height: '390',
        width: '640',
        playerVars: {
            autoplay: 1,
        },
    };
    function handleClick(movie) {
        if (trailerUrl) {
            setTrailerUrl('');
        } else {
            movieTrailer(movie?.name || movie?.title || '')
                .then((url) => {
                    const urlParams = new URLSearchParams(new URL(url).search);
                    setTrailerUrl(urlParams.get('v'));
                })
                .catch((error) => console.log(error));
        }
    }
    function handleModalClick() {
        document.body.addEventListener('click', (e) => {
            if (e.target.matches('.modal')) {
                setTrailerUrl('');
                return () => {
                    document.body.removeEventListener('click');
                };
            }
        });
    }
    return (
        <>
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
                <Modal
                    onclick={handleModalClick}
                    opts={opts}
                    trailerUrl={trailerUrl}
                />
            )}
            <Footer></Footer>
        </>
    );
}

export default HomePage;
