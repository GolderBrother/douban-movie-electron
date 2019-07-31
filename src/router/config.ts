import Home from '../pages/Home/index';
import Box from '../pages/Box/index';
import Search from '../pages/Search/index';
import Detail from '../pages/Detail/index';
export default [
  {
    path: '/home',
    component: Home,
  },
  {
    path: '/detail/:id',
    component: Detail,
  },
  {
    path: '/box',
    component: Box,
  },
  {
    path: '/search',
    component: Search,
  }
];
