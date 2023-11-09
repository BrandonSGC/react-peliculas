import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { MoviePage, RecentMoviesPage } from '../movies/pages';
import Login from '../auth/Login';

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="/*" element={<RecentMoviesPage />} />
      <Route path="movies/:id" element={<MoviePage />}
      />
    </Routes>
  );
};
