import React, { useEffect, useRef, useState } from 'react';

import axios from '../../axios';
import './Row.css';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';

const image_url = 'https://image.tmdb.org/t/p/original/';

function Row({ title, fetchURL, isLargeRow, onClick }) {
    const [movies, setMovies] = useState({ data: [], isLoading: false });
    useEffect(() => {
        async function fetchData() {
            setMovies({
                ...movies,
                isLoading: true,
            });
            const request = await axios.get(fetchURL);
            setMovies({
                ...movies,
                data: request.data.results,
                isLoading: false,
            });

            return request;
        }
        fetchData();
    }, []);

    const loadingSkeleton = Array(5)
        .fill('')
        .map((item, index) => {
            return <div className="placeholder normal" key={index} />;
        });

    return (
        <div className="row">
            <h2>{title}</h2>

            <Swiper grabCursor={true} slidesPerView={'auto'}>
                <div className="row__posters">
                    {movies.isLoading
                        ? loadingSkeleton
                        : movies?.data.map((movie) => {
                              return (
                                  <SwiperSlide
                                      className="row__slide__item"
                                      key={movie.id}
                                  >
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
