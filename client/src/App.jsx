import React from 'react'
import { Home, Profie, Signin, Signup, About } from './pages'
import {BrowserRouter, Route, Routes} from "react-router-dom"

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/profile' element={<Profie />} />
      <Route path='/Signin' element={<Signin />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/about' element={<About />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App