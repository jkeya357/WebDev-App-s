import React, { useEffect, useState } from 'react';
import './Player.css';
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom';

function Player() {

  const {id} = useParams();

  const navigate = useNavigate();

  const [apiData, setApiData] = useState({
    name: "",
    key: "",
    published_at: "",
    typeOf: ""
  })

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNWU1OTA1OGVjODBhZWY3ZmE2MjZlNjM5MjE4NGNkOCIsIm5iZiI6MTczNjcwNzM3OS4xNDcsInN1YiI6IjY3ODQwZDMzMjE4ZmQ1N2FjZjRmMWEyMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mIbi6gIkZJpvhGCXdWvZTHYjWK9dTbWgqAUf7u3Ei0Q'
    }
  };

  useEffect(() =>{

    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
    .then(res => res.json())
    .then(res => setApiData(res.results[0]))
    .catch(err => console.error(err));
  
  }, [])
  
  
  return (
    <div className='player'>
      <img src={back_arrow_icon} alt="" onClick={() =>{navigate(-2)}}/>
      <iframe src={`https://www.youtube.com/embed/${apiData.key}`} width='90%' height='90%' frameborder='0'
      title='trailer' allowFullScreen
      ></iframe>
      <div className="player-info">
        <p>{apiData.published_at.slice(0,10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  )
}

export default Player
