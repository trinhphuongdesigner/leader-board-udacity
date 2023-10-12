import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from '@/components/layout/Layout';

import {
  Dashboard,
  NotFoundPage,
  Leaderboard,
  LoginPage,
  NewQuestion,
  QuestionDetailPage,
} from '@/pages';

import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate replace to="questions" />} />
        <Route path="questions" element={<Dashboard />} />
        <Route path="questions/:question_id" element={<QuestionDetailPage />} />
        <Route path="leaderboard" element={<Leaderboard />} />
        <Route path="add" element={<NewQuestion />} />
      </Route>

      <Route
        path="login"
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />

      <Route
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
