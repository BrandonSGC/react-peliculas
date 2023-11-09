// AppRouter.js
import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { MoviePage, RecentMoviesPage } from '../movies/pages';
import Login from '../auth/Login';
import CheckTokenExpiration from '../auth/CheckTokenExpiration';

const PrivateRoute = ({ element }) => {
  const tokenExpired = CheckTokenExpiration();

  if (tokenExpired) {
    return <Navigate to="/" />;
  }

  return element;
};

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/recentmovies" element={<PrivateRoute element={<RecentMoviesPage />} />} />
      <Route path="/movies/:id" element={<PrivateRoute element={<MoviePage />} />} />
    </Routes>
  );
};
