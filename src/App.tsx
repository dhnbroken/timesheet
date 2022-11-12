import React, { useEffect } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import './App.css';
import { GlobalStoreContext } from './Context/GlobalContext';
import ProjectRoute from './routes/ProjectRoute';

function App (): JSX.Element {
  const navigate: NavigateFunction = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('user')) {
      navigate('/login');
    }
  }, [localStorage.getItem('user')]);
  return (
    <React.Fragment>
      <GlobalStoreContext>
        <ProjectRoute />
      </GlobalStoreContext>

    </React.Fragment>
  );
}

export default App;
