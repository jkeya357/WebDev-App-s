import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'
import { Link } from 'react-router-dom';

function TitleCards({title, category}) {

  const [apiData, setApiData] = useState([]);

  const cardsRef = useRef();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNWU1OTA1OGVjODBhZWY3ZmE2MjZlNjM5MjE4NGNkOCIsIm5iZiI6MTczNjcwNzM3OS4xNDcsInN1YiI6IjY3ODQwZDMzMjE4ZmQ1N2FjZjRmMWEyMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mIbi6gIkZJpvhGCXdWvZTHYjWK9dTbWgqAUf7u3Ei0Q'
    }
  };
  


const handleWheel = (event)=>{
  event.preventDefault();
  cardsRef.current.scrollLeft += event.deltaY;
}

useEffect(() =>{

  fetch(`https://api.themoviedb.org/3/movie/${category ? category : "now_playing"}?language=en-US&page=1`, options)
  .then(res => res.json())
  .then(res => setApiData(res.results))
  .catch(err => console.error(err));

  cardsRef.current.addEventListener('wheel', handleWheel)
}, [])

  return (
    <div className='title-cards'>
      <h2>{title ? title : "Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => {
          return(
            <Link to={`/player/${card.id}`} className="card" key={index}>
              <img src={`https://image.tmdb.org/t/p/w500` + card.backdrop_path} alt="" />
              <p>{card.original_title}</p>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default TitleCards
