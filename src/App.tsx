import './App.css';
import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { IsUserLogged } from './HandleChanges/UserAuth';
import Settings from './pages/Settings';
import UserPages from './pages/UsersPages';
import Messenger from './pages/Messenger';

function App() {
  const { currentUser } = IsUserLogged();

  /// checking if logined and returns component
  const ProtectedRoute = ({ children }: any) => {
    if (!currentUser) {
      return <Navigate to={'/login'} />;
    }
    return <>{children}</>;
  };

  ///the only available route if user not logged in
  const LoginRoute = ({ children }: any) => {
    if (currentUser) {
      return <Navigate to={`/${currentUser.uid}`} />;
    }
    return <>{children}</>;
  };

  return (
    <div className=" grid grid-cols-[0.5fr,1fr,0.5fr] grid-rows-[100px,1fr] gap-6 max-[600px]:flex max-[600px]:flex-col">
      <div className="col-span-3 h-[50%]">
        <Navbar />
      </div>
      <div className="col-start-1 ml-5 max-[600px]:hidden">
        <Sidebar />
      </div>
      <div className=" col-start-2 col-end-4 row-start-2 w-[100%]">
        <Routes>
          {/* checking if user is logined and can access pages 
          Need to think of better solution with switches tho 
          */}

          <Route
            path="/login"
            element={
              <LoginRoute>
                <LoginPage />
              </LoginRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />
          <Route
            path={`/:id`}
            element={
              <ProtectedRoute>
                <MainPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users"
            element={
              <ProtectedRoute>
                <UserPages />
              </ProtectedRoute>
            }
          />
          <Route
            path="/messages"
            element={
              <ProtectedRoute>
                <Messenger />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
