import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { MoviePage, RecentMoviesPage } from '../movies/pages'

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/*" element={<RecentMoviesPage />} />
      <Route path='movies/:id' element={<MoviePage />}/>
    </Routes>
  )
}
