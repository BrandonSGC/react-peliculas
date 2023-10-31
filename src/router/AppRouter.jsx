import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { MoviesList } from '../movies/components/MoviesList'

export const AppRouter = () => {
  return (
    <Routes>

      <Route path="/*" element={<MoviesList />} />
    </Routes>
  )
}
