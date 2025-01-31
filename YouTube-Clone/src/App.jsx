import React from 'react'
import NavBar from './Components/NavBar/NavBar'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home/HOME.JSX'
import Video from './Pages/Video/Video'
import { useState } from 'react'

function App() {

  const [sidebar, setSidebar] = useState(true);

  return (
    <div>
      <NavBar setSidebar={setSidebar}/>
      <Routes>
        <Route path='/' element={<Home sidebar={sidebar}/>}/>
        <Route path='/video/:categoryId/:videoId' element={<Video/>}/>
      </Routes>
    </div>
  )
}

export default App
