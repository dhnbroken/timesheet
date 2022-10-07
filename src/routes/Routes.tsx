// Pages
import Login from 'src/pages/Login/Login';
import Home from 'src/pages/Home/Home';
import Project from 'src/pages/Project/Project';

// Public Routes
const publicRoutes = [
  { path: '/home', component: Home },
  { path: '/login', component: Login },
  { path: '/project', component: Project }
];

const privateRoutes: string[] = [];

export { publicRoutes, privateRoutes };
