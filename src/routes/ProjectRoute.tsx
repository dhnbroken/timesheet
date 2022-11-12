import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { publicRoutes } from './Routes';
import Login from 'src/pages/Login/Login';
import DefaultLayout from 'src/Layout/DefaultLayout';

const getAccessToken = () => {
  return localStorage.getItem('user');
};

const ProjectRoute = () => {
  return (
    <React.Fragment>
      <Routes>
        {getAccessToken() && publicRoutes.map((route, index) => {
          const Page = route.component;
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <DefaultLayout>
                  <Page />
                </DefaultLayout>
              }
            />
          );
        })}
        {!getAccessToken() && <Route path='/login' element={<Login />} />}
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Routes>
    </React.Fragment>
  );
};

export default ProjectRoute;
