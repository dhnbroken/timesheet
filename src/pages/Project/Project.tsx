/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';
import CardComponent from 'src/components/Card/Card';
import TaskHeader from 'src/components/Card/TaskHeader';
import TaskList from 'src/components/Card/TaskList';
import { getProject, getQuantityProject } from 'src/services/project.service';
import { IProject, IProjectList, IQuantityProject } from 'src/store/interface';
import Loading from 'src/components/Loading/Loading';
import { GlobalContextProvider } from 'src/Context/GlobalContext';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const _ = require('lodash');

function Project () {
  const [projects, setProjects] = React.useState<IProject[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [quantity, setQuantity] = React.useState<IQuantityProject[]>([]);

  const { getTask } = React.useContext(GlobalContextProvider);

  const clients = _.chain(projects)
    .groupBy('customerName')
    .map((value: IProject, key: string) => ({ customerName: key, list: value }))
    .value();

  const getTaskAPI = async () => {
    try {
      const res = await getProject();
      setProjects(res.result);
      setLoading(true);
    } catch (error) {}
  };

  React.useEffect(() => {
    getTaskAPI();
  }, []);

  React.useEffect(() => {
    getTask(projects);
  }, [projects]);

  const getQuantityProjects = async () => {
    try {
      const res = await getQuantityProject();
      setQuantity(res.result);
    } catch (err) {}
  };

  React.useEffect(() => {
    getQuantityProjects();
  }, []);

  return (
    <React.Fragment>
      <CardComponent>
        <TaskHeader quantity={quantity}/>
        {loading
          ? clients.map((projects: IProjectList, index: number) => (
            <TaskList key={index} loading={loading} projects={projects}/>
          ))
          : <Loading />
        }
      </CardComponent>
    </React.Fragment>
  );
}

export default Project;
