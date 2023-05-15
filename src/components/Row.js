import axios from '../api/axios';
import React, { useEffect, useState } from 'react'
import './Row.css'
import MovieModal from './MovieModal';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Navigation, Pagination } from 'swiper';

export default function Row({ isLargerRow, title, id, fetchUrl }) {

  const [movies, setMovies] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [movieSelected, setMovieSelected] = useState({})

  const handleClick = (movie) => {
    setModalOpen(true);
    setMovieSelected(movie);
  }

  useEffect(() => {
    fetchMovieData();
  }, [])

  const fetchMovieData = async () => {
    const request = await axios(fetchUrl);
    setMovies(request.data.results)
  }
  return (
    <section className='row'>
      <h2>{title}</h2>
      <div className='slider'>
        <Swiper
          modules={[Navigation, Pagination]}
          loop={true}
          navigation
          pagination={{clickable: true}}
          breakpoints={{
            1378: {
              slidesPerView: 6,
              slidesPerGroup: 6,
            },
            998: {
              slidesPerView: 5,
              slidesPerGroup: 5,
            },
            625: {
              slidesPerView: 4,
              slidesPerGroup: 4,
            },
            0: {
              slidesPerView: 3,
              slidesPerGroup: 3,
            },
          }}
        >
          <div id={id} className='row__posters'>
            {movies.map((movie) => (
              <SwiperSlide>
                <img
                  key={movie.id}
                  className={`row__poster ${isLargerRow && "row__posterLarge"}`}
                  src={`https://image.tmdb.org/t/p/original/${isLargerRow ? movie.poster_path : movie.backdrop_path}`}
                  loading='lazy'
                  alt='movie.name'
                  onClick={() => handleClick(movie)}
                />
              </SwiperSlide>
            ))}
          </div>
        </Swiper>
      </div>
      {
        modalOpen && <MovieModal {...movieSelected} setModalOpen={setModalOpen} />
      }
    </section>
  )
}
