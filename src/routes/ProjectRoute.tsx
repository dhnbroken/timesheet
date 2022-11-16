import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { publicRoutes } from './Routes';
import Login from 'src/pages/Login/Login';
import DefaultLayout from 'src/Layout/DefaultLayout';
import Home from 'src/pages/Home/Home';

const getAccessToken = () => {
  return localStorage.getItem('user');
};

const ProjectRoute = () => {
  return (
    <React.Fragment>
      <Routes>
        {publicRoutes.map((route, index) => {
          const Page = route.component;
          return (
            <Route
              key={index}
              path={route.path}
              element={
                getAccessToken()
                  ? <DefaultLayout>
                    <Page />
                  </DefaultLayout>
                  : <Login />
              }
            />
          );
        })}
        <Route
          path="/*"
          element={
            <DefaultLayout>
              <Home />
            </DefaultLayout>
          }
        />
      </Routes>
    </React.Fragment>
  );
};

export default ProjectRoute;
