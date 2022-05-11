import React, { useEffect, useState } from 'react';

import axios from '../../axios';
import './Row.css';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';

const image_url = 'https://image.tmdb.org/t/p/original/';

function Row({ title, fetchURL, isLargeRow, onClick }) {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchURL);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    }, [fetchURL]);

    return (
        <div className="row">
            <h2>{title}</h2>
            <Swiper grabCursor={true} slidesPerView={'auto'}>
                <div className="row__posters">
                    {movies.map((movie) => {
                        return (
                            <SwiperSlide className="row__slide__item">
                                <img
                                    onClick={() => onClick(movie)}
                                    className={`row__poster ${
                                        isLargeRow && 'row__posterLarge'
                                    }`}
                                    src={`${image_url}${
                                        isLargeRow
                                            ? movie.poster_path
                                            : movie.backdrop_path
                                    }`}
                                    alt={movie.name}
                                ></img>
                            </SwiperSlide>
                        );
                    })}
                </div>
            </Swiper>
        </div>
    );
}

export default Row;
