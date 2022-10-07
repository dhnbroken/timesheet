import React from 'react';
import { Routes, Route, NavigateFunction, useNavigate } from 'react-router-dom';
import './App.css';
import Login from './pages/Login/Login';
import { publicRoutes } from './routes/Routes';
import DefaultLayout from 'src/Layout/DefaultLayout';
import { GlobalStoreContext } from './Context/GlobalContext';

function App (): JSX.Element {
  const navigate: NavigateFunction = useNavigate();

  React.useEffect(() => {
    if (!localStorage.getItem('user')) {
      navigate('/login');
    }
  }, [localStorage.getItem('user')]);
  return (
    <React.Fragment>
      <GlobalStoreContext>
        <Routes>
          <Route path='/' element={<Login />}/>
          {publicRoutes.map((route, index) => {
            const Page = route.component;
            const Layout = DefaultLayout;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  route.path === '/login'
                    ? <Login />
                    : <Layout>
                      <Page />
                    </Layout>
                }
              />
            );
          })}
        </Routes>
      </GlobalStoreContext>
    </React.Fragment>
  );
}

export default App;
