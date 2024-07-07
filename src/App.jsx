import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Portfolio from './Pages/portfolio'


const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Portfolio/>}></Route>
    </Routes>
  )
}

export default App