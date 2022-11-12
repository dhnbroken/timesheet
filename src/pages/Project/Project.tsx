import React, { useContext, useEffect } from 'react';
import CardComponent from 'src/components/Card/Card';
import TaskHeader from 'src/components/Card/TaskHeader';
import TaskList from 'src/components/Card/TaskList';
import { IProject, IProjectList, IProjectReq } from 'src/store/interface/projectInterface';
import Loading from 'src/components/Loading/Loading';
import { GlobalContextProvider } from 'src/Context/GlobalContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const _ = require('lodash');

const Project: React.FC = () => {
  const { projectStatus, loading, getProjectAll, projects, query, setLoading, getQuantityProjects, isChange, getCustomer } = useContext(GlobalContextProvider);

  const { getProject } = useContext(GlobalContextProvider);
  const customerName = _.chain(projects)
    .groupBy('customerName')
    .map((value: IProject, key: string) => ({ customerName: key, list: value }))
    .value();

  useEffect(() => {
    const req: IProjectReq = {
      status: Number(projectStatus),
      search: query
    };
    getProjectAll(req);
    getQuantityProjects();
    setLoading(false);
  }, [projectStatus, query, isChange]);

  useEffect(() => {
    getCustomer();
  }, []);

  useEffect(() => {
    getProject(projects);
  }, [projects]);

  return (
    <React.Fragment>
      <CardComponent>
        <TaskHeader />
        {loading
          ? customerName.map((projects: IProjectList, index: number) => (
            <TaskList key={index} loading={loading} projects={projects}/>
          ))
          : <Loading />
        }
      </CardComponent>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </React.Fragment>
  );
};

export default Project;
