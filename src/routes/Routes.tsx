import Login from 'src/pages/Login/Login';
import Home from 'src/pages/Home/Home';
import Project from 'src/pages/Project/Project';

const publicRoutes = [
  { path: '/', component: Home },
  { path: '/project', component: Project }
];

const privateRoutes = [
  { path: '/login', component: Login }

];

export { publicRoutes, privateRoutes };
