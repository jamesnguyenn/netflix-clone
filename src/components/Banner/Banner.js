import React, { useEffect, useState } from 'react';
import axios from '../../axios';
import requests from '../../request';
import './Banner.css';

import { ToastContainer, toast } from 'react-toastify';

const base_url = 'https://image.tmdb.org/t/p/original/';

function Banner({ handleClick }) {
    const [movie, setMovie] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(requests.fetchNetflixOriginals);
            setMovie(
                request.data.results[
                    Math.floor(Math.random() * request.data.results.length - 1)
                ]
            );
            return request;
        }
        fetchData();
    }, []);
    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + '...' : str;
    }

    return (
        <header
            className="banner"
            style={{
                backgroundSize: 'cover',
                backgroundImage: `url(${base_url}${movie?.backdrop_path})`,
                backgroundPosition: 'center center',
            }}
        >
            <div className="banner__contents">
                <h1 className="banner__title">
                    {movie?.title || movie?.name || movie?.original_name}
                </h1>
                <div className="banner__buttons">
                    <button
                        className="banner__button"
                        onClick={() => handleClick(movie)}
                    >
                        Play
                    </button>
                    <button
                        className="banner__button"
                        onClick={() =>
                            toast(
                                '🦄 This feature is building by our team. You can try later!. Thank you',
                                {
                                    position: 'top-right',
                                    autoClose: 2000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined,
                                }
                            )
                        }
                    >
                        My List
                    </button>
                </div>
                <h1 className="banner__description">
                    {' '}
                    {truncate(movie?.overview, 150)}
                </h1>
            </div>
            <div className="banner--fadeBottom" />
        </header>
    );
}

export default Banner;
