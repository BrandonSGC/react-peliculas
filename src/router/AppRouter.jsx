import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { RecentMoviesPage } from '../movies/pages'

export const AppRouter = () => {
  return (
    <Routes>
      
      <Route path="/*" element={<RecentMoviesPage />} />
    </Routes>
  )
}
